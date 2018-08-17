import React, {Component} from 'react';
import PropTypes from "prop-types";
import {reduxForm, Field} from 'redux-form';
import * as emailValidator from 'email-validator';
import ErrorField from '../common/ErrorField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => {
    return {
        container: {
            width: 600,
            margin: [[140, 'auto']],
            padding: [[80, 20]],
            textAlign: 'center'
        },

        pageTitle: theme.pageTitle,

        fieldWrap: {
            maxWidth: 300,
            margin: [[0, 'auto']]
        },

        button: {
            marginTop: 40
        },

        buttonSuccess: theme.button.success
    }
};

class SignUpForm extends Component {

    static propTypes = {
        // from form
        handleSubmit: PropTypes.func.isRequired
    };

    render() {

        const {handleSubmit, classes} = this.props;

        return (

            <Paper className={classes.container}>
                <h2 className={classes.pageTitle}>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div
                        className={classes.fieldWrap}
                    >
                        <Field
                            name="email"
                            type="email"
                            labelText="Email"
                            component={ErrorField}
                        />

                        <Field
                            className={classes.field}
                            name="password"
                            type="password"
                            labelText="Password"
                            component={ErrorField}
                        />
                    </div>
                    <Button
                        className={[
                            classes.button,
                            classes.buttonSuccess
                        ].join(" ")}
                        type="submit"
                        variant="outlined"
                        size="large"
                    >
                        Register
                    </Button>
                </form>
            </Paper>
        )
    }
}

const validate = ({email, password}) => {
    const errors = {};

    if (!email) {
        errors.email = 'email is required'
    } else if (!emailValidator.validate(email)) {
        errors.email = 'invalid email'
    }

    if (!password) {
        errors.password = 'password is required'
    } else if (password.length < 6) {
        errors.password = 'too short'
    }

    return errors
};

export default reduxForm({
    form: 'auth',
    validate
})(withStyles(styles)(SignUpForm));