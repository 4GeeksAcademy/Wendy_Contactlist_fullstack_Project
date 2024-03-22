import React from "react";
import { BrowserRouter, Route, Routes,Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, createContext } from "react";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {
	//const { store, actions } = useContext(Context);
  
    const navigate = useNavigate();
    const context = useContext(AppContext);

   

// 	const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });

useEffect(() => {
     let test= context.currentUser[0];
    let test2='https://verbose-umbrella-x55q9xw6jqpwc44-3001.app.github.dev/'+test+'/contact';
    console.log(test2)
    fetch(test2)
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            // Read the response as JSON
            return response.json();
        })
        .then(responseAsJson => {
            // Do stuff with the JSONified response
            let test = []
            let final = []
            test = [...responseAsJson.results];
            console.log(test)
            test.forEach((elm) => {
                let test2 = {
                    id: elm.id,
                    name: elm.name,
                    phone: elm.phone,
                    address: elm.address,
                    email: elm.email
                }
                final.push(test2)
            })
             context.setListC(final);

        })
        .catch(error => {
            console.log('Looks like there was a problem: \n', error);
        });


}, []);


function delete_contact(){
	
}


	return (
		<div className="container-fluid">
			
            {/* {context.listC.map((contact) =>	)} */}

			<ul>
			{context.listC.map((contact) =>
		
      
        <li className="list-group-item" key={contact.id}>
        <div className="row w-100">
            <div className="col-12 col-sm-6 col-md-3 px-0">
                <img src={rigoImage} alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid" />
            </div>
            <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                <div className=" float-right">
                     <Link to={`/editcontact`} state={contact} >
                    <button className="btn">
                        <i className="fas fa-pencil-alt mr-3" />
                    </button>
                    </Link> 
                     <button className="btn" onClick={() =>delete_contact()}> 
                     <i className="fas fa-trash-alt fa-bounce fa-xl" />
                   </button> 

                

                </div>
                <label className="name lead">{contact.name}</label>
                <br />
                <i className="fas fa-map-marker-alt text-muted mr-3" />
                <span className="text-muted">{contact.address}</span>
                <br />
                <span
                    className="fa fa-phone fa-fw text-muted mr-3"
                    data-toggle="tooltip"
                    title=""
                    data-original-title="(870) 288-4149"
                />
                <span className="text-muted small">{contact.phone}</span>
                <br />
                <span
                    className="fa fa-envelope fa-fw text-muted mr-3"
                    data-toggle="tooltip"
                    data-original-title=""
                    title=""
                />
                <span className="text-muted small text-truncate">{contact.email}</span>
            </div>
        </div>
    </li>	
			)};
	</ul>
	</div>
)

};
