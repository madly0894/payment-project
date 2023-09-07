<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Cards;
use App\Http\Requests\StoreCardRequest;

class CardsController extends Controller
{
    public function store(StoreCardRequest $request) {
        DB::beginTransaction();
        try {
            Cards::create($request->all());
            DB::commit();
            $rand = rand(0, 2);
            return response()->json([
                "status" => Cards::RESPONSES_STATUSES[$rand],
                "message" => Cards::RESPONSES[$rand]
            ]);
        } catch (\Exception $ex) {
            DB::rollBack();
        }
    }
}
