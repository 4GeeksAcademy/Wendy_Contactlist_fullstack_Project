from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    
    name = db.Column(db.String(120),nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    #is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return self.email

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
             "email": self.email
           
        }
    


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer,db.ForeignKey("user.id"))
    name = db.Column(db.String(120), unique=False, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    address = db.Column(db.String(120), unique=False, nullable=False)
    email= db.Column(db.String(80), unique=True, nullable=False)
    user_link= db.relationship('User')
    
    def __repr__(self):
        return self.name

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "phone": self.phone,
            "address": self.address,
            "email":self.email    
           
        }
    

class UserFavorite(db.Model):
     id = db.Column(db.Integer, primary_key=True)
     
     user_id=db.Column(db.Integer(), db.ForeignKey("user.id"))
     contact_id=db.Column(db.Integer(), db.ForeignKey("contact.id"))
     u_link= db.relationship('User')
     c_link= db.relationship('Contact')
     
    
     def __repr__(self):
        return self.id

     def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,                     
            "contact_id": self.contact_id
             
        }