import os
import json
import openai
from flask import Flask, request, jsonify

app = Flask(__name__)

# Set your OpenAI API key
openai.api_key = 'YOUR_OPENAI_API_KEY'

@app.route('/', methods=['POST'])
def generate_table_topics():
    try:
        # Get the user-provided topic from the HTTP request
        request_data = request.get_json()
        user_topic = request_data['topic']

        # Define a prompt for ChatGPT based on the user's topic
        prompt = f"Generate 10 table topics related to '{user_topic}':"

        # Call the OpenAI Chat API to generate table topics
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt,
            max_tokens=50,  # Adjust as needed
            n=10  # Generate 10 table topics
        )

        # Extract and format the generated topics
        generated_topics = [item['text'] for item in response.choices]
        response_data = {'table_topics': generated_topics}

        return jsonify(response_data), 200

    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=True)
