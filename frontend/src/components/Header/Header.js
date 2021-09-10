import React, {useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import '../Header/Header.css';

function Header() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [cartCount, setCartCount] = useState();
    const [user, setUser] = useState("");
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        //check whether user has signed in
        if(localStorage.getItem("patientAuthToken") || localStorage.getItem("doctorAuthToken")){
            setIsSignedIn(true)
        }else{
            setIsSignedIn(false)
        }

        //get user data
        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        
        async function getCartCount() {
            await axios.get(`http://localhost:8070/cart/${user._id}&Shopping`).then((res) => {
                let result = res.data.result;
                setCartCount(result.length) 
            })
        }
        getCartCount();

    }, [user._id,location])

    function profile() {
        history.push(`/patient/profile/`)
    }

    function cart() {
        history.push(`/cart/${user._id}/shopping`)
    }

    function signin() {
        history.push('/patient/signin')
    }
    
    return (
        <header>
            <div className="container-fluid">
                <nav className="navbar navbar-inverse navbar-expand-lg navbar-light fixed-top">
                    <div className="container-fluid">
                        <ul>
                            <IconButton>
                                <DehazeIcon fontSize="large"/>
                            </IconButton>
                        </ul>
                        <div className="header-title">
                            <h3>Aspirus &nbsp; Health &nbsp; Care</h3>
                        </div>
                        <ul>
                            {isSignedIn ?
                                <div>
                                    <IconButton onClick={cart}>
                                        <Badge badgeContent={cartCount} color="error">
                                            <ShoppingCartIcon fontSize="large"/>
                                        </Badge>
                                    </IconButton>
                                    <IconButton onClick={profile}>
                                        <Avatar alt="Remy Sharp" src="/images/userimg.jpg" />
                                    </IconButton> 
                                </div>
                                :
                                <button className="btn btn-outline-primary" onClick={signin}>
                                    Sign In
                                </button>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
