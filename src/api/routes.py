"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Contact, UserFavorite
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
def update_contact(id, idc):
        request_body= request.json
        test= Contact.query.get(idc)
        db.session.query(Contact).filter(Contact.id==idc).update({'name' :request_body['name'], 'address':request_body['address'] ,'phone':request_body['phone'], 'email':request_body['email'], 'user_id':id})
        db.session.commit()
        return jsonify(f"Success"), 200







@api.route('/user/<int:id>/contact', methods=['GET'])
def get_contact_of_user(id):

    contact= Contact.query.filter_by(user_id = id)
    final = list(map(lambda x: x.serialize(), contact))
   
    return  jsonify(final)


@api.route('/user/<int:id>/contact/fav', methods=['GET'])
def get_fav_of_user(id):
    t=[]
    fav= UserFavorite.query.filter_by(user_id=id).all()
    final = list(map(lambda x: x.serialize(), fav)) 
    
    
    return  jsonify(final), 200


@api.route('/user/<int:id>/contact/<int:idc>/fav/new', methods=['POST'])
def add_fav_to_user(id,idc):
     request_body=request.json
     newC=UserFavorite(user_id=id, contact_id=idc)
     db.session.add(newC)
     db.session.commit()
     return  jsonify(f"Success"), 200


@api.route('/user/<int:id>/contact/icd/fav', methods=['DELETE'])
def remove_fav_from_user(id):
    request_body=request.json
    removeC=UserFavorite.query.filter(user_id=request_body[0], contact_id=request_body[1]).first()
    db.session.delete(removeC)
    db.session.commit()
    return  jsonify(removeC), 200

    



@api.route('/user/all', methods=['GET'])
def get_all_user():
    
    user = User.query.all()
    all_user = list(map(lambda x: x.serialize(), user))
    return jsonify(all_user), 200

@api.route('/user/<id>/contact/new', methods=['POST'])
def add_new_contact():
        request_body=request.json     
        test_contact= Contact.query.filter_by(email=request_body['email']).first()
    
        if(test_contact):
             return jsonify(f"Contact already exists"), 500
        
        else:
             newC=Contact( name=request_body['name'], email=request_body['email'],phone= request_body['phone'],address=request_body['address'], user_id=id)
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
       
        
