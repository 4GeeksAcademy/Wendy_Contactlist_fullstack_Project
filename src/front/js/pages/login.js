import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Login = () => {
	//const { store, actions } = useContext(Context);
    const [userE, setUserE] = useState('')
    const [userU, setUserU] = useState('')
    const [userP, setUserP] = useState('')
	const [signingE, setSigningE] = useState('')
    
    const navigate = useNavigate();
    const context = useContext(AppContext);

    // useEffect(() => {

    // }, []);



// 	const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

function sign_up_effect () {
 	//container.classList.add("right-panel-active");
	 setSigningE("")
 }

 function sign_in_effect () {
 	//container.classList.remove("right-panel-active");
	setSigningE("right-panel-active");
 }



    function get_username(val) {
        let test = val.target.value;
        setUserU(test)
    }
    
    function get_email(val) {
        let test = val.target.value;
        setUserE(test)
    }

    function get_password(val) {
        let test = val.target.value;
        setUserP(test)
    }


    function login_function() {
     

        if (userE.length > 5 && userP.length >5) {

        let test= [userE,userP]
   
        fetch(process.env.BACKEND_URL + "/api/user/login", {
                method: 'POST',
                body: JSON.stringify(test), 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    return res.json();
                })
                .then(response => {
                 context.setCurrentUser(response);
                // navigate('/home')
				
				  
                
                } )
                .catch(error =>  console.log(error));    
           
        }

        else {
            alert('Please enter a valid username and/or password')
            setUserE('')
            setUserP('')
        }


	}


function fetch_newUser(){
   
		let testArray = [userU,userE,userP];
		fetch(process.env.BACKEND_URL + "/api/user/new", {
			method: 'POST',
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
				setUserE('')
				setUserP('')
				setUserU('')
				console.log('Success:', response)

			})
			.catch(error => console.error(error));

}

	



	return (
		<div className="body_div">
			
<div class="container" id={signingE}>
	<div class="form-container sign-up-container">
		<form action="#">
			<h1>Create Account</h1>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your email for registration</span>

       
			<input type="text" placeholder="Name" onChange={(e) => get_username(e)}/>
			<input type="email" placeholder="Email"  onChange={(e) => get_email(e)} />
			<input type="password" placeholder="Password"  onChange={(e) => get_password(e)}/>
			<button >Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<span > <h1>Sign in</h1> </span>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
			<input type="email" placeholder="Email" onChange={(e) => get_email(e)}/>
			<input type="password" placeholder="Password"   onChange={(e) => get_password(e)}/>
			<a href="#">Forgot your password?</a>
			<button onClick={() => login_function()}> Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>

<footer>
	<p>
		Created with <i class="fa fa-heart"></i> by
		<a target="_blank" href="https://florin-pop.com">Florin Pop</a>
		- Read how I created this and how you can join the challenge
		<a target="_blank" href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/">here</a>.
	</p>
</footer>
		
		</div>
	);
};
