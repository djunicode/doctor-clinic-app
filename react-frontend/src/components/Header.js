import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import './header.css'

const Header = () => {
    return(
        <AppBar style={{backgroundColor: '#CF6A6A', position:'fixed'}}>
            <span className="brand"></span>
        </AppBar>
    )
}

export default Header