<?php

namespace Database\Seeders;

use App\Enums\RoleType;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        foreach (RoleType::cases() as $roleType) {
            Role::updateOrCreate(
                ['name' => $roleType->value],
                ['description' => ucfirst($roleType->value) . ' role']
            );
        }
    }
}
