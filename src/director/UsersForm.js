import React, { Component } from 'react';
import './UsersForm.css';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

class UsersForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            run: false,
        }
        this.users = [] //вся база
        // this.users1 = [] //только имеилы

    }

    firebaseConfig = {
        apiKey: "AIzaSyBBFHWnf5LxETL_1XsrKOE1FCJXDqNqY04",
        authDomain: "school-ed28c.firebaseapp.com",
        projectId: "school-ed28c",
        storageBucket: "school-ed28c.appspot.com",
        messagingSenderId: "947971810550",
        appId: "1:947971810550:web:4bc3f88abcab9c5106f8d7"
    };

    createUsers = async () => {
        this.users = []

        if (!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }
        //-------создает массив с пользователями (только имеилы)------
        // try {
        //     let db = firebase.firestore()
        //     let docRef = db.collection('users')
        //     let qS = await docRef.get()
        //     qS.forEach((doc) => {
        //         this.users1.push(doc.id)
        //     })
        // } catch (error) { alert(error) }
        //-------------------------------------------      

        //-------создает массив с пользователями ------
        try {
            let db = firebase.firestore()
            let querySnapshot = await db.collection("users").get()
            querySnapshot.forEach((doc) => {
                let tUser = doc.data()
                tUser.checked = false
                this.users.push(tUser)
            })
        } catch (error) { alert(error) }
        //console.log(this.users)


        this.setState({ run: true })
    }

    componentDidMount() {
        this.createUsers()

    }


    clickCencelButton = () => {
        this.props.clickCencelButton()
    }

    changeCheck = ({ target: { value, checked } }) => {
        let tUser = this.users[Number(value)]
        tUser.checked = checked
    }

    clickDeliteButton = async () => {

        // console.log(delUsers)
        if (!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }
        // let dir = firebase.auth().currentUser;
        //let dirEmail =  dir.email

        // console.log('dir', dir.email)

        let delUsers = this.users.filter(item => item.checked)
        let delUserLengh = delUsers.length
        delUsers.forEach(async (item, index) => {

            try {
                let delUserEmail = item.email
                let delUserPass = item.password
                console.log('delUser ', delUserEmail, delUserPass)


                let db = firebase.firestore()
                await db.collection("users").doc(delUserEmail).delete()
                console.log('del data')



                await firebase.auth().signInWithEmailAndPassword(delUserEmail, delUserPass)
                let user = firebase.auth().currentUser;
                console.log('del start', index, delUserLengh)
                await user.delete()
                console.log('del finish')
                if (index === (delUserLengh - 1)) {
                    let dirEmail = this.props.curUser.email
                    let dirPass = this.props.curUser.password
                    await firebase.auth().signInWithEmailAndPassword(dirEmail, dirPass)
                    let user = firebase.auth().currentUser;
                    console.log('dir', user.email)

                    this.users = []
                    this.createUsers()

                }
            } catch (error) { alert(error) }

        })

    }






    render() {


        return (
            <div>

                <div className='ListOfUsers'>
                    <p>List of users</p>

                    <div className='ListOfUsersHead'>
                        <input
                            type="checkbox"
                            id={`check`}
                            key={`check`}
                            onChange={this.changeCheck}
                        />
                        <span
                            id={`spanNum`}
                            key={`spanNum`}
                            className='SpanNum'>
                            N
                        </span>
                        <span
                            id={`spanPosition`}
                            key={`spanPosition`}
                            className='SpanPosition'>
                            Position
                        </span>
                        <span
                            id={`spanEmail`}
                            key={`spanEmail`}
                            className='SpanEmail'>
                            Email
                        </span>
                        <span
                            id={`spanName`}
                            key={`spanName`}
                            className='SpanName'>
                            Name
                        </span>
                    </div>

                    {this.users.map((user, i) => (
                        <div>
                            <input
                                type="checkbox"
                                name="acheckbox"
                                value={`${i}`}
                               
                                id={`idcheck${i}`}
                                key={`check${i}`}

                                onChange={this.changeCheck}
                            />
                            <span
                                id={`spanNum${i}`}
                                key={`spanNum${i}`}
                                className='SpanNum'>
                                {i + 1}
                            </span>

                            <span
                                id={`spanPosition${i}`}
                                key={`spanPosition${i}`}
                                className='SpanPosition'>
                                {user.position}
                            </span>

                            <span
                                id={`spanEmail${i}`}
                                key={`spanEmail${i}`}
                                className='SpanEmail'>
                                {user.email}
                            </span>

                            <span
                                id={`spanName${i}`}
                                key={`spanName${i}`}
                                className='SpanName'>
                                {user.name}
                            </span>
                        </div>
                    ))}

                </div>
                <div className='UsersButton'>
                    <button>Change</button>
                    <button onClick={this.clickDeliteButton}>Delete</button>
                    <input
                        key="CancelUsersForm"
                        type="button"
                        value="Cancel"
                        onClick={this.clickCencelButton}

                    />
                </div>
            </div>
        )
    }
}

export default UsersForm;