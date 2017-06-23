import json
from flask import Flask, request, render_template
app = Flask(__name__)
app.config.update(
    DEBUG=True,
    TEMPLATES_AUTO_RELOAD=True
)

@app.route('/', methods=['GET', 'POST'])
def handle_page():
    if request.method == 'POST':
      with open('forms', 'a') as f:
        f.write(json.dumps(dict(request.form))+'\n')
    return render_template('index.html')

@app.route('/get_forms', methods=['GET'])
def send_form():
    data = {}
    with open('forms', 'r') as f:
      form_id = 0
      for line in f:
        data[form_id] = json.loads(line)
        form_id += 1
    return json.dumps(data)

if __name__ == "__main__":
  app.run()
