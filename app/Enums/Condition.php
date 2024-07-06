<?php

namespace App\Enums;

enum Condition: string {
    case NEW  = 'new';
    case GOOD = 'good';
    case FAIR = 'fair';
    case POOR = 'poor';
}
