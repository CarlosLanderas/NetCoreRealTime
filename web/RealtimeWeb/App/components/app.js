import React, {PropTypes} from "react";
import { Header } from './common/Header';
export class App extends React.Component {

    render() {
        return(

            <div className="container-fluid">                
             <Header/>
                {this.props.children}                
            </div>
         );
    }
}

