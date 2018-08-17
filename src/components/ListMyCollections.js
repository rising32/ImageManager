import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";

const styles = theme => {
    return {
        myCollection: theme.container,

        pageTitle: theme.pageTitle,

        itemCollection: {
            '&:hover $boxImages': {
                opacity: 0.8,
            }
        },

        boxImages: {
            minWidth: 285,
            minHeight: 285,
            backgroundColor: '#E0E0E0',
            objectFit: 'cover',
            position: 'relative',
            marginBottom: 10,
        },

        coverCollection: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            top: 0,
            left: 0,
        },

        description: {
            padding: [[0, 10]],
        },

        nameCollection: {
            color: 'black',
            fontSize: 18
        },

        totalImage: {
            color: '#757575',
            fontSize: 14,
        }
    }
};

class ListCollections extends Component {

    static propTypes = {
        // from connect
        listMyCollections: PropTypes.object.isRequired,

        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {
        const {classes} = this.props;

        const arrMyCollections = this.getArrMyCollections();

        return (

            <section className={classes.myCollection}>
                <h2 className={classes.pageTitle}>My collection</h2>
                <Grid
                    container
                    component="section"
                    spacing={32}
                >
                    {arrMyCollections}
                </Grid>
            </section>
        )
    }

    getArrMyCollections = () => {
        const {listMyCollections, classes} = this.props;
        const arrMyCollections = [];

        listMyCollections.forEach((value, key) => {

            const coverCollection = this.getCoverCollection(value);
            const textTotalImageInCollection = this.getTotalImagesInCollection(value);

            arrMyCollections.push(
                <Grid
                    key={key}
                    item
                    className={classes.itemCollection}
                    component={"section"}
                >
                    <Link to={`/myCollections/${key}`}>
                        <div className={classes.boxImages}>
                            {coverCollection ? coverCollection : null}
                        </div>
                        <div className={classes.description}>
                            <div className={classes.nameCollection}>
                                {value.nameCollection}
                            </div>
                            <div className={classes.totalImage}>
                                {textTotalImageInCollection}
                            </div>
                        </div>
                    </Link>
                </Grid>
            );
        });

        return arrMyCollections;
    };

    getCoverCollection = (collection) => {

        const {classes} = this.props;
        const last = collection.get('collection').last();
        const urlLastImageInCollection = last ? last.smallImageData.url : null;

        return urlLastImageInCollection ?
            <img
                src={urlLastImageInCollection}
                className={classes.coverCollection}
                alt=""
            />
            : null;
    };

    getTotalImagesInCollection = (collection) => {
        const totalImageInCollection = collection.get('collection').size;
        let textTotalImageInCollection = null;

        if (totalImageInCollection === 0) {
            textTotalImageInCollection = 'No images'
        } else if (totalImageInCollection === 1) {
            textTotalImageInCollection = '1 image'
        } else if (totalImageInCollection > 1) {
            textTotalImageInCollection = `${totalImageInCollection} images`
        }

        return textTotalImageInCollection;
    }
}

export default connect(state => ({
    listMyCollections: state.listMyCollections
}))(withStyles(styles)(ListCollections));