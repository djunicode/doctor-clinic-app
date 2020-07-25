import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
                            history.push("/therapist1")
                        }
                        else{
                            history.push("/receptionist1")
                        }
                    }} />
                </>
            }
        </AppBar>
    )
}

export default Header