<?php

namespace App\Enums;

enum RolesEnum: string
{
    case SUPERADMIN = 'super-admin';
    case ADMIN = 'admin';
    case MEMBER = 'member';
}
