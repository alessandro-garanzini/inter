"""
This Lambda Function is used in AWS to take the SNS message and send its content to the Laravel BE
"""
import json
import http.client

def lambda_handler(event, context):
    message = json.loads(event['Records'][0]['Sns']['Message'])
    print(message)

    body = json.dumps(message)
    headers = {
        'Content-Type': 'application/json',
    }
    
    conn = http.client.HTTPSConnection("inter.alessandrogaranzini.it")
    conn.request("POST", "/api/send-mail", body, headers)
    
    response = conn.getresponse()
    print(response.read().decode())
    
    return {
        'statusCode': 200,
        'body': json.dumps('Email inviata al BE')
    }
