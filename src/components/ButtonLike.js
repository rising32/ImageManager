import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Favorite from "@material-ui/icons/Favorite";
import {connect} from "react-redux";
import {addLike, deleteLike} from "../ducks/liked";

const styles = theme => {
    return {
        button: theme.button.imageCardButton,

        buttonLiked: {
            backgroundColor: 'rgba(255, 23, 68, 0.9)',
            color: 'white',

            '&:hover': {
                backgroundColor: '#FF1744'
            }
        },

        iconLike: {
            color: "red",
        },

        iconLiked: {
            color: "white",
        },
    }
};

class ButtonLike extends Component {

    state = {
      isLiked: false
    };

    static propTypes ={
        imageData: PropTypes.shape({
            id: PropTypes.string.isRequired,
            data: PropTypes.object.isRequired
        }),

        // from connect

        liked: PropTypes.object.isRequired,

        //action creator
        addLike: PropTypes.func.isRequired,
        deleteLike: PropTypes.func.isRequired,

        // withStyles
        classes: PropTypes.object.isRequired
    };

    componentWillMount() {
        const {liked, imageData} = this.props;

        if (liked.get(imageData.id)) {
            this.setState({
                isLiked: true
            })
        }
    }

    componentWillReceiveProps(nextProps) {

        const {liked, imageData} = nextProps;

        if (liked.get(imageData.id)) {
            this.setState({
                isLiked: true
            })
        } else {
            this.setState({
                isLiked: false
            })
        }
    }

    render() {

        const {classes, imageData} = this.props;

        return (
            <Button
                className={[
                    classes.button,
                    this.state.isLiked ? classes.buttonLiked : null
                ].join(" ")}
                variant="contained"
                onClick={() => this.handleLiked(imageData.id, imageData.data)}
            >

                <Favorite className={[
                    classes.iconLike,
                    this.state.isLiked ? classes.iconLiked : null
                ].join(" ")}
                />

            </Button>
        );
    }

    handleLiked = (imageId, imageData) => {
        const {liked, addLike, deleteLike} = this.props;

        if (!liked.get(imageId)) {
            addLike(imageId, imageData);
            this.setState({
                isLiked: true
            })
        } else {
            deleteLike(imageId);
            this.setState({
                isLiked: false
            })
        }
    };
}

export default connect(state => ({
    liked: state.liked
}), {addLike, deleteLike})(withStyles(styles)(ButtonLike));
