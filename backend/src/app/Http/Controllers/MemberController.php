<?php

namespace App\Http\Controllers;

use Aws\Sqs\SqsClient;
use Illuminate\Support\Facades\Log;

use App\Http\Requests\MemberPostRequest;
use App\Http\Requests\MemberUpdateRequest;
use App\Models\Member;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $members = Member::orderBy('id', 'desc')->paginate(15);
        return response()->json($members);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\MemberPostRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MemberPostRequest $request)
    {
        $valdidated_request = $request->validated();

        $member = Member::create($valdidated_request);

        Log::info('Member created successfully', ['member' => $member]);

        $client = new SqsClient([
            'version' => 'latest',
            'region'  => env('AWS_DEFAULT_REGION'),
            'credentials' => [
                'key'    => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY'),
            ],
        ]);
        
        $email_receiver_address = $request->email;
        $member_name = $request->name;
        $mail_message = "Dear ".$member_name.",\n"."Welcome to INTER!\nBest regards\nInter Team Manager";

        $result = $client->sendMessage([
            'QueueUrl' => 'https://sqs.eu-west-3.amazonaws.com/533267403010/inter-queue',
            'MessageBody' => json_encode([
                'email' => $email_receiver_address,
                'message' => $mail_message,
            ]),
        ]);

        Log::info('SQS message sent', ['result' => $result]);

        return response()->json(['message' => 'Member created successfully!', 'member' => $member], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Member $member)
    {
        return response()->json($member);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\MemberUpdateRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(MemberUpdateRequest $request, $id)
    {
        $member = Member::findOrFail($id);
        $member->update($request->validated());

        return response()->json(['message' => 'Member updated successfully', 'member' => $member]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $member = Member::find($id);

        if (!$member) {
            return response()->json(['error' => 'member not found.'], 404);
        }

        try {
            $member->delete();

            return response()->json(['success' => 'member deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete the member.'], 500);
        }
    }
}
