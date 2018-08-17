import React, {Component} from 'react';
import {connect} from 'react-redux';
import GridListOfImages from './GridListOfImages.js'
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";

const styles = theme => {
    return {
        listImagesInCollection: theme.container,
        pageTitle: theme.pageTitle
    }
};

class MyCollection extends Component {

    static propTypes = {
        keyCollection: PropTypes.string.isRequired,

        // from connect
        listImagesInCollection: PropTypes.object.isRequired,
        listMyCollections: PropTypes.object.isRequired,

        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {
        const {listImagesInCollection, listMyCollections, keyCollection, classes} = this.props;

        const title = listMyCollections.getIn([keyCollection, 'collection']).size !== 0 ?
            listMyCollections.getIn([keyCollection, 'nameCollection'])
            : 'No images yet';

        return (

            <section
                className={classes.listImagesInCollection}
            >
                <h2 className={classes.pageTitle}>
                    {title}
                </h2>
                <GridListOfImages listOfImages={listImagesInCollection}/>
            </section>
        );
    }
}

export default connect((state, ownProps) => ({
    listImagesInCollection: state.listMyCollections.getIn([ownProps.keyCollection, 'collection']),
    listMyCollections: state.listMyCollections
}))(withStyles(styles)(MyCollection));
