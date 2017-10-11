from flask import Flask, jsonify, request
from flask_cors import CORS
import flask_sqlalchemy as sqlalchemy

import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlalchemy-demo.db'

db = sqlalchemy.SQLAlchemy(app)
base_url = '/api/'

class Post(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	team = db.Column(db.String(128))
	title = db.Column(db.String(64))
	update = db.Column(db.String(2048))
	created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class User(db.Model):
	name = db.Column(db.String(50), primary_key=True)
	password = db.Column(db.String(50))

# index
# loads all smiles given a space, count parameter and order_by parameter 
# if the count param is specified and doesn't equal all limit by the count
# if the order_by param is specified order by param otherwise load by updated_at desc
# return JSON
@app.route(base_url + 'posts', methods=["GET"])
def index():
    count = request.args.get('count', None)
    order_by = request.args.get('order_by', None)
    team = request.args.get('team', None) 

    if team is None:
        return "Must provide team", 500
    
    query = Post.query.filter_by(team=team).order_by(order_by).limit(count).all() # store the results of your query here 
    
    result = []
    for row in query:
        result.append(
            row_to_obj(row) # you must call this function to properly format 
        )

    return jsonify({"status": 1, "posts": result})


# show
# loads a smile given the id as a value in the URL
# TODO 4: create the route for show
@app.route(base_url + 'smiles/<int:id>', methods=["POST"])
def show(id):
	row = Smile.query.filter_by(id=id).first()
	return jsonify({"smile": row_to_obj(row), "status": 1}), 200


# create
# creates a smile given the params
# TODO 5: create the route for create
@app.route(base_url + 'smiles', methods=['POST'])
def create():
    smile = Smile(**request.json)
    db.session.add(smile)
    db.session.commit()

    db.session.refresh(smile)

    return jsonify({"status": 1, "smile": row_to_obj(smile)}), 200

# delete_smiles
# delete given an space
# delete all smiles in that space
# TODO 6: create the route for delete_smiles
@app.route(base_url + 'smiles', methods=['DELETE'])
def delete_smiles():
	space = request.args.get('space', None)
	
	if (space is None):
		return jsonify({"Error": -1}), 500
	else:
		Smile.query.filter_by(space=space).delete()
		db.session.commit()
		return jsonify({"status": 1}), 200
	
	
	#Smile.filter_by(space=space).delete()
	
	#db.session.query(space).delete().all()
	#db.session.delete(smile)
	#db.session.commit()
	#db.session.refresh(smile)

# post_like
# loads a smile given an ID and increments the count by 1
# TODO 7: create the route for post_like UNFINISHED      ASk SHARLDSFIIRRRAAAA
@app.route(base_url + 'smiles/<int:id>/like', methods=['POST'])
def post_like(id):
	#row = Smile.query.filter_by(id=id).first()
	#row.attr.like_count = row.like_count + 1
	#db.session.add(row)
	#db.session.commit()
	#db.session.refresh(row)
	
	Smile.query.filter_by(id=id).update({Smile.like_count: Smile.like_count + 1})
	db.session.commit()
	return jsonify({"status Updated": 1}), 200
	
def row_to_obj(row):
    row = {
            "id": row.id,
            "team": row.team,
            "title": row.title,
            "update": row.update,
            "created_at": row.created_at,
        }

    return row

  
def main():
    db.create_all() # creates the tables you've provided
    app.run()       # runs the Flask application  

if __name__ == '__main__':
    main()