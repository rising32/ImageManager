import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import ViewImage from './ViewImage'
import ButtonLike from './ButtonLike'
import ButtonCollect from './ButtonCollect'
import ButtonDownload from './ButtonDownload'
import PropTypes from "prop-types";

const styles = theme => {
    return {
        imageCard: {
            margin: 10,
            position: 'relative',
            cursor: 'zoom-in',

            '&:hover $action': {
                display: 'flex'
            }
        },

        action: {
            position: 'absolute',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            cursor: 'default',
            right: 0,
            display: 'none',
        },

        actionTopLine: {
            top: 10,
        },

        actionBottomLine: {
            bottom: 4,
        },

    }
};

class ImageCard extends Component {

    state = {
        collectionDialogIsOpen: false,
        viewImageDialogIsOpen: false
    };

    static propTypes = {
        imageData: PropTypes.shape({
            src: PropTypes.string.isRequired,
            width: PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.number.isRequired,
            ]),
            height: PropTypes.oneOfType([
                PropTypes.string.isRequired,
                PropTypes.number.isRequired,
            ]),
            id: PropTypes.string.isRequired,
            data: PropTypes.object.isRequired
        }),

        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {

        const {imageData, classes} = this.props;

        return (
            <section
                className={classes.imageCard}
            >
                <img
                    src={imageData.src}
                    width={imageData.width}
                    height={imageData.height}
                    onClick={this.toggleViewImageDialog}
                    alt=""
                />

                <div
                    className={[
                        classes.action,
                        classes.actionTopLine
                    ].join(" ")}
                >
                    <ButtonLike imageData={imageData}/>
                    <ButtonCollect imageData={imageData}/>

                </div>

                <div
                    className={[
                        classes.action,
                        classes.actionBottomLine
                    ].join(" ")}
                >
                    <ButtonDownload imageData={imageData}/>
                </div>

                <ViewImage
                    isOpen={this.state.viewImageDialogIsOpen}
                    toggleDialog={this.toggleViewImageDialog}
                    imageData={imageData}
                />
            </section>
        )
    }

    toggleViewImageDialog = () => {
        this.setState({
            viewImageDialogIsOpen: !this.state.viewImageDialogIsOpen
        });
    };
}

export default withStyles(styles)(ImageCard);