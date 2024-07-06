<?php

namespace App\Enums;

enum BookCopyStatus: string {
    case AVAILABLE = 'available';
    case CHECKED_OUT = 'checked-out';
    case LOST = 'lost';
    case DAMAGED = 'damaged';
}
