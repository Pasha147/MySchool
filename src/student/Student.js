import React, { Component } from 'react';
import './Student.css';

class Student extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lessonsList: [],
            lessonsList1: [],
            payList: [],
            prp: '',
        }
        if (this.props.curUser.lessons) {
            this.props.curUser.lessons.forEach((lesson) => {
                this.state.lessonsList1.push({
                    date: lesson.date,
                    rate: lesson.rate,
                    checked: false,
                })
            })
            this.state.lessonsList = [...this.props.curUser.lessons]
        }

        if (this.props.curUser.payments) {
            this.props.curUser.payments.forEach((payment) => {
                this.state.payList.push({
                    date: payment.date,
                    payment: payment.payment,
                    checked: false,
                })

            })
           
            this.calca1 = this.calc1(this.state.payList, this.state.lessonsList1)
        }

    }

    getPrp = () => {

        let summLess = this.state.lessonsList1.reduce((sum, current) => sum + Number(current.rate), 0)
        let summPays = this.state.payList.reduce((sum, current) => sum + Number(current.payment), 0)
        if (summLess - summPays < 0) { return `Переплата ${-(summLess - summPays)}` }
        if (summLess - summPays > 0) { return `Недоплата ${summLess - summPays}` }
        if (summLess - summPays === 0) { return `Все занятия оплочены` }

    }

    calc1 = (payList, lessonsList1) => {
        let calc = []
        let remainder = 0
        let numLessons = lessonsList1.length
        let nl = 0
        let rate = 0
        // if (numLessons > 0) {
        //     let rate = Number(lessonsList1[0].rate)
        // }

        payList.forEach((payment, index) => {
            let payedLessons = []
            remainder += Number(payment.payment)
            for (; nl < numLessons; nl++) {
                rate = Number(lessonsList1[nl].rate)
                if (remainder >= rate) {
                    remainder -= rate
                    payedLessons.push(nl)
                } else break
            }
            calc[index] = {
                payment: payment.payment,
                remainder,
                payedLessons: [...payedLessons]
            }
        })
        return calc
    }

    changeCheckPayments = ({ target: { value, checked } }) => {
        let paymentsList = [...this.state.payList]
        paymentsList[Number(value)].checked = checked
        this.setState({ payList: paymentsList })

        let payedLessons = this.calca1[value].payedLessons
        if (payedLessons.length > 0) {
            let lessonsList1 = [...this.state.lessonsList1]
            payedLessons.forEach((n) => {
                if (lessonsList1.length >= n + 1) {
                    lessonsList1[n].checked = checked
                }
            })
            this.setState({ lessonsList1 })
        }
    }

    changeCheckLessons = ()=>{

    }

    Exit = () => {
        window.location = '/'
    }

    paymentsList = () => {
        let paymentsList = []
        if (this.state.payList) {
            paymentsList = [...this.state.payList]
        }
       
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
            <div className="MainStudent">
                <h3 className="StudGrit"> {`Приветствую тебя ученик ${this.props.curUser.name} в твоем личном кабинете`}
                </h3>
                <div className="Stud">
                    <div className="StudLessons">
                        <p>Пройденные занятия по Математике</p>

                    </div>
                    <div className="StudForms">
                        <p>{`${this.props.curUser.email}  ${this.props.curUser.name} `}</p>
                        <div className='CurStudTables'>
                            <div className='CurStudLessons'>
                                <p>Уроки</p>
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
                                                <span key={`lessonRate${Number(index)}`}>
                                                    {`${lesson.rate}`}
                                                </span>

                                            </li>
                                        ))
                                    }
                                </ul>
                                <hr></hr>
                            </div>
                            <div
                                key={`CurStudPaymentsA`}
                                className='CurStudPayments'>
                                <p>Проплаты</p>
                                <this.paymentsList />
                                <hr></hr>
                            </div>

                        </div>
                        <p>{`${this.getPrp()}`}</p>
                    </div>
                    <div className="StudButtons">
                        <p>Control Panel</p>
                        <button
                            id='ExitButt'
                            onClick={this.Exit}
                            className="StudExit">Leaving your account</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Student;