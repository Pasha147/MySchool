import React, { Component } from 'react';
import './Login.css';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"
//import { browserHistory } from 'react-router-dom'
import { Redirect } from 'react-router'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            navigate: false,

        }

    }

    handleChange = ({ target: { value, id } }) => {
        this.setState(
            { [id]: value }
        )
    }

    enterAccount = async (event) => {
        event.preventDefault()
        const { email, password } = this.state

        const firebaseConfig = {
            apiKey: "AIzaSyBBFHWnf5LxETL_1XsrKOE1FCJXDqNqY04",
            authDomain: "school-ed28c.firebaseapp.com",
            projectId: "school-ed28c",
            storageBucket: "school-ed28c.appspot.com",
            messagingSenderId: "947971810550",
            appId: "1:947971810550:web:dd64159bd558a4a706f8d7"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        try {
            //Authorisation-----------------------
           let response = await firebase.auth().signInWithEmailAndPassword(email, password)
            //--------------------------------------------

            let db = firebase.firestore()
            let docRef = db.collection('users').doc(email)
            let doc = await docRef.get()
            this.user = doc.data()
            this.props.changeUser(this.user)
            this.setState({ navigate: true })

            //----------варианты програмной навигации-------------------
            //browserHistory.push('/')
            //this.context.router.push('/')
            // window.location = '/';
            // this.props.history.push('/');
        } catch (error) { alert(error) }

    }


    render() {

        const { navigate } = this.state

        // here is the important part
        if (navigate) {
            if (this.user.position === 'teacher') {
                return <Redirect to="/teacher" push={true} />
            }
            if (this.user.position === 'student') {
                return <Redirect to="/student" push={true} />
            }
            if (this.user.position === 'director') {
                return <Redirect to="/director" push={true} />
            }

        }

        return (

            <form className="LoginBlock" onSubmit={this.enterAccount}>

                <p>Enter your username and password</p>
                <input
                    type="text"
                    id="email"
                    autoComplete="username"
                    placeholder="username"
                    onChange={this.handleChange}
                />
                <input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder="password"
                    onChange={this.handleChange}
                />
                <input
                    type="submit"
                    value="Sign In!"
                // onClick ={this.createAccount}
                />

            </form>

        )
    }
}


export default Login;