import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {
const { store, actions } = useContext(Context);
  
    const navigate = useNavigate();
    const context = useContext(AppContext);

   

     // Do stuff with the JSONified response
         

  

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
 
    fetch(process.env.BACKEND_URL + "/api/user/2/contact")
        .then(res => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
        })
        .then(response => {
        
           context.setListC(response)
            
        })

        .catch(error => console.log(error));

}, []);





function delete_contact(){
	
}


	return (
		<div className="container-fluid">
			
            {/* {context.listC.map((contact) =>	)} */}

			<ul>
			{context.listC.map((contact,id) =>
		
      
        <li className="list-group-item" key={id}>
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
