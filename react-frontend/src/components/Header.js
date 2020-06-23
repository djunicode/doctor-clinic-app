import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import './header.css'

const Header = () => {
    return(
        <AppBar id="header">
            <span className="brand"></span>
        </AppBar>
    )
}

export default Header