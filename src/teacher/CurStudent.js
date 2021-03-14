import React, { Component } from 'react';
import './CurStudent.css';
import firebase from "firebase/app";
import "firebase/firestore";


class CurStudent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lessonsList: [],
            lessonsList1: [],
            payList: [],

        }
        if (this.props.selectedStudent.lessons) {
            this.props.selectedStudent.lessons.forEach((lesson) => {
                this.state.lessonsList1.push({
                    date: lesson.date,
                    checked: false,
                })
            })
            this.state.lessonsList = [...this.props.selectedStudent.lessons]
        }

        if (this.props.selectedStudent.payments) {
            this.props.selectedStudent.payments.forEach((payment) => {
                this.state.payList.push({
                    date: payment.date,
                    payment: payment.payment,
                    checked: false,
                })

            })
            this.calc = this.calc(this.state.payList)

        }

    }

    calc = (payList) => {
        let taxes = 300
        let n = 0
        let remainder = 0
        let lessons = 0
        let calc = []
        payList.forEach((payment, index) => {
            let lessonList = []
            let curPay = Number(payment.payment) + remainder
            if (curPay >= taxes) {
                n = Math.floor(curPay / taxes)
                remainder = curPay % taxes

            } else {
                n = 0
                remainder = curPay
            }

            for (let i = lessons + 1; i <= lessons + n; i++) {
                lessonList.push(i)
            }

            lessons += n
            calc.push({
                index: index + 1,
                n: n,
                remainder: remainder,
                lessons: lessons,
                lessonList: [...lessonList]
            })

        })
        return calc
    }

    firebaseConfig = {
        apiKey: "AIzaSyBBFHWnf5LxETL_1XsrKOE1FCJXDqNqY04",
        authDomain: "school-ed28c.firebaseapp.com",
        projectId: "school-ed28c",
        storageBucket: "school-ed28c.appspot.com",
        messagingSenderId: "947971810550",
        appId: "1:947971810550:web:4bc3f88abcab9c5106f8d7"
    };

    componentDidMount() {
        //console.log(this.props)
    }

    handleChange = ({ target: { value, id } }) => {
        this.setState(
            { [id]: value }
        )
    }

    clickAddLessonButton = async () => {
        let newLessons = []
        if (this.props.selectedStudent.lessons) {
            newLessons = [...this.props.selectedStudent.lessons]
        }
        newLessons.push({ date: this.state.addDateLesson })
        let lessonsList1 = [...this.state.lessonsList1]
        lessonsList1.push({
            date: this.state.addDateLesson,
            checked: false,
        })
        let studEmail = this.props.selectedStudent.email

        if (!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }
        //-------считывает профиль текущего студента ------
        let curUser = {}
        try {

            let db = firebase.firestore()
            let docRef = db.collection('users').doc(studEmail)
            let doc = await docRef.get()
            curUser = doc.data()
        } catch (error) { alert(error) }

        curUser.lessons = newLessons

        //-------записывает профиль текущего студента ------
        try {

            let db = firebase.firestore()
            let docRef = db.collection('users').doc(studEmail)
            await docRef.set(curUser)

        } catch (error) { alert(error) }

        //-----------------------------------------------------------

        this.setState({ lessonsList1 })
        console.log(curUser,)
    }

    changeCheckLessons = ({ target: { value, checked } }) => {
        let lessonsList = [...this.state.lessonsList1]
        lessonsList[Number(value)].checked = checked
        this.setState({ lessonsList1: lessonsList })

    }

    changeCheckPayments = ({ target: { value, checked } }) => {
        let paymentsList = [...this.state.payList]
        paymentsList[Number(value)].checked = checked
        this.setState({ payList: paymentsList })
        console.log(this.calc)

        let payLessons = this.calc[value].lessonList
        let lessonsList1 = [...this.state.lessonsList1]
        payLessons.forEach((n) => {
            if (lessonsList1.length>=n){
            lessonsList1[n-1].checked = checked
            }
        })
        this.setState({ lessonsList1 })
    }

    clickDeleteLessonButton = async () => {
        // let dellLessons = this.state.lessonsList1.filter(lesson => lesson.checked)
        let newLessons = []
        let lessonsList1 = []

        this.state.lessonsList1.forEach((lesson, index) => {
            if (!lesson.checked) {
                newLessons.push(this.props.selectedStudent.lessons[index])
                lessonsList1.push(this.state.lessonsList1[index])
            }
        })

        let studEmail = this.props.selectedStudent.email
        if (!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }
        // -------считывает профиль текущего студента ------
        let curUser = {}
        try {

            let db = firebase.firestore()
            let docRef = db.collection('users').doc(studEmail)
            let doc = await docRef.get()
            curUser = doc.data()
        } catch (error) { alert(error) }
        curUser.lessons = newLessons
        console.log(curUser)

        //-------записывает профиль текущего студента ------
        try {

            let db = firebase.firestore()
            let docRef = db.collection('users').doc(studEmail)
            await docRef.set(curUser)

        } catch (error) { alert(error) }

        this.setState({ lessonsList1 })
    }

    changeForm = () => {
        this.props.changeForm('myStudentsForm')
    }

    clickAddPaymentButton = async () => {
        let addPay = {
            date: this.state.addDatePayment,
            payment: this.state.addPayment
        }

        let studEmail = this.props.selectedStudent.email

        if (!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }
        //-------считывает профиль текущего студента ------
        let curUser = {}
        try {

            let db = firebase.firestore()
            let docRef = db.collection('users').doc(studEmail)
            let doc = await docRef.get()
            curUser = doc.data()
        } catch (error) { alert(error) }

        curUser.payments.push(addPay)

        addPay.checked = false
        let newPayList = [...this.state.payList, addPay]
        this.setState({ payList: newPayList })
       // this.calc = this.calc(newPayList)

        //-------записывает профиль текущего студента ------
        try {

            let db = firebase.firestore()
            let docRef = db.collection('users').doc(studEmail)
            await docRef.set(curUser)

        } catch (error) { alert(error) }

    }

    clickDeletePaymentButton = async () => {
        let newPayList = []
        let newPayments = []

        this.state.payList.forEach((payment, index) => {
            if (!payment.checked) {

                newPayList.push(payment)

                newPayments.push({
                    date: payment.date,
                    payment: payment.payment,
                })
            }
        })

        let studEmail = this.props.selectedStudent.email

        if (!firebase.apps.length) {
            firebase.initializeApp(this.firebaseConfig);
        }
        //-------считывает профиль текущего студента ------
        let curUser = {}
        try {

            let db = firebase.firestore()
            let docRef = db.collection('users').doc(studEmail)
            let doc = await docRef.get()
            curUser = doc.data()
        } catch (error) { alert(error) }

        curUser.payments = newPayments

        //-------записывает профиль текущего студента ------
        try {

            let db = firebase.firestore()
            let docRef = db.collection('users').doc(studEmail)
            await docRef.set(curUser)

        } catch (error) { alert(error) }
        this.setState({ payList: newPayList })
        //this.calc = this.calc(newPayList)
    }

    lessonsList = () => {

        return (
            <ul className='ListOfLessons'>
                {
                    this.state.lessonsList1.map((lesson, index) => (
                        <li key={`lesson${Number(index)}`}>
                            <input
                                type="checkbox"
                                id={`check${Number(index)}`}
                                key={`lessonCheck${Number(index)}`}
                                value={`${index}`}
                                checked={this.state.lessonsList1[index].checked}
                                onChange={this.changeCheckLessons}
                            />
                            <span key={`lessonNum${Number(index)}`}>
                                {`${index + 1}`}
                            </span>
                            <span key={`lessonDate${Number(index)}`}>
                                {`${lesson.date}`}
                            </span>

                        </li>
                    ))
                }
            </ul>
        )
    }
    paymentsList = () => {
        let paymentsList = []
        if (this.state.payList) {
            paymentsList = [...this.state.payList]
        }
        // console.log('ddd', paymentsList)
        return (
            <ul className='ListOfLessons'>
                {
                    paymentsList.map((payment, index) => (
                        <li key={`payment${Number(index)}`}>
                            <input
                                type="checkbox"
                                id={`checkPay${Number(index)}`}
                                key={`paymentCheck${Number(index)}`}
                                value={`${index}`}
                                checked={this.state.payList[index].checked}
                                onChange={this.changeCheckPayments}

                            />
                            <span key={`paymentNum${Number(index)}`}>
                                {`${index + 1}`}
                            </span>
                            <span key={`paymentDate${Number(index)}`}>
                                {`${payment.date}`}
                            </span>
                            <span key={`paymentValue${Number(index)}`}>
                                {`${payment.payment}`}
                            </span>

                        </li>
                    ))
                }
            </ul>
        )
    }

    render() {

        return (
            <div>
                <p>{`${this.props.selectedStudent.email}  ${this.props.selectedStudent.name} `}</p>
                <div className='CurStudTables'>
                    <div className='CurStudLessons'>
                        <p>Уроки</p>
                        <this.lessonsList />
                        <input
                            id='addDateLesson'
                            onChange={this.handleChange}
                        >
                        </input>
                        <button onClick={this.clickAddLessonButton}>Add</button>
                        <button onClick={this.clickDeleteLessonButton}>Delete</button>
                    </div>
                    <div
                        key={`CurStudPaymentsA`}
                        className='CurStudPayments'>
                        <p>Проплаты</p>
                        <this.paymentsList />
                        <input
                            id='addDatePayment'
                            onChange={this.handleChange}
                        >
                        </input>
                        <input
                            id='addPayment'
                            onChange={this.handleChange}
                        >
                        </input>
                        <button onClick={this.clickAddPaymentButton}>Add</button>
                        <button onClick={this.clickDeletePaymentButton}>Delete</button>
                    </div>

                </div>
                <button onClick={this.changeForm}>Go back</button>


            </div>
        )
    }
}

export default CurStudent;