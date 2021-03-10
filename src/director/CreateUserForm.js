import React, { Component} from 'react';
import './CreateUserForm.css';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

class CreateUserForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
           
            createUserPosition: 'student', //значение по умолчанию для селекта выбора позиции
            createUserAlert: '', // сообщение при создании юзера
        }
    }

    // static getDerivedStateFromProps(props, state) {
    //     //return { curUserName: props.curUser.name }
    // }

    handleChange = ({ target: { value, id } }) => {
        this.setState(
            { [id]: value }
        )
    }

    createUser = async (event) => {
        event.preventDefault()
        //console.log('create user', this.state)
        let { createUserEmail,
            createUserPosition,
            createUserPassword,
            createUserName } = this.state

        const firebaseConfig = {
            apiKey: "AIzaSyBBFHWnf5LxETL_1XsrKOE1FCJXDqNqY04",
            authDomain: "school-ed28c.firebaseapp.com",
            projectId: "school-ed28c",
            storageBucket: "school-ed28c.appspot.com",
            messagingSenderId: "947971810550",
            appId: "1:947971810550:web:4bc3f88abcab9c5106f8d7"
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        try {
            await firebase.auth().createUserWithEmailAndPassword(createUserEmail, createUserPassword)
            let newUser = {
                email: createUserEmail,
                name: createUserName,
                password: createUserPassword,
                position: createUserPosition,
            }
            let db = firebase.firestore()
            let docRef = db.collection('users').doc(createUserEmail)
            await docRef.set(newUser)
            this.setState({ createUserAlert: 'Юзер создан и добавлен в базу' })

        } catch (error) { alert(error) }


    }

    clickCencelButton=()=>{
        this.props.clickCencelButton()
    }

    render() {

        return (
            <form className="CreateUserForm" onSubmit={this.createUser}  >

                <p>Enter username password and position </p>
                <input
                    type="text"
                    id="createUserEmail"
                    autoComplete=""
                    placeholder="email"
                    onChange={this.handleChange}
                />
                <input
                    type="password"
                    id="createUserPassword"
                    autoComplete=""
                    placeholder="password"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    id="createUserName"
                    autoComplete=""
                    placeholder="Имя пользователя"
                    onChange={this.handleChange}
                />
                <select
                    name="select"
                    onChange={this.handleChange}
                    id="createUserPosition"
                    defaultValue='student'
                >
                    <option value="student">student</option>
                    <option value="teacher" >teacher</option>
                </select>
                <div>
                    <input
                        type="submit"
                        value="Sign In"

                    />
                    <input
                        type="button"
                        value="Cancel"
                        onClick={this.clickCencelButton}

                    />
                </div>
                <div>
                    <p>{this.state.createUserAlert}</p>
                </div>
            </form>
        )
    }
}

export default CreateUserForm;