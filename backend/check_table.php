<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Get table columns
$columns = DB::select('DESCRIBE users');

echo "Users table structure:\n";
foreach ($columns as $column) {
    echo "- {$column->Field} ({$column->Type})\n";
}
