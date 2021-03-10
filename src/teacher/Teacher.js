import React, { Component } from 'react';
import './Teacher.css';
import CreateStudentForm from './CreateStudentForm'
import MyStudentsForm from './MyStudentsForm'

class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            curForm: '',
        }
    }

    Exit = () => {
        window.location = '/'
    }

    clickButton = (event) => {
        let id = event.target.id
        if (id === 'MyStudentsButt') { this.setState({ curForm: 'MyStudentsForm' }) }
        if (id === 'CreateStudentButt') { this.setState({ curForm: 'CreateStudentForm' }) }
    }

    clickCencelButton = () => {
        this.setState({ curForm: '' })
    }

    render() {
        let { curForm } = this.state

        return (
            <div className="mainTeacher">
                <h3 className="TeacherGrit"> {`Приветствую вас ${this.props.curUser.name} в вашем личном кабинете`}
                </h3>
                <div className="Teacher">
                    <div className="TeacherLessons">
                        <p>Пройденные занятия по Математике</p>

                    </div>
                    <div className="TeacherForms">
                    {curForm === 'MyStudentsForm' &&
                            (<MyStudentsForm 
                            clickCencelButton={this.clickCencelButton} 
                            curUser={this.props.curUser}
                            changeUser={this.props.changeUser}
                            />)}
                        {curForm === 'CreateStudentForm' &&
                            (<CreateStudentForm 
                            clickCencelButton={this.clickCencelButton} 
                            curUser={this.props.curUser}
                            changeUser={this.props.changeUser}
                            />)}
                        {curForm === '' && (<p>Ok</p>)}
                    </div>
                    <div className="TeacherButtons">
                        <p>Control Panel</p>
                        <button
                            id='MyStudentsButt'
                            onClick={this.clickButton}
                            className="TeacherMyStudents">
                            My students
                            </button>
                        <button
                            id='CreateStudentButt'
                            onClick={this.clickButton}
                            className="TeacherCreateStudent">
                            Add a students
                            </button>
                        <button
                            id='ExitButt'
                            onClick={this.Exit}
                            className="TeacherExit">Leaving your account</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Teacher;