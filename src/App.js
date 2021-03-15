
import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './header/Header'
import Footer from './footer/Footer'
import { Route, Switch } from 'react-router-dom'
import Home from './home/Home'
import Login from './login/Login'
import Error from './error/Error'
import Contacts from './contacts/Contacts'
import Teacher from './teacher/Teacher'
import Student from './student/Student'
import Director from './director/Director'
import Aside from './aside/Aside'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      curUserEmail: '',
      curUserName: '',
      mainNav: '/login',
    }

    this.globalState = {
      curUser: {
        email: '',
        name: '',
      }
    }

  }

  changeUser = (user) => {
    this.globalState.curUser = user

    this.setState({ curUserName: this.globalState.curUser.name, })
    if (this.globalState.curUser.position === 'teacher') { this.setState({ mainNav: '/teacher' }) }
    if (this.globalState.curUser.position === 'student') { this.setState({ mainNav: '/student' }) }
    if (this.globalState.curUser.position === 'director') { this.setState({ mainNav: '/director' }) }
  }

  render() {

    let { mainNav } = this.state
    let { curUserName } = this.state


    return (
      <Fragment>
        <div className='App'>
          <Header mainNav={mainNav} />
          <main className='Main'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login/' render={() => (<Login changeUser={this.changeUser} />)} />
              <Route path='/teacher/'
                render={() => {
                  if (this.globalState.curUser.position === 'teacher') {
                    return (<Teacher
                      curUser={this.globalState.curUser}
                      changeUser={this.changeUser}
                    />)
                  } else {
                    return (<Login changeUser={this.changeUser} />)
                  }
                }}
              />

              <Route path='/student/'
                render={() => {
                  if (this.globalState.curUser.position === 'student') {
                    return (
                      <Student curUser={this.globalState.curUser} />
                    )
                  } else {
                    return (<Login changeUser={this.changeUser} />)
                  }
                }}
              />

              <Route path='/director/'
                render={() => {
                  if (this.globalState.curUser.position === 'director') {
                    return (<Director curUser={this.globalState.curUser} />)
                  } else {
                    return ((<Login changeUser={this.changeUser} />))
                  }
                }}
              />

              <Route path='/contacts' component={Contacts} />
              <Route path='*' component={Error} />
            </Switch>
          </main>
          <Aside curUserName={curUserName} />
          <Footer />
        </div>
      </Fragment>

    )
  }
}

export default App;
