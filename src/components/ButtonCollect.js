import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from "@material-ui/icons/Add";
import AddToCollection from "./AddToCollection.js";

const styles = theme => {
    return {
        button: theme.button.imageCardButton,

        buttonAddCollection: {
            paddingRight: 10,
            paddingLeft: 8,
            color: '#424242',
            fontWeight: 400
        },

        buttonInCollection: {
            backgroundColor: 'rgba(67, 160, 71, 0.8)',
            color: "white",

            '&:hover': {
                backgroundColor: '#43A047',
            }
        },

        iconAdd: {
            marginRight: 5,
            width: 20,
            height: 20
        },
    }
};

class MyComponent extends Component {

    state = {
        inCollection: false,
        collectionDialogIsOpen: false,
    };

    static propTypes ={
        imageData: PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.object.isRequired
        }),

        // from connect
        listImagesInCollection: PropTypes.object.isRequired,

        // withStyles
        classes: PropTypes.object.isRequired
    };

    componentDidMount() {
        const {imageData, listImagesInCollection} = this.props;

        if (listImagesInCollection.get(imageData.id)) {
            this.setInCollection()
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.listImagesInCollection.get(this.props.imageData.id)) {
            this.setInCollection()
        } else {
            this.setState({
                inCollection: false
            })
        }
    }

    render() {

        const {classes, imageData} = this.props;

        return (
            <div>
                <Button
                    className={[
                        classes.button,
                        classes.buttonAddCollection,
                        this.state.inCollection ? classes.buttonInCollection : null
                    ].join(" ")}
                    variant="contained"
                    onClick={this.toggleCollectionDialog}
                >
                    <Add
                        className={classes.iconAdd}
                    />
                    Collect
                </Button>

                <AddToCollection
                    isOpen={this.state.collectionDialogIsOpen}
                    toggleDialog={this.toggleCollectionDialog}
                    imageId={imageData.id}
                    imageData={imageData.data}
                />
            </div>
        );
    }

    setInCollection = () => {
        this.setState({
            inCollection: true
        })
    };

    toggleCollectionDialog = () => {
        this.setState({
            collectionDialogIsOpen: !this.state.collectionDialogIsOpen
        });
    };
}

export default connect(state => ({
    listImagesInCollection: state.listImagesInCollection
}))(withStyles(styles)(MyComponent));
