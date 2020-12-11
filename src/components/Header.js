import React from 'react';
import logoImg from '../img/logo.svg';
import folder from '../img/folder.svg';

const Header = () => {
    return (
        <>
            <div className="header-title col-sm-12">
                <img src={logoImg} alt="logo"/>
                <h3>React Table</h3>
            </div>
            <div className="col-sm-12" id="message">
                <h2>Please select data set </h2>
                <img id="folder" src={folder} alt="folder"/>
            </div>
        </>

    );
};

export default Header;