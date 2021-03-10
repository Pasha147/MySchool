import React, { Component, Fragment } from 'react';
import './Director.css';
//import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"
import CreateUserForm from './CreateUserForm'
import UsersForm from './UsersForm'

class Director extends Component {

    constructor(props) {
        super(props)
        this.state = {
            curForm: '', //тип формы в поле формы
            createUserPosition: 'student', //значение по умолчанию для селекта выбора позиции
            createUserAlert: '', // сообщение при создании юзера
        }

        this.curUser = this.props.curUser
    }

    // static getDerivedStateFromProps(props, state) {
    //     return { curUser: props.curUser }
    // }

    clickCreateUserForm = () => {
        this.setState({ curForm: 'createUserForm' })
    }

    handleChange = ({ target: { value, id } }) => {
        this.setState(
            { [id]: value }
        )
    }

    clickButton = (event) => {
        let id = event.target.id

        if (id === 'UsersButt') { this.setState({ curForm: 'usersForm' }) }
        if (id === 'CreateUserButt') { this.setState({ curForm: 'createUserForm' }) }
    }

    clickCencelButton = () => {
        this.setState({ curForm: '' })
    }

    Exit = () => {
        window.location = '/'
    }

    render() {

        let { curForm } = this.state

        return (
            <div className="mainDirector">
                <h3 className="DirectorGrit"> {`Приветствую вас ${this.props.curUser.name} в вашем личном кабинете`}
                </h3>
                <div className="Director">
                    <div className="Lessons">
                        <p>Пройденные занятия по Математике</p>

                    </div>
                    <div className="Forms">
                        {/* <p>Forms</p> */}
                        <Fragment>
                            {curForm === 'createUserForm' &&
                                (<CreateUserForm clickCencelButton={this.clickCencelButton} />)}
                            {curForm === 'usersForm' &&
                                (<UsersForm curUser={this.curUser} clickCencelButton={this.clickCencelButton} />)}

                            {curForm === '' && (<p>Ok</p>)}
                        </Fragment>
                    </div>
                    <div className="Buttons">
                        <p>Control Panel</p>
                        <button
                            onClick={this.clickButton}
                            className="CreateUserButt"
                            id='CreateUserButt'
                        >
                            Create users
                        </button>
                        <button
                            id='UsersButt'
                            onClick={this.clickButton}
                            className="Users">Users</button>
                        <button
                            id='ExitButt'
                            onClick={this.Exit}
                            className="DirExit">Leaving your account</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Director;