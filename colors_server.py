from dataclasses import dataclass
from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = 'my_secret_key'

db = SQLAlchemy(app)

@dataclass
class Colors(db.Model):
    id: int
    R: int
    G: int
    B: int

    id = db.Column(db.Integer, primary_key=True)
    R = db.Column(db.Integer)
    G = db.Column(db.Integer)
    B = db.Column(db.Integer)
    
    def __repr__(self):
        return f'<Color {self.id}>'

with app.app_context():
    db.create_all()

@app.route('/')
def list():
    return render_template('colors_list.html')

@app.route('/colors_list.js')
def list_js():
    return render_template('colors_list.js')

@app.route('/colors', methods=['GET', 'POST'])
def route_colors():
    if request.method == 'GET':
        colors = Colors.query.all()
        return jsonify(colors)
    
    elif request.method == 'POST':
        R = request.json.get('R')
        G = request.json.get('G')
        B = request.json.get('B')
        
        new_color = Colors(R=R, G=G, B=B)
        db.session.add(new_color)
        db.session.commit()
        
        return "SUCCESS"

@app.route('/colors/<colors_id>', methods=['GET', 'PUT', 'DELETE'])
def route_colors_id(colors_id):
    color = Colors.query.get(colors_id)
    
    if request.method == 'GET':
        color_data = {
            'id': color.id,
            'R': color.R,
            'G': color.G,
            'B': color.B
        }
        return jsonify(color_data)
    
    elif request.method == 'PUT':
        R = request.json.get('R')
        G = request.json.get('G')
        B = request.json.get('B')
        
        color.R = R
        color.G = G
        color.B = B
        
        db.session.commit()
        
        return 'SUCCESS'
    
    elif request.method == 'DELETE':
        db.session.delete(color)
        db.session.commit()
        
        return 'SUCCESS'

if __name__ == '__main__':
    app.run(debug=True, host = '0.0.0.0', port = 5000)