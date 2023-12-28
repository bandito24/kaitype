<?php

namespace App\Http\Controllers;

use App\Http\Requests\SigninRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function signup(SignUpRequest $request){
        $data = $request->validated();

        $user = User::create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'status' => 'success',
            'message' => "new account created for {$user->username}",
            'token' => $token,
            'user' => [
                'username' => $user->username
            ]
        ], 201);
    }


    public function signin(SignInRequest $request){
        $credentials = $request->validated();
        auth()->attempt($credentials);
            $user = auth()->user();
            $token = $user->createToken('main')->plainTextToken;

            return response([
                'status' => 'success',
                'message' => "{$user->username} logged in successfully",
                'token' => $token,
                'user' => [
                    'username' => $user->username
                ]
            ], 201);
    }
    public function signout(Request $request){

        $user = $request->user();

        if ($user) {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'status' => 'success',
                'message' => "{$user->username} Logged out successfully"
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'No user found'
            ], 200);
        }
    }
}
