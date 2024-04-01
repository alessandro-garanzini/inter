<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendMail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $email = $request->input('email');
        $messageBody = $request->input('message');

        // Invio dell'email
        Mail::raw($messageBody, function ($message) use ($email) {
            $message->to($email)
                    ->subject('Benvenuto in INTER');
        });

        return response()->json(['message' => 'Email inviata con successo!']);
    }
}
