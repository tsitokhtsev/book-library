<?php

namespace App\Enums;

enum CheckoutStatus: string {
    case ACTIVE = 'active';
    case OVERDUE = 'overdue';
    case RETURNED = 'returned';
    case LOST = 'lost';
    case DAMAGED = 'damaged';
}
