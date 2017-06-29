<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\JsroFin\User::class, 1)
            ->states('admin')
            ->create([
                'name' => 'Jonathan Oliveira',
                'email' => 'admin@user.com'
            ]);

        factory(\JsroFin\User::class, 1)
            ->create([
                'name' => 'Cliente da Silva',
                'email' => 'client@user.com'
            ]);
    }
}
