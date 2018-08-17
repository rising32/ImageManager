import React, {Component} from 'react';
import CloudDownload from "@material-ui/icons/CloudDownload";
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";

const styles = theme => {
    return {
        button: theme.button.imageCardButton,

        buttonDownload: {
            color: '#424242',
        }
    }
};

class ButtonDownload extends Component {

    static propTypes ={
        imageData: PropTypes.shape({
            data: PropTypes.object.isRequired
        }),

        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {

        const {classes, imageData} = this.props;

        return (
            <Button
                className={[
                    classes.button,
                    classes.buttonDownload
                ].join(" ")}
                variant="contained"
                component="a"
                href={imageData.data.originalImageData.url}
                target="_blank"
            >
                <CloudDownload/>
            </Button>
        );
    }
}

export default withStyles(styles)(ButtonDownload);
