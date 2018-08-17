import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {withStyles} from '@material-ui/core/styles';
import ButtonLike from './ButtonLike'
import ButtonCollect from './ButtonCollect'
import ButtonDownload from './ButtonDownload'
import PropTypes from "prop-types";

const styles = theme => {
    return {
        root: {
          cursor: 'zoom-out'
        },

        container: {
            maxWidth: 900,
            position: 'relative',
            cursor: 'default'
        },

        action: {
            position: 'absolute',
            display: 'flex',
            top: 35,
            right: 20,
        },

        img: {
            maxWidth: '100%',
            height: 'auto',
            cursor: 'zoom-out',
        }
    }
};

class MyComponent extends Component {

    static propTypes ={
        isOpen: PropTypes.bool.isRequired,
        toggleDialog: PropTypes.func.isRequired,
        imageData: PropTypes.shape({
            data: PropTypes.object.isRequired
        }),

        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {

        const {isOpen, toggleDialog, classes, imageData} = this.props;
        return (
            <div>

                <Dialog
                    open={isOpen}
                    onClose={toggleDialog}
                    classes={{
                        root: classes.root,
                        paper: classes.container
                    }}
                >

                    <DialogContent>

                        <div className={classes.action}>

                            <ButtonLike imageData={imageData}/>
                            <ButtonCollect imageData={imageData}/>
                            <ButtonDownload imageData={imageData}/>

                        </div>

                        <img
                            src={imageData.data.largeImageData.url}
                            className={classes.img}
                            onClick={() => toggleDialog()}
                            alt=""/>

                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(MyComponent);
