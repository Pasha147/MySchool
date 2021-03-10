import React, { Component } from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
        }
      
    }
   
       render() {
        
        let {mainNav} = this.props

        return (
            <header className="Header">
                <h1>MySchool !!!</h1>
                <nav className='nav'>
                    <ul>
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to={`${mainNav}`}>Your account</NavLink></li>
                        <li><NavLink to="/contacts">Contacts</NavLink></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;