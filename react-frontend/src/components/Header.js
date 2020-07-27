import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Context } from '../context/Context';
import './header.css'

const Header = () => {
    const context = useContext(Context)
    const history = useHistory();

    return(
        <AppBar id="header">
            <span className="brand"></span>
            {context.loggedIn &&
                <>
                    <ExitToAppIcon id="logout" onClick = {() => {
                        context.logout()
                    }}/>
                    <HomeIcon id="home" onClick = {() => {
                        if(context.is_doctor){
                            if(window.location.pathname!=="/profile"){
                                history.push("/profile")
                            }
                        }
                        else{
                            if(window.location.pathname!=="/home"){
                                history.push("/home")
                            }
                        }
                    }} />
                    {!context.is_doctor && <AddBoxIcon id="addDoc" onClick={() => {
                        if(window.location.pathname!=="/doctorsignup"){
                            history.push("/doctorsignup")
                        }
                    }} />}
                </>
            }
        </AppBar>
    )
}

export default Header