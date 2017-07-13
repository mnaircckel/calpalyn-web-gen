import json
import parse
from flask import Flask, request, render_template
app = Flask(__name__)
app.config.update(
    DEBUG=True,
    TEMPLATES_AUTO_RELOAD=True
)

@app.route('/', methods=['GET', 'POST'])
def forms():
    if request.method == 'POST':
      with open('forms.json', 'a') as f:
        f.write(json.dumps(request.get_json()) + '\n')
    return render_template('index.html')

@app.route('/get_forms', methods=['GET'])
def send_forms():
    data = {}
    with open('forms.json', 'r') as f:
      forms = []
      for line in f:
        forms.append(json.loads(line))
    return json.dumps(forms)

@app.route('/generate_form', methods=['POST'])
def generate_form():
    pass

@app.route('/parse_taxa_file', methods=['POST'])
def parse_taxa_file():
    if request.files:
        file = request.files['file']
        file.save(file.filename)
        pos, neg = parse.taxa_file_labels(file.filename)
        return json.dumps({'positive': pos, 'negative': neg})
    else:
        return json.dumps({})

@app.route('/parse_data_file', methods=['POST'])
def parse_data_file():
    if request.files:
        file = request.files['file']
        file.save(file.filename)
    return json.dumps({})

if __name__ == "__main__":
  app.run()
