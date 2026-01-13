<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class StrongPassword implements ValidationRule
{
    /**
     * التحقق من قوة كلمة المرور
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // على الأقل 8 أحرف
        if (strlen($value) < 8) {
            $fail('كلمة المرور يجب أن تكون 8 أحرف على الأقل.');
            return;
        }

        // يجب أن تحتوي على حرف كبير
        if (!preg_match('/[A-Z]/', $value)) {
            $fail('كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل.');
            return;
        }

        // يجب أن تحتوي على حرف صغير
        if (!preg_match('/[a-z]/', $value)) {
            $fail('كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل.');
            return;
        }

        // يجب أن تحتوي على رقم
        if (!preg_match('/[0-9]/', $value)) {
            $fail('كلمة المرور يجب أن تحتوي على رقم واحد على الأقل.');
            return;
        }

        // يجب أن تحتوي على رمز خاص
        if (!preg_match('/[!@#$%^&*(),.?":{}|<>]/', $value)) {
            $fail('كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل (!@#$%^&*...).');
            return;
        }
    }
}
