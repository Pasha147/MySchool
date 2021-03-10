import React, { Component } from 'react';
import './Aside.css';

class Aside extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
 

    render() {
        
        return (
            <aside className="Aside">
                 <p>{this.props.curUserName}</p>
            </aside>
        )
    }
}

export default Aside;