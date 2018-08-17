import React, {Component} from "react";
import {connect} from "react-redux";
import {addCollection} from "../ducks/myCollections";
import {reduxForm, Field} from "redux-form";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ErrorField from './common/ErrorField';
import {withStyles} from '@material-ui/core/styles';
import store from '../redux'

const styles = theme => {
    return {
        form: {
            width: '100%',
            display: 'flex',
            marginBottom: 20
        },

        fieldContainer: {
            flexGrow: 1,
        },

        button: {
            marginLeft: 20
        },

        buttonSuccess: theme.button.success,
    }
};

class CreateNewCollection extends Component {

    state = {
        buttonIsDisabled: true
    };

    static propTypes = {

        // action creator
        addCollection: PropTypes.func.isRequired,

        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {
        const {handleSubmit, classes} = this.props;

        return (

            <form
                onSubmit={handleSubmit(this.createNewCollection)}
                className={classes.form}
            >

                <Field
                    name="nameCollection"
                    id="nameCollection"
                    component={ErrorField}
                    labelText="New collection"
                />

                <Button
                    className={[
                        classes.button,
                        classes.buttonSuccess
                    ].join(" ")}
                    type="submit"
                >
                    Create
                </Button>
            </form>
        )
    }

    createNewCollection = ({nameCollection}) => {

        if (!nameCollection) {
            return
        }

        nameCollection = nameCollection.trim();

        const {addCollection} = this.props;
        addCollection(nameCollection);
        this.props.reset();
    };
}

const validate = ({nameCollection}) => {

    if (nameCollection) {
        nameCollection = nameCollection.trim();
    }

    const errors = {};

    const myCollections = store.getState().listMyCollections;
    let repeat = myCollections.some(value => value.nameCollection === nameCollection);

    if (repeat) {
        errors.nameCollection = 'this name is already in use'
    }

    return errors
};

export default connect(null,
    {addCollection}
)(reduxForm({
    form: "newCollection",
    validate
})(withStyles(styles)(CreateNewCollection)));
