<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Test if user exists
$user = User::where('email', 'test@example.com')->first();

if ($user) {
    echo "User found: {$user->email}\n";
    echo "Password hash: {$user->password}\n";
    
    // Test password verification
    $passwordCheck = Hash::check('password123', $user->password);
    echo "Password check result: " . ($passwordCheck ? 'SUCCESS' : 'FAILED') . "\n";
} else {
    echo "User not found\n";
}
