<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('orders')->insert([
            'fullname' => 'Денисенко Михаил Владимирович',
            'service' => 'за услугу ремонта холодильника',
            'price' => 800,
            'created_at' => Carbon::now(),
        ]);

        DB::table('orders')->insert([
            'fullname' => 'Николаенко Александр Михаилович',
            'service' => 'за услугу покраски стен',
            'price' => 1000,
            'created_at' => Carbon::now(),
        ]);

        DB::table('orders')->insert([
            'fullname' => 'Стаценко Виктор Петрович',
            'service' => 'за услугу вывоза мусора',
            'price' => 300,
            'created_at' => Carbon::now(),
        ]);
    }
}
