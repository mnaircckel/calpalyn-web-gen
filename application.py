from flask import Flask, request, render_template
app = Flask(__name__)
app.config.update(
    DEBUG=True,
    TEMPLATES_AUTO_RELOAD=True
)

@app.route('/', methods=['GET', 'POST'])
def handle_page():
    if request.method == 'POST':
        print str(request.form)
    return render_template('index.html')

if __name__ == "__main__":
  app.run()
