import React, { Component } from 'react';
import './MyStudentsForm.css';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"


class MyStudentsForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            studentsList: [],
            massage: '',
        }
        this.students = []
        this.curUser = {}
    }


    clickCencelButton = () => {
        this.props.clickCencelButton()
    }

    firebaseConfig = {
        apiKey: "AIzaSyBBFHWnf5LxETL_1XsrKOE1FCJXDqNqY04",
        authDomain: "school-ed28c.firebaseapp.com",
        projectId: "school-ed28c",
        storageBucket: "school-ed28c.appspot.com",
        messagingSenderId: "947971810550",
        appId: "1:947971810550:web:4bc3f88abcab9c5106f8d7"
    };

    createStudentsList = async () => {
        this.students = []

        if (!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }
        //-------считывает профиль текущего учителя ------
        try {
            let teacherEmail = this.props.curUser.email
            let db = firebase.firestore()
            let docRef = db.collection('users').doc(teacherEmail)
            let doc = await docRef.get()
            this.curUser = doc.data()
        } catch (error) { alert(error) }

        //-------создает массив со студентами из базы ------
        try {
            let db = firebase.firestore()
            let querySnapshot = await db.collection("users").where("position", "==", "student").get()
            querySnapshot.forEach((doc) => {
                let tUser = doc.data()
                tUser.checked = false
                this.students.push(tUser)
            })
        } catch (error) { alert(error) }
        //console.log(this.users)
        let studentsList = []

        let myStudents = [...this.props.curUser.myStudents]
        this.students.forEach((student, index) => {
            if (myStudents.includes(student.email)) {
                student.check = false
                studentsList.push(student)
            }
        })
        this.setState({ studentsList: studentsList })
    }

    changeCheck = ({ target: { value, checked } }) => {
        // let tUser = this.students[Number(value)]
        // tUser.checked = checked
        let studentsList = [...this.state.studentsList]
        studentsList[Number(value)].check = checked
        this.setState({ studentsList: studentsList })

    }

    componentDidMount() {
        this.createStudentsList()

    }

    clickDeletedButton = async () => {
        let delStudents = this.state.studentsList.filter(student => student.check)
        let delStudentsEmail = []
        delStudents.forEach((student) => {
            delStudentsEmail.push(student.email)
        })
        let newMyStudents = []
        this.props.curUser.myStudents.forEach((student) => {
            if (!delStudentsEmail.includes(student)) {
                newMyStudents.push(student)
            }
        })
        this.curUser.myStudents = newMyStudents

        //-------записывает профиль текущего учителя ------
        try {
            let teacherEmail = this.props.curUser.email
            let db = firebase.firestore()
            let docRef = db.collection('users').doc(teacherEmail)
            await docRef.set(this.curUser)

        } catch (error) { alert(error) }
        this.props.changeUser(this.curUser)
        //-----------------------------------------------------------

        let studentExist = []
        let myStudents = [...this.curUser.myStudents]
        this.students.forEach((student, index) => {
            if (myStudents.includes(student.email)) {
                student.check = false
                studentExist.push(student)
            }
        })
        this.setState({ studentsList: studentExist,
            massage: 'удалено из моих учеников'
        })

        // let newMyStudents = [...this.props.curUser.myStudents]
        // addStudents.filter((student) => {
        //     newMyStudents.push(student.email)
        // })
        // this.curUser.myStudents = newMyStudents

        // //-------записывает профиль текущего учителя ------
        // try {
        //     let teacherEmail = this.props.curUser.email
        //     let db = firebase.firestore()
        //     let docRef = db.collection('users').doc(teacherEmail)
        //     await docRef.set(this.curUser)

        // } catch (error) { alert(error) }
        // this.props.changeUser(this.curUser)
        // //-----------------------------------------------------------

        // let studentNotExist = []
        // let myStudents = [...this.curUser.myStudents]
        // this.students.forEach((student, index) => {
        //     if (!myStudents.includes(student.email)) {
        //         student.check = false
        //         studentNotExist.push(student)
        //     }
        // })
        // this.setState({ studentsList: studentNotExist,
        // massage:'добавлено в мои ученики' })

    }

    render() {

        return (
            <div>
                <div className='ListOfStudents'>
                    <p>My students</p>

                    <div className='ListOfStudentsHead'>
                        <input
                            type="checkbox"
                            id={`check`}
                            key={`check`}
                        // onChange={this.changeCheck}
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
                    {this.state.studentsList.map((user, index) => {
                        let i = index.toString()
                        return (
                            <div key={`div${i}`} >
                                <input
                                    type="checkbox"
                                    name="acheckbox"
                                    value={`${i}`}
                                    checked={this.state.studentsList[i].check}

                                    id={`idcheck${i}`}
                                    key={`check${i}`}

                                    onChange={this.changeCheck}
                                />
                                <span
                                    id={`spanNum${i}`}
                                    key={`spanNum${i}`}
                                    className='SpanNum'>
                                    {index + 1}
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
                        )
                    })}
                </div>
                <div className='CreateStudentFormButt'>
                    <button>Change</button>
                    <button onClick={this.clickDeletedButton}>Delete</button>
                    <input
                        key="CancelUsersForm"
                        type="button"
                        value="Cancel"
                        onClick={this.clickCencelButton}

                    />
                </div>
                <p>{this.state.massage}</p>
            </div>
        )
    }
}

export default MyStudentsForm;