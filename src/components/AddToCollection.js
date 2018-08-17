import React, {Component} from "react";
import CreateNewCollection from "./CreateNewCollection";
import SelectCollectionForAddPhoto from "./SelectCollectionForPhoto";
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => {

    return {
        modalMenu: {
            width: 600,
            height: '70vh',
            paddingBottom: 20
        },

        action: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: '#fff',
            left: 0,
            padding: [[10, 25]]
        },

        buttonDone: theme.button.success,
    }
};

class AddToCollection extends Component {

    static propTypes ={
        isOpen: PropTypes.bool.isRequired,
        toggleDialog: PropTypes.func.isRequired,
        imageId: PropTypes.string.isRequired,
        imageData: PropTypes.object.isRequired,

        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {

        const {classes, isOpen, toggleDialog, imageId, imageData} = this.props;

        return (
            <Dialog
                open={isOpen}
                onClose={toggleDialog}
                classes={{
                    paper: classes.modalMenu
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                >
                    Select the collection to add image
                </DialogTitle>

                <DialogContent>

                    <CreateNewCollection/>

                    <SelectCollectionForAddPhoto
                        imageId={imageId}
                        imageData={imageData}
                    />

                    <DialogActions
                        className={classes.action}
                    >
                        <Button
                            className={classes.buttonDone}
                            variant="outlined"
                            onClick={() => toggleDialog()}
                        >
                            Ok
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default withStyles(styles)(AddToCollection);