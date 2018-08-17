import React from "react";
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => {
    return {
        container: {
            margin: [[0, 'auto']],
            marginBottom: 10,
            width: '100%'
        },

        containerAuth: {
            width: 300
        },

        field: {
            marginBottom: 10,
            width: '100%'
        }
    }
};

ErrorField.propTypes = {
    type: PropTypes.string,
    meta: PropTypes.shape({
        error: PropTypes.string,
        touched: PropTypes.bool
    }),
    textLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.func
    ]),
    input: PropTypes.object,

    // withStyles
    classes: PropTypes.object.isRequired
};

function ErrorField(props) {
    const {
        input,
        type,
        meta: {error, touched},
        classes,
        labelText
    } = props;

    let errorText = "";
    let isError = false;

    if (error && touched) {
        errorText = <FormHelperText id="name-error-text">
            {error}
        </FormHelperText>;
        isError = true
    }

    if (!error && touched) {
        isError = false
    }

    return (
        <div
            className={classes.container}
        >
            <FormControl
                className={classes.field}
                error={isError}>
                <InputLabel htmlFor={input.name}>{labelText}</InputLabel>
                <Input
                    {...input}
                    id={input.name}
                    type={type}
                    autoComplete="off"
                />
                {errorText}
            </FormControl>
        </div>
    );
}

export default withStyles(styles)(ErrorField);
