import React from "react";
import { BrowserRouter, Route, Routes,Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, createContext } from "react";
import { AppContext } from "../layout";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Login = () => {
	//const { store, actions } = useContext(Context);
    const [userN, setUserN] = useState('')
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
        setUserN(test)
    }

    function get_password(val) {
        let test = val.target.value;
        setUserP(test)
    }


    function login_function() {
        if(userLabel[0]=='Username'){

        if (userN.length > 5 && userP.length >5) {

        let test= [userN,userP]
      
        
        fetch(process.env.BACKEND_URL + "/api/user/login/?", {
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
                    navigate('/')
                
                } )
                .catch(error => alert(error));    
           
        }

        else {
            alert('Please enter a valid username and/or password')
            setUserN('')
            setUserP('')
        }
    }
    else{
        let test=['Username', 'Email','Password', 'Log in'];
        setUserLabel(test)
        if (userN.length > 5 && userP.length >5 && userU.length>5) {
            fetch_newUser();
        }
        else {
            alert('Please enter a valid username, email and/or password')
            setUserN('')
            setUserP('')
            setUserU('')
        }

       


    }
function fetch_newUser(){
   
		let testArray = [userU,userN,userP];
		fetch('', {
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
			.then(response => console.log('Success:', response))
			.catch(error => console.error(error));


	
}


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

         {/* <input type="" placeholder="username" style={userLabel[0]=='Username'? {display:'none' } : {display:'block' }} value={userU} id="username" onChange={(e) => get_username(e)} /> */}

			<input type="text" placeholder="Name" onChange={(e) => get_email(e)}/>
			<input type="email" placeholder="Email"  onChange={(e) => get_email(e)} />
			<input type="password" placeholder="Password"  onChange={(e) => get_password(e)}/>
			<button >Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<span onClick={() => login_function()}> <h1>Sign in</h1> </span>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button>Sign In</button>
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
