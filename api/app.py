from flask import Flask, jsonify, request
from flask_cors import CORS
import flask_sqlalchemy as sqlalchemy

import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sqlalchemy-demo.db'

db = sqlalchemy.SQLAlchemy(app)

#Team post template, will allow logged in user to dynamically add or delete a content post stored in a database
class Post(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	team = db.Column(db.String(128))
	title = db.Column(db.String(64))
	update = db.Column(db.String(2048))
	like_count = db.Column(db.Integer)
	created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

#User class to store and manage access to adding and deleting content buttons
class User(db.Model):
	name = db.Column(db.String(50), primary_key=True)
	password = db.Column(db.String(50))

base_url = '/api/'

# index
#Loads all the given team posts that are currently hidden
#when javascript event is triggered to allow a set of posts to come into view call show team,
#those posts will be shown
#called when a certain team is being viewed to show top 5 recent team posts
#loads all posts given a team, count parameter(5 default) and order_by parameter(newest first default) 
#return JSON
@app.route(base_url + 'posts/<String:team>', methods=["GET"])
def index(team):
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
# loads team post given the id as a value in the URL
@app.route(base_url + 'posts/<int:id>', methods=["POST"])
def show(id):
	row = Post.query.filter_by(id=id).first()
	return jsonify({"post": row_to_obj(row), "status": 1}), 200


# create
# creates a team post given the params
@app.route(base_url + 'posts/<String:team>', methods=['POST'])
def create(team):
    post = Post(**request.json)
    db.session.add(post)
    db.session.commit()

    db.session.refresh(post)

    return jsonify({"status": 1, "post": row_to_obj(post)}), 200

# delete_entire_post_history
# delete entire given team db history
@app.route(base_url + 'posts/<String:team>', methods=['DELETE'])
def delete_entire_post_history():
	team = request.args.get('team', None)
	
	if (team is None ):
		return jsonify({"Error": -1}), 500
	else:
		Post.query.filter_by(Post=post).delete()  #needs to be (team=team)?
		db.session.commit()
		return jsonify({"status": 1}), 200

# post_like
#loads a post by its clicked ID and increments its like value
@app.route(base_url + 'posts/<int:id>/like', methods=['POST'])
def post_like(id):
	
	Post.query.filter_by(id=id).update({Post.like_count: Post.like_count + 1})
	db.session.commit()
	return jsonify({"status Updated": 1}), 200
	
def row_to_obj(row):
    row = {
            "id": row.id,
            "team": row.team,
            "title": row.title,
            "update": row.update,
            "like_count": row.like_count,
            "created_at": row.created_at,
        }

    return row

  
def main():
    db.create_all() # creates the tables you've provided
    app.run()       # runs the Flask application  

if __name__ == '__main__':
    main()