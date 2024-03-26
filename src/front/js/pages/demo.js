import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext} from "react";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Demo = () => {
const { store, actions } = useContext(Context);
  
    const navigate = useNavigate();
    const context = useContext(AppContext);

useEffect(() => {
 
    fetch(process.env.BACKEND_URL + "/api/user/"+context.currentUser[0]+"/contact/fav")
    .then(res => {
        if (!res.ok) throw Error(res.statusText);
        return res.json();
    })
    .then(response => {
                  // context.setFavList(response)
                 
                  let test=[...response];
                 
                  let final=[...context.favList]
                 test.forEach((elm)=>{
                    context.listC.forEach((el) =>{
                        if( el.id == elm.contact_id){
                            final.push(el)
                        }
                      
                    })
                        
                        })
                      context.setFavList(final);
                      
                     
				
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




function add_remove_favorite(elm) {

    let newArray2 = context.favList.find((element) => element == elm);
    console.log(elm)
    if (!newArray2) {
        let newArray = [...context.favList];
        newArray.push(elm);
        context.setFavList(newArray);
        fetch_add_fav(elm.id);

    }
    else {

        let newArray = context.favList.filter((element) => element != elm);
       // fetch_remove_fav(context.listC[pos].id)
       // context.setFavList(newArray);


    }
}

function fetch_add_fav(fav) {
    let testArray = [context.currentUser[0], fav];

        fetch(process.env.BACKEND_URL + "/api/user/"+context.currentUser[0]+"/contact/fav/new?", 
        {
            method: 'PUT',
            body: JSON.stringify(testArray),
            headers: {
                'Content-Type': 'application/json'
            }

        
})
            .then(res => {
                if (!res.ok) throw Error(res.statusText);
                return res.json();
            })
            .then(response => {
            
               context.setListC(response)
                
            })
    
            .catch(error => console.log(error))




}

function fetch_remove_fav(fav) {
    let testArray = [context.currentUser.id, fav];
    fetch(process.env.BACKEND_URL + "/api/user/"+context.currentUser[0]+"/contact/fav!", {
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






	return (
		<div className="container-fluid">
			
			<ul>
			{context.favList.map((contact,inx) =>
		
      
        <li className="list-group-item" key={inx}>
        <div className="row w-100">
            <div className="col-12 col-sm-6 col-md-3 px-0">
                <img src={rigoImage} alt="Mike Anamendolla" className="rounded-circle mx-auto d-block img-fluid" />
            </div>
            <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                <div className=" float-right">
                <span onClick={() =>add_remove_favorite(contact)} ><i className={context.favList.includes(contact) ? "fa-solid fa-heart fa-bounce fa-xl testred" : "fa-regular fa-heart fa-bounce fa-xl "}></i></span>
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
