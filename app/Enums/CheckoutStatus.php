<?php

namespace App\Enums;

enum CheckoutStatus: string {
    case ACTIVE = 'active';
    case OVERDUE = 'overdue';
    case RETURNED = 'returned';
    case LOST = 'lost';
    case DAMAGED = 'damaged';

    public function intValue(): int {
        return match($this) {
            self::ACTIVE => 1,
            self::OVERDUE => 2,
            self::RETURNED => 3,
            self::LOST => 4,
            self::DAMAGED => 5,
        };
    }
}
