from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
import predictor

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['POST', 'GET'])
@cross_origin()
def home():
    if request.method == 'POST':
        req = request.json
        print(req)
        content = req['text']
        res = predictor.predict(content)
        return jsonify({'generatedText': res})
    else:
        return jsonify({'generatedText': 'hi'})


if __name__ == "__main__":
    app.run(port=7000)
