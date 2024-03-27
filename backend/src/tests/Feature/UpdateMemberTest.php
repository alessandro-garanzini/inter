<?php

namespace Tests\Feature;

use Tests\TestCase;

use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Member;

class MemberUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_member_update()
    {
        $member = Member::create([
            'name' => 'Diego milito',
            'email' => 'diego.milito@inter.it',
            'birthdate' => '1908-03-09',
            'role' => 'Attacante'
        ]);

        $updateData = [
            'name' => 'Diego milito',
            'email' => 'diego.milito@inter.it',
            'birthdate' => '1908-03-09',
            'role' => 'Coach'
        ];


        $response = $this->putJson("/api/members/{$member->id}", $updateData);


        $response->assertStatus(200)
                 ->assertJson([
                     'message' => 'Member updated successfully',
                     'member' => [
                        'name' => 'Diego milito',
                        'email' => 'diego.milito@inter.it',
                        'birthdate' => '1908-03-09',
                        'role' => 'Coach'
                     ]
                 ]);

        $this->assertDatabaseHas('members', [
            'id' => $member->id,
            'name' => 'Diego milito',
            'email' => 'diego.milito@inter.it',
            'birthdate' => '1908-03-09',
            'role' => 'Coach'
        ]);

        $this->assertDatabaseMissing('members', [
            'id' => $member->id,
            'name' => 'Diego milito',
            'email' => 'diego.milito@inter.it',
            'birthdate' => '1908-03-09',
            'role' => 'Attacante'
        ]);
    }
}
