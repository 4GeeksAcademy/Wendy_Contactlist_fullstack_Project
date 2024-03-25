"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Contact
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user/<id>/contact/<idc>', methods=['DELETE'])
def delete_contact(id,idc):
        test= Contact.query.filter_by(id=idc).first()
        db.session.delete(test)
        db.session.commit()
        return jsonify(f"Success"), 200


@api.route('/user/<id>/contact/<idc>', methods=['PUT'])
def delete_contact(id,idc):
        request_body= request.json
        test= Contact.query.filter_by(id=idc).update(
              {'name': , 'phone':, 'email':, 'address': }
              )
        db.session.delete(test)
        db.session.commit()
        return jsonify(f"Success"), 200


session.query(FoobarModel).filter(FoobarModel.id == foobar_id).update({'name': 'New Foobar Name!'})




@api.route('/user/<int:id>/contact', methods=['GET'])
def get_contact_of_user(id):

    contact= Contact.query.filter_by(user_id = id)
    final = list(map(lambda x: x.serialize(), contact))
   
    return  jsonify(final)


@api.route('/user/all', methods=['GET'])
def get_all_user():
    
    user = User.query.all()
    all_user = list(map(lambda x: x.serialize(), user))
    return jsonify(all_user), 200

@api.route('/contact/new', methods=['POST'])
def add_new_contact():
        request_body=request.json     
        test_contact= Contact.query.filter_by(email=request_body[1]).first()
    
        if(test_contact):
             return jsonify(f"Contact already exists"), 500
        
        else:
             newC=Contact ( name=request_body[0], email=request_body[1],phone= request_body[2],address=request_body[3], user_id=request_body[4])
             db.session.add(newC)
             db.session.commit()
             return jsonify(f"Success"), 200






@api.route('/user/login/?', methods=['POST'])
def login_test():
        request_body=request.json
        
        test_user= User.query.filter_by(email=request_body[0]).first().id
        
        if(test_user):
            test_password= User.query.filter_by(email=request_body[0]).first().password
            test_name= User.query.filter_by(email=request_body[0]).first().name
           
            if str(test_password)==request_body[1]:  
                test= {
                     "user": test_name,
                     "id": test_user
                      }         
                return jsonify(test)
            else:
                return jsonify(f"Incorrect email or password"), 400
                 
                       
        else:
              return jsonify(f"Incorrect email or password"), 400
       
        
