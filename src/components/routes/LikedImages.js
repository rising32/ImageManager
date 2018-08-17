import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainMenu from '../MainMenu.js'
import GridListOfImages from '../GridListOfImages.js'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";

const styles = theme => {
    return {
        myFavorite: theme.container,
        pageTitle: theme.pageTitle,
    }
};

class LikedImages extends Component {

    static propTypes = {
        // from connect
        listLikedImages: PropTypes.object.isRequired,

        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {

        const {classes, listLikedImages} = this.props;
        const headerText = listLikedImages.size !== 0 ? 'My favorites' : 'No favorite images yet';

        return (
            <div>
                <MainMenu/>
                <section
                    className={classes.myFavorite}
                >
                    <h2 className={classes.pageTitle}>
                        {headerText}
                    </h2>
                    <GridListOfImages
                        listOfImages={listLikedImages}
                    />
                </section>
            </div>
        );
    }
}

export default connect(state => ({
    listLikedImages: state.liked
}))(withStyles(styles)(LikedImages));
