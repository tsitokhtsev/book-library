<?php

namespace App\Enums;

enum BookCopyStatus: string {
    case AVAILABLE = 'available';
    case CHECKED_OUT = 'checked-out';
    case LOST = 'lost';
    case DAMAGED = 'damaged';

    public function intValue(): int {
        return match($this) {
            self::AVAILABLE => 1,
            self::CHECKED_OUT => 2,
            self::LOST => 3,
            self::DAMAGED => 4,
        };
    }
}
