<?php

namespace App\Models;

use App\Enums\RoleType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    protected $casts = [
        'name' => RoleType::class,
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
