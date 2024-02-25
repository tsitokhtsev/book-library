<?php

namespace Database\Seeders;

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
        Permission::create(['name' => 'add book']);
        Permission::create(['name' => 'delete book']);
        Permission::create(['name' => 'edit book']);
        Permission::create(['name' => 'add branch']);

        Role::create(['name' => 'superadmin'])->givePermissionTo(Permission::all());
    }
}
