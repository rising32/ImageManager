import React, {Component} from "react";
import PropTypes from "prop-types";
import {reduxForm, Field} from "redux-form";
import {withRouter} from "react-router-dom";
import ButtonBase from '@material-ui/core/ButtonBase';
import {withStyles} from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search'

const styles = theme => {
    return {

        welcomeForm: {
            marginTop: 30,
            marginBottom: 10,
            position: 'relative',
        },

        menuForm: {
            margin: 0,
            position: 'relative',
        },

        welcomeField: {
            borderRadius: 4,
            backgroundColor: [['white', '!important']],
            border: '1px solid #ced4da',
            fontSize: 16,
            width: '100%',
            height: 46,
            padding: [[10, 50, 10, 12]]
        },

        menuField: {
            borderRadius: 6,
            backgroundColor: [['white', '!important']],
            border: '1px solid #ced4da',
            fontSize: 16,
            width: '100%',
            height: 36,
            padding: [[3, 50, 3, 12]]
        },

        button: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: 50,
            height: '100%',
            color: 'gray'
        },

        welcomeIconSearch: {
            width: 28,
            height: 28,
        },

        menuIconSearch: {
            width: 24,
            height: 24,
        }
    }
};

class SearchForm extends Component {

    static propTypes = {
        // from form
        handleSubmit: PropTypes.func.isRequired,

        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {

        const {handleSubmit, classes, theme, autoFocus = true} = this.props;
        const formClass = `${theme}Form`;
        const fieldRootClass = `${theme}Field`;
        const buttonIconClass = `${theme}IconSearch`;
        return (

            <form
                onSubmit={handleSubmit(this.handlerSearch)}
                className={classes[formClass]}
            >
                <Field
                    name="search"
                    component="input"
                    className={classes[fieldRootClass]}
                    autoFocus={autoFocus}
                    autoComplete="off"
                    placeholder="Enter image name"
                />

                < ButtonBase
                    type="submit"
                    className={classes.button}
                >
                    <Search className={classes[buttonIconClass]}/>
                </ButtonBase>
            </form>
        )
    }

    handlerSearch = value => {
        const searchKey = encodeURIComponent(value.search);
        this.props.history.push(`/search/${searchKey}`);
    };
}

const validate = ({search}) => {

    if (search) {
        search = search.trim();
    }

    const errors = {};

    if (!search) {
        errors.search = 'empty field'
    }

    return errors
};

export default reduxForm({
    form: "imageSearchForm",
    validate
})(withRouter(withStyles(styles)(SearchForm)));
