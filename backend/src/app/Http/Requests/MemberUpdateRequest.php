<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MemberUpdateRequest extends FormRequest
{
    public function authorize()
    {
        // Considera di inserire qui una logica di autorizzazione,
        // per ora restituiamo true per semplificare
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:members,email,' . $this->member,
            'birthdate' => 'required|date',
            'role' => 'required|max:255',
        ];
    }
}
