import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Context } from '../context/Context'
import './header.css'

const Header = () => {
    const context = useContext(Context)
    return(
        <AppBar id="header">
            <span className="brand"></span>
            {context.loggedIn &&
                <ExitToAppIcon id="logout" onClick = {() => {
                    context.logout()
                }}/>
            }
        </AppBar>
    )
}

export default Header