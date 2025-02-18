<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $cacheKey = sprintf(
            'users.page.%s.%s.%s.%s',
            $request->get('page', 1),
            $request->get('search', ''),
            $request->get('sort', ''),
            $request->get('direction', '')
        );

        $users = Cache::remember($cacheKey, now()->addMinutes(5), function () use ($request) {
            $query = User::query()
                ->select(['users.id', 'users.name', 'users.email', 'roles.id as role_id', 'roles.name as role_name'])
                ->join('roles', 'users.role_id', '=', 'roles.id')
                ->when($request->search, function ($query, $search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('users.name', 'like', "%{$search}%")
                            ->orWhere('users.email', 'like', "%{$search}%");
                    });
                })
                ->when($request->sort, function ($query, $sort) use ($request) {
                    $direction = $request->direction === 'desc' ? 'desc' : 'asc';
                    $query->orderBy("users.{$sort}", $direction);
                });

            return $query->paginate(10)
                ->through(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => [
                            'id' => $user->role_id,
                            'name' => $user->role_name,
                        ],
                    ];
                })
                ->appends($request->query());
        });

        return Inertia::render('Users/Show', [
            'users' => $users,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        Cache::tags(['users'])->flush();

        return redirect()->back();
    }
}
