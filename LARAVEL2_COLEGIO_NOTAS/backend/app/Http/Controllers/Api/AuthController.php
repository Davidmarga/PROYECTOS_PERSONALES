<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    // Login
    public function login(Request $request){
        $credentials = $request->validate([
            'email'=>['required','email'],
            'password' => 'required|string|min:6',
        ]);
        if (!Auth::attempt($credentials)){
            return response()->json(['message'=>'Credenciales incorrectas'],401);
        }
        $user = $request->user(); //lo busca laravel directamente, con los datos de request que le he dado anteriormente
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'user'=> $user,
            'token'=>$token,
        ]);
    }

    //Logout
    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json(['message'=>'Logged out']);
    }
    //Obtener usuario autenticado
    public function me(Request $request){
        return response()->json($request->user());
    }
}
