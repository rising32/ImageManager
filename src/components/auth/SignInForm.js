import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import ErrorField from '../common/ErrorField'

class SignInForm extends Component {

    render() {

        const {handleSubmit} = this.props;
        // TODO
        return (
            <div>
                <h2>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <Field name="email" component={ErrorField}/>
                    <Field name="password" type="password" component={ErrorField}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'auth'
})(SignInForm)