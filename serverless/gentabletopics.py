import functions_framework
import openai
import json
import os
from pydantic import BaseModel

class TableTopics(BaseModel):
    topics: list[str]

@functions_framework.http
def chatgpt_proxy(request):
    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)

    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }

    # Get the prompt from the request body
    request_json = request.get_json(silent=True)
    prompt = request_json.get('theme')

    if not prompt:
        return ('No prompt provided', 400, headers)

    try:
        # Call the OpenAI ChatGPT API
        completion = openai.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Generate a list of 5 table topics for a Toastmasters meeting given a theme or prompt below."},
                {"role": "user", "content": prompt}
            ],
            response_format=TableTopics
        )

        # Extract the response text
        chat_response = completion.choices[0].message.parsed

        # Create a JSON object with the response
        result = {
            "response": chat_response.topics
        }

        # Return the JSON response
        return (json.dumps(result), 200, headers)

    except Exception as e:
        return (f'Error: {str(e)}', 500, headers)
