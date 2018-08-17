import React, {Component} from 'react'
import SignInForm from '../auth/SignInForm'
import SignUpForm from '../auth/SignUpForm'
import MainMenu from '../MainMenu.js'
import {connect} from 'react-redux'
import {signUp, moduleName} from '../../ducks/auth'
import Loader from '../common/Loader'
import PropTypes from 'prop-types';

class AuthPage extends Component {

    static propTypes = {
        // with connect
        loading: PropTypes.bool.isRequired,

        // action creator
        signUp: PropTypes.func.isRequired
    };

    render() {
        const {loading} = this.props;
        const {formForAuth} = this.props.match.params;

        if (loading)
            return (
                <div>
                    <Loader/>
                </div>
            );

        return (
            <div>
                <MainMenu/>
                {this.getForm(formForAuth)}
            </div>
        )
    }

    getForm(typeForm) {

        if (typeForm === 'signIn') {
            return <SignInForm onSubmit={this.handleSignIn}/>
        } else if (typeForm === 'signUp') {
            return <SignUpForm onSubmit={this.handleSignUp}/>
        } else {
            return <div>Page not found</div>
        }
    }

    handleSignIn = (value) => console.log('---', value);
    handleSignUp = ({email, password}) => this.props.signUp(email, password);
}

export default connect(state => ({
    loading: state[moduleName].loading
}), {signUp})(AuthPage)