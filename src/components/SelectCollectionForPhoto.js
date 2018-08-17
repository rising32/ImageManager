import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addImageToCollection, deleteImageFromCollection} from "../ducks/myCollections";
import {
    imageAddedToCollection,
    imageDeletedFromCollection,
    imageDeletedFromAllCollection
} from "../ducks/listImagesInCollection";
import Done from "@material-ui/icons/Done";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => {
    return {
        listItem: {
            borderRadius: 3,
            width: '100%',
            padding: 15,
            border: '1px solid #757575',
            color: '#757575',
            marginBottom: 15,

            '&:hover': {
                backgroundColor: '#E8F5E9'
            }
        },

        selected: {
            backgroundColor: '#C8E6C9',

            '&:hover': {
                backgroundColor: '#A5D6A7'
            }
        },

        iconSelected: {
            color: '#4CAF50',
        },
    }
};

class SelectCollectionForPhoto extends Component {
    state = {
        imageInCollection: false
    };

    static propTypes = {

        imageId: PropTypes.string.isRequired,
        imageData: PropTypes.object.isRequired,

        // from connect
        listMyCollection: PropTypes.object.isRequired,
        listImagesInCollection: PropTypes.object.isRequired,

        // action creator
        addImageToCollection: PropTypes.func.isRequired,
        imageAddedToCollection: PropTypes.func.isRequired,
        imageDeletedFromCollection: PropTypes.func.isRequired,
        deleteImageFromCollection: PropTypes.func.isRequired,
        imageDeletedFromAllCollection: PropTypes.func.isRequired,

        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {

        return (
            <List component="nav">
                {this.getListElements()}
            </List>
        )
    }

    getListElements = () => {
        const {listMyCollection, listImagesInCollection, imageId, classes} = this.props;

        const listElementsOfListCollection = [];

        listMyCollection.forEach((value, key) => {

            let listItemIcon = null;
            let selectedClass = null;

            if (listImagesInCollection.getIn([imageId, key])) {

                selectedClass = classes.selected;

                listItemIcon =
                    <ListItemIcon>
                        <Done className={classes.iconSelected}/>
                    </ListItemIcon>
            }

            listElementsOfListCollection.push(
                <ListItem
                    className={[
                        classes.listItem,
                        selectedClass
                    ].join(" ")}
                    button
                    key={key}
                    onClick={() => this.handlerImgToCollection(key, this.props.imageId)}
                >
                    {listItemIcon}
                    <ListItemText inset primary={value.nameCollection}/>
                </ListItem>
            )
        });

        return listElementsOfListCollection;
    };

    handlerImgToCollection = (collection, imageId) => {

        const {
            listImagesInCollection,
            imageData,
            addImageToCollection,
            imageAddedToCollection,
            imageDeletedFromCollection,
            deleteImageFromCollection,
            imageDeletedFromAllCollection
        } = this.props;

        // TODO: add comments
        if (!listImagesInCollection.getIn([imageId, collection])) {
            addImageToCollection(collection, imageId, imageData);
            imageAddedToCollection(collection, imageId, imageData);
        } else if (listImagesInCollection.get(imageId).size === 1) {
            imageDeletedFromAllCollection(imageId);
            deleteImageFromCollection(collection, imageId);
        } else {
            deleteImageFromCollection(collection, imageId);
            imageDeletedFromCollection(collection, imageId);
        }
    };
}

export default connect(
    state => ({
        listMyCollection: state.listMyCollections,
        listImagesInCollection: state.listImagesInCollection
    }), {
        addImageToCollection,
        imageAddedToCollection,
        imageDeletedFromCollection,
        deleteImageFromCollection,
        imageDeletedFromAllCollection
    })(withStyles(styles)(SelectCollectionForPhoto));
