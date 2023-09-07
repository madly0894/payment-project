<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orders;

class OrdersController extends Controller
{
   public function index(Request $request) {
      try {
          $random_order = Orders::inRandomOrder()->first();
          return response()->json($random_order);
      } catch (\Exception $e) {
          return response()->json(["message" => "Something wen't wrong"], 500);
      }
   }
}
