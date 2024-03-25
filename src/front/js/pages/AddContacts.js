import React from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../layout";
import { useNavigate } from "react-router-dom";

export const AddContact = () => {

	const context = useContext(AppContext);

	

	function temp_name(val){
		
		context.setTempN(val.target.value);
	}

	function temp_phone(val){
		context.setTempP(val.target.value);
	}

	function temp_address(val){
		context.setTempA(val.target.value);
	}

	function temp_email(val){
		context.setTempE(val.target.value);
	}



function saveContact(){
if(context.tempA.length>10 && context.tempN.length>5 && context.tempE.length>10 && context.tempA.length>1 && context.tempP.length==10)

{



	let testObj= {
		full_name: context.tempN , 
		email: context.tempE,
		agenda_slug: "Wendy",
		address: context.tempA,
		phone: context.tempP	

	}
	
	let newArray= [...context.listC];
	newArray.push(testObj);
	context.setListC(newArray);
	context.setTempA('');
	context.setTempE('');
	context.setTempP('');
	context.setTempN('');


	fetch('https://playground.4geeks.com/apis/fake/contact/', {
		method: 'POST', // or 'POST'
		body: JSON.stringify(testObj),
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

	else{
		alert('SOmething is missing');
	}

}

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input type="text" className="form-control" placeholder="Full Name"  value={context.tempN} onChange={(e) => temp_name(e)}/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input type="email" className="form-control" placeholder="Enter email"   value={context.tempE} onChange={(e) => temp_email(e)}/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input type="phone" className="form-control" placeholder="Enter phone"   value={context.tempP} onChange={(e) => temp_phone(e)}/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input type="text" className="form-control" placeholder="Enter address"  value={context.tempA} onChange={(e) => temp_address(e)} />
					</div>
					<button type="button" className="btn btn-primary form-control"  onClick={() => saveContact()}>
						Save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};