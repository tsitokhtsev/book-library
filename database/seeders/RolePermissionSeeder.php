<?php

namespace Database\Seeders;

use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    /**
     * Create roles and permissions
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => PermissionsEnum::ADDBOOKS]);
        Permission::create(['name' => PermissionsEnum::DELETEBOOKS]);
        Permission::create(['name' => PermissionsEnum::EDITBOOKS]);
        Permission::create(['name' => PermissionsEnum::ADDBRANCHES]);

        Role::create(['name' => RolesEnum::SUPERADMIN])
            ->givePermissionTo(Permission::all());
        Role::create(['name' => RolesEnum::MEMBER]);
    }
}
