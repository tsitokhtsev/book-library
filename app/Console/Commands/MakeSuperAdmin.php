<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class MakeSuperAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:make-superadmin {UserEmail}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make super admin using email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user_email = $this->argument('UserEmail');
        User::where('email', $user_email)
            ->first()
            ->assignRole('superadmin');
    }
}
