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
 
    fetch(process.env.BACKEND_URL + "/api/user/"+context.currentUser[0]+"/contact")
        .then(res => {
            if (!res.ok) throw Error(res.statusText);
            return res.json();
        })
        .then(response => {
        
           context.setListC(response)
            
        })

        .catch(error => console.log(error));

}, []);





function delete_contact(pos){   

    
		let newArray= context.listC.filter((element)=> element.id!=pos);
		context.setListC(newArray);	

		fetch(process.env.BACKEND_URL + "/api/user/"+context.currentUser[0]+"/contact/"+pos, {
			method: 'DELETE', // or 'POST'
		})
			.then(res => {
				if (!res.ok) throw Error(res.statusText);
				return res.json();
			})
			.then(response => console.log('Success:', response))
			.catch(error => console.error(error));
		//	props.onClose();
	
}




function add_remove_favorite(elm, pos) {
    let newArray2 = context.favList.find((element) => element == elm);

    if (!newArray2) {
        let newArray = [...context.favList];

        newArray.push(context.listC[pos]);
        context.setFavList(newArray);
        fetch_add_fav(context.listC[pos].id);

    }
    else {

        let newArray = context.favList.filter((element, index) => element != elm);
        fetch_remove_fav(context.listC[pos].id)
        context.setFavList(newArray);

    }
}

function fetch_add_fav(fav) {
    let testArray = [context.currentUser.id, fav];

    console.log('char id to add '+fav)
    fetch(''+ context.currentUser.id +'/favorite/'+fav+'/t', {
        method: 'POST', // or 'POST'
        body: JSON.stringify(testArray),
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

function fetch_remove_fav(fav) {
    let testArray = [context.currentUser.id, fav];
    fetch('' + context.currentUser.id + '/favorite/' + fav+'/h', {
        method: 'DELETE', // or 'POST'
        body: JSON.stringify(testArray),
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
		<div className="container-fluid">
			<div>
                <Link to="/addcontact">
            <button className="btn btn-primary" >Add Contact</button>   
            </Link>
            </div>
			<ul>
			{context.listC.map((contact,inx) =>
		
      
        <li className="list-group-item" key={inx}>
        <div className="row w-100">
            <div className="col-12 col-sm-6 col-md-3 px-0">
                <img src={rigoImage} alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid" />
            </div>
            <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                <div className=" float-right">
                <span onClick={() =>add_remove_favorite()} ><i class="fa-regular fa-heart fa-xl"></i></span>
                     <Link to={`/editcontact`} state={contact} >
                    <button className="btn">
                        <i className="fas fa-pencil-alt fa-xl mr-3" />
                    </button>
                    </Link> 
                     <button className="btn" onClick={() =>delete_contact(contact.id)}> 
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
