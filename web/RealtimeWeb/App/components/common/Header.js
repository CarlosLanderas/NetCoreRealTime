import React from "react";
import {Link} from "react-router";
import LogoImage from '../images/logo.png';
const Header = () => {

    return(
        <nav className="navbar navbar-default">            
            <div className="container-fluid">                 
                <div className="navbar-header">
                    <a href="#" className="navbar-brand navbar-link"><img src={LogoImage}/></a>
                    <button data-toggle="collapse" data-target="#navcol-1" className="navbar-toggle collapsed">
                        <span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                </div>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="nav navbar-nav">
                        <li className="active">
                         <Link to="twitterfeed">Twitter feed</Link>                         
                        </li>  
                        <li>
                        <Link to="chat">Sockets Chat</Link>                         
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export {Header};