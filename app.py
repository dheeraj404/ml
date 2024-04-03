from flask import Flask, request, jsonify
import pandas as pd
from joblib import load

app = Flask(__name__)

# Load the trained model
model = load('banana_quilty.joblib')

# Define a function to preprocess input data
def preprocess_input(data):
    # Convert all values to float and handle any potential errors
    try:
        processed_data = pd.DataFrame(data, index=[0])
        processed_data = processed_data.astype(float)
        return processed_data
    except Exception as e:
        # If any error occurs during preprocessing, return None
        print("Error during preprocessing:", e)
        return None

# Route to serve index.html
@app.route('/')
def index():
    return open('index.html').read()

# Route to classify banana quality
@app.route('/classify_banana', methods=['POST'])
def classify_banana():
    data = request.json
    
    # Check if all required fields are present in the request
    required_fields = ['size', 'weight', 'sweetness', 'softness', 'harvest_time', 'ripeness', 'acidity']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # Preprocess the input data
    processed_data = preprocess_input(data)
    
    if processed_data is None:
        return jsonify({'error': 'Invalid input data'}), 400

    # Make prediction using the trained model
    prediction = model.predict(processed_data)
    
    # Return the prediction
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
