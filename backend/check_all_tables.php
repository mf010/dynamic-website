<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Check all tables
$tables = ['users', 'news', 'images', 'personal_access_tokens'];

foreach ($tables as $table) {
    echo "\n=== {$table} table structure ===\n";
    try {
        $columns = DB::select("DESCRIBE {$table}");
        foreach ($columns as $column) {
            echo "- {$column->Field} ({$column->Type})" . 
                 ($column->Key === 'PRI' ? ' PRIMARY KEY' : '') . 
                 ($column->Key === 'MUL' ? ' FOREIGN KEY' : '') . "\n";
        }
    } catch (\Exception $e) {
        echo "Error: {$e->getMessage()}\n";
    }
}
