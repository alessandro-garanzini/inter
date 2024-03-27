<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Member;

class PostMemberTest extends TestCase
{
    use RefreshDatabase;
    
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_the_application_returns_a_successful_response()
    {
        $test_data = [
            'name' => 'Diego Milito',
            'email' => 'diego.milito@inter.it',
            'birthdate' => '1908-03-09',
            'role' => 'ATT',
        ];

        $response = $this->postJson('/api/members/', $test_data);

        $response->assertStatus(201);
    }
}
