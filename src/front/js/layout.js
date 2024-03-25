import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { AddContact } from "./pages/AddContacts";
import { EditContact } from "./pages/EditContacts";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


export const AppContext = createContext();
//create your first component
const Layout = () => {
    
    
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const [currentUser, setCurrentUser] = useState( [2,"Log in"]);
    const [listC, setListC] = useState([]);
	const [favList, setFavList] = useState([]);

    const [tempN, setTempN] = useState('');
	const [tempP, setTempP] = useState('');
	const [tempA, setTempA] = useState('');
	const [tempE, setTempE] = useState('');


    // {
    //     name:'John',
    //     address: '2937 Utopia dr, Miramar, FL',
    //     phone: '786 234-4391',
    //     email: 'John@gmail.com'
    // }

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <AppContext.Provider value={{
	            listC,
                setListC,
                favList,
                setFavList,
				currentUser,
				setCurrentUser,
                tempA,
				setTempA,
				tempE,
				setTempE,
				tempN,
				setTempN,
				tempP,
				setTempP
			}} >
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Login />} path="/login" />
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<EditContact />} path="/editcontact"/>
                        <Route element={<AddContact />} path="/addcontact"/>
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
            </AppContext.Provider>
        </div>
    );
};

export default injectContext(Layout);
