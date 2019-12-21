<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run() {

        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < 10; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        \DB::table('users')->insert(array(
            [
                'id' => 1,
                'name' => 'dubanzl',
                'email' => 'duban.devcode@gmail.com',
                'password' => bcrypt('123'),
                'remember_token' => $randomString,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ],
            [
                'id' => 2,
                'name' => 'admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('123'),
                'remember_token' => $randomString,
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ]
        ));
    }
}
