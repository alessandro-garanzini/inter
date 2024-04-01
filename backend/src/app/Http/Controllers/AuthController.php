<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cookie;

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
        $cookie = cookie('auth_token', $token, 60 * 24, null, null, false, false);

        return response()->json([
            'message' => 'Login successful',
        ])->withCookie($cookie); 
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        $cookie = Cookie::forget('auth_token');
        
        return response()->json(['message' => 'Logout successful'])->withCookie($cookie);
    }
    
}
