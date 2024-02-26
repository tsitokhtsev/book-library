<?php

namespace App\Enums;

enum PermissionsEnum: string
{
    case ADDBOOKS = 'add books';
    case DELETEBOOKS = 'delete books';
    case EDITBOOKS = 'edit books';
    case ADDBRANCHES = 'add branches';
}
