from config import db

class Users(db.Model):
  uuid = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(80), unique=False, nullable=False)
  first_name = db.Column(db.String(80), unique=False, nullable=False)
  last_name = db.Column(db.String(80), unique=False, nullable=False)
  email = db.Column(db.String(120), unique=True, nullable=False)

  def to_json(self):
    return {
      "uuid": self.id,
      "username": self.username,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "email" : self.email,
    }