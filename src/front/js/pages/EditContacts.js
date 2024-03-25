import React from "react";
import { Link , useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../layout";


export const EditContact = props => {

	const context = useContext(AppContext);
	const location =useLocation();
const data = location.state;
   
useEffect(() => {
	context.setTempA(data.address);
	context.setTempN(data.name);
	context.setTempP(data.phone);
	context.setTempE(data.email);

}, []);




	function temp_name2(val){
		
		context.setTempN(val.target.value);
	}

	function temp_phone2(val){
		context.setTempP(val.target.value);
	}

	function temp_address2(val){
		context.setTempA(val.target.value);
	}

	function temp_email2(val){
        context.setTempE(val.target.value);
	}



  function updateContact(){
	let testObj= {
		name: context.tempN , 
		email: context.tempE,
		agenda_slug: "Wendy",
		address: context.tempA,
		phone: context.tempP,	
		user_id: context.currentUser[0]
	}
	
	let newArray= [... context.listC];
	newArray.push(testObj);
	context.setListC(newArray);
	context.setTempA('');
	context.setTempE('');
	context.setTempP('');
	context.setTempN('');
 context.setListC(newArray);


let contact_id= data.id;

	fetch(process.env.BACKEND_URL + "/api/user/"+context.currentUser[0]+"/contact/"+contact_id, {
		method: 'PUT',
		body: JSON.stringify(testObj), // data can be a 'string' or an {object} which comes from somewhere further above in our application
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(res => {
			if (!res.ok) throw Error(res.statusText);
			return res.json();
		})
		.then(response => console.log('Success:', response))
		.catch(error => console.error(error));


}

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit existing contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input type="text" className="form-control" placeholder="Full Name"  value={context.tempN} onChange={(e) => temp_name2(e)}/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input type="email" className="form-control" placeholder="Enter email"   value={context.tempE} onChange={(e) => temp_email2(e)}/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input type="phone" className="form-control" placeholder="Enter phone"   value={context.tempP} onChange={(e) => temp_phone2(e)}/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input type="text" className="form-control" placeholder="Enter address"  value={context.tempA} onChange={(e) => temp_address2(e)} />
					</div>
					
					<button type="button" className="btn btn-primary form-control"  onClick={() => updateContact()}>
						Save Changes
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};