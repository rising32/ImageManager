import {appName} from '../config'
import {Map, Record, OrderedMap} from 'immutable'
import {guid} from '../helpers'

export const moduleName = 'listMyCollections';

const CollectionRecord = Record({
    id: null,
    nameCollection: '',
    collection: Map()
});

const defaultCollectionList = OrderedMap({
    first: new CollectionRecord({
        id: 'first',
        nameCollection: 'First Collection'
    })
});

// Actions
export const ADD_COLLECTION = `${appName}/${moduleName}/ADD_COLLECTION`;
export const DELETE_COLLECTION = `${appName}/${moduleName}/DELETE_COLLECTION`;
export const ADD_IMAGE_TO_COLLECTION = `${appName}/${moduleName}/ADD_IMAGE_TO_COLLECTION`;
export const DELETE_IMAGE_FROM_COLLECTION = `${appName}/${moduleName}/DELETE_IMAGE_FROM_COLLECTION`;

// Reducer
export default function reducer(listCollections = defaultCollectionList, action) {
    const {type, payload} = action;

    switch (type) {

        case ADD_COLLECTION:
            return listCollections.set(payload.id, new CollectionRecord(payload));

        case ADD_IMAGE_TO_COLLECTION:
            return listCollections.setIn([payload.collection, 'collection', payload.imageId], payload.imageData);

        case DELETE_IMAGE_FROM_COLLECTION:
            return listCollections.deleteIn([payload.collection, 'collection', payload.imageId]);

        default:
            return listCollections
    }
}

// Action Creators
export function addCollection(nameCollection) {

    const id = guid();

    return dispatch => {

        dispatch({
            type: ADD_COLLECTION,
            payload:
                {
                    nameCollection,
                    id
                }
        })
    }
}

export function addImageToCollection(collection, imageId, imageData) {

    return {
        type: ADD_IMAGE_TO_COLLECTION,
        payload: {
            collection,
            imageId,
            imageData
        }
    }
}

export function deleteImageFromCollection(collection, imageId) {
    return {
        type: DELETE_IMAGE_FROM_COLLECTION,
        payload: {
            collection,
            imageId
        }
    }
}

