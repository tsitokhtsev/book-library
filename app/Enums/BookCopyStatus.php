<?php

namespace App\Enums;

enum BookCopyStatus: string {
    case AVAILABLE = 'available';
    case RESERVED = 'reserved';
    case CHECKED_OUT = 'checked-out';
    case LOST = 'lost';
    case DAMAGED = 'damaged';

    public function intValue(): int {
        return match($this) {
            self::AVAILABLE => 1,
            self::RESERVED => 2,
            self::CHECKED_OUT => 3,
            self::LOST => 4,
            self::DAMAGED => 5,
        };
    }
}
