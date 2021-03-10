import React,{Component} from 'react';
import './Teacher.css';

class Teacher extends Component{
    constructor(props) {
        super(props)
        this.state = {
           
        }
    }
    static getDerivedStateFromProps(props, state) {
        return { curUserName: props.curUser.name }
    }


    render(){
        return (
            <div className="mainTeacher">
                <h3 className="TeacherGrit"> {`Приветствую вас ${this.state.curUserName} в вашем личном кабинете`}
                </h3>
                <div className="Teacher">
                    <div className="Lessons">
                        <p>Пройденные занятия по Математике</p>

                    </div>
                    <div className="Forms">
                        <p>Forms</p>
                        {/* <Fragment>
                            {formType === 1 && (<this.createStudentForm />)}
                            {formType === 0 && (<p>Ok</p>)}
                        </Fragment> */}
                    </div>
                    <div className="Buttons">
                        <p>Control Panel</p>
                        <button onClick={this.chengeForm} className="CreateStudent">Create a student</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Teacher;