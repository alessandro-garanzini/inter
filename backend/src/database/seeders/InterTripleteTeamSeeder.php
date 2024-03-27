<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class InterTripleteTeamSeeder extends Seeder
{
    public function run()
    {
        $players = [
            ['name' => 'Júlio César', 'role' => 'Calciatore'],
            ['name' => 'Maicon', 'role' => 'Calciatore'],
            ['name' => 'Lucio', 'role' => 'Calciatore'],
            ['name' => 'Walter Samuel', 'role' => 'Calciatore'],
            ['name' => 'Cristian Chivu', 'role' => 'Calciatore'],
            ['name' => 'Javier Zanetti', 'role' => 'Calciatore'],
            ['name' => 'Esteban Cambiasso', 'role' => 'Calciatore'],
            ['name' => 'Wesley Sneijder', 'role' => 'Calciatore'],
            ['name' => 'Samuel Eto\'o', 'role' => 'Calciatore'],
            ['name' => 'Diego Milito', 'role' => 'Calciatore'],
            ['name' => 'Goran Pandev', 'role' => 'Calciatore'],
            ['name' => 'Jose Mourinho', 'role' => 'Allenatore'],
        ];

        foreach ($players as $player) {
            DB::table('members')->insert([
                'name' => $player['name'],
                'role' => $player['role'],
                'email' => strtolower(str_replace(' ', '.', $player['name'])) . '@inter.it',
                'birthdate' => '1908-03-09',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
