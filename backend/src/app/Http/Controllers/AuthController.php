<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;


class AuthController extends Controller
{
    public function login(Request $request){
        $loginUserData = $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|min:4'
        ]);

        Log::info(['user_data' => $loginUserData]);

        $user = User::where('email',$loginUserData['email'])->first();
        
        Log::info(['user' => $user]);
        
        if(!$user || !Hash::check($loginUserData['password'],$user->password)){
            return response()->json([
                'message' => 'Invalid Credentials'
            ],401);
        }
        $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;
        return response()->json([
            'access_token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        // Prendi l'utente attualmente autenticato e revoca il suo token.
        $request->user()->currentAccessToken()->delete();
    
        return response()->json(['message' => 'Logout successful']);
    }
    
}
