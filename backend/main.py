from flask import request, jsonify
from config import app, db
from models import Users

@app.route("/users", methods=["GET"])
def get_users():
  users = Users.query.all()
  json_users = list(map(lambda x: x.to_json(), users))
  return jsonify({"users": json_users})

@app.route("/create_users", methods=["POST"])
def create_user():
  username = request.json.get("username")
  first_name = request.json.get("firstName")
  last_name = request.json.get("lastName")
  email = request.json.get("email")

  if not (username and first_name and last_name and email):
    return (
      jsonify({"message": "You must include a first name, last name and email"}), 
      400,
    )
  
  new_user = Users(username=username, first_name=first_name, last_name=last_name, email=email)
  try:
    db.session.add(new_user)
    db.session.commit()
  except Exception as e:
    return jsonify({"message": str(e)}), 201

@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
  user = Users.query.get(user_id)
  if not user:
    return jsonify({"message": "User was not found"}), 404
  
  data = request.json
  user.first_name = data.get("firstName", user.first_name)
  user.last_name = data.get("lastName", user.last_name)
  user.email = data.get("email", user.email)
  
  db.session.commit()

if __name__ == "__main__":
  with app.app_context():
    db.create_all()

  app.run(debug=True)

