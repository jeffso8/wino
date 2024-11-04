from flask import request, jsonify
from config import app, db
from models import Users
from google.oauth2 import id_token

@app.route("/users", methods=["GET"])
def get_users():
  users = Users.query.all()
  json_users = list(map(lambda x: x.to_json(), users))
  return jsonify({"users": json_users})

@app.route("/create_users", methods=["POST"])
def create_user():
  print("create user request data: ", request.get_json())
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

# Endpoint to handle Google Sign-In
@app.route('/auth/google', methods=['POST'])
def google_auth():
    print("received request: ", request.json)
    token = request.json.get("id_token")
    if not token:
        return jsonify({"error": "No token provided"}), 400

    try:
        # Specify the CLIENT_ID of the app that accesses the backend
        id_info = id_token.verify_oauth2_token(token, request, "945545095865-buuue4rntop7sjuun58fu0e8qkfn9idq.apps.googleusercontent.com")

        google_id = id_info["sub"]
        email = id_info.get("email")
        name = id_info.get("name")

        # Check if user exists, create new user if not
        user = Users.query.filter_by(google_id=google_id).first()
        if not user:
            user = Users(google_id=google_id, email=email, name=name)
            db.session.add(user)
            db.session.commit()
            is_new_user = True
        else:
            is_new_user = False

        return jsonify({
            "message": "Google Sign In process completed.. ",
            "is_new_user": is_new_user,
            "user_info": {
                "email": user.email,
                "name": user.name
            }
        })
    except ValueError:
        # Invalid token
        return jsonify({"error": "Invalid token"}), 400

if __name__ == "__main__":
  with app.app_context():
    db.create_all()

  app.run(debug=True)

