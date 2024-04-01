"""
This Lambda Function is used in AWS to take the AWS SQS message and send its content to the AWS SNS handler
"""
import json
import boto3

def lambda_handler(event, context):
    sns = boto3.client('sns')
    for record in event['Records']:
        message_body = json.loads(record['body'])
        email_data = json.dumps({
            'email': message_body['email'],
            'message': message_body['message']
        })
        
        sns.publish(
            TopicArn='arn:aws:sns:eu-west-3:533267403010:InterTopic',
            Message=email_data
        )
        
    return {
        'statusCode': 200,
        'body': json.dumps('Messaggio inviato a SNS')
    }
