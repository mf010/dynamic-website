<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // News permissions
            'view news',
            'create news',
            'edit news',
            'delete news',
            'publish news',

            // Pages permissions
            'view pages',
            'create pages',
            'edit pages',
            'delete pages',

            // Services permissions
            'view services',
            'create services',
            'edit services',
            'delete services',

            // Sliders permissions
            'view sliders',
            'create sliders',
            'edit sliders',
            'delete sliders',

            // Contacts permissions
            'view contacts',
            'delete contacts',

            // Users permissions
            'manage users',

            // Settings permissions
            'manage settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Admin role with all permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());

        // Create Editor role with limited permissions
        $editorRole = Role::firstOrCreate(['name' => 'editor']);
        $editorRole->givePermissionTo([
            'view news',
            'create news',
            'edit news',
            'publish news',
            'view pages',
            'create pages',
            'edit pages',
            'view services',
            'create services',
            'edit services',
            'view sliders',
            'create sliders',
            'edit sliders',
            'view contacts',
        ]);

        $this->command->info('Roles and permissions created successfully!');
    }
}
