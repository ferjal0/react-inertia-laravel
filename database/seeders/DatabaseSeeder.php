<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Enums\RoleType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles first
        $this->call(RoleSeeder::class);

        // Get role IDs
        $adminRole = Role::where('name', RoleType::ADMINISTRATOR->value)->first();
        $userRole = Role::where('name', RoleType::USER->value)->first();

        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'), // password
            'remember_token' => Str::random(10),
            'role_id' => $adminRole->id,
        ]);

        // Create 19 regular users
        User::factory(19)->create([
            'role_id' => $userRole->id,
        ]);
    }
}
