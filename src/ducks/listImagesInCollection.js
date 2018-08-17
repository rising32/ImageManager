import {appName} from '../config'
import {Map} from 'immutable'

export const moduleName = 'listImagesInCollection';

// Actions
export const ADDED_TO_COLLECTION = `${appName}/${moduleName}/ADDED_TO_COLLECTION`;
export const DELETED_FROM_COLLECTION = `${appName}/${moduleName}/DELETED_FROM_COLLECTION`;
export const DELETED_FROM_All_COLLECTION = `${appName}/${moduleName}/DELETED_FROM_All_COLLECTION`;

// Reducer
export default function reducer(imagesList = new Map(), action) {
    const {type, payload} = action;

    switch (type) {

        case ADDED_TO_COLLECTION:
            return imagesList.setIn([payload.imageId, payload.collection], payload.imageData);

        case DELETED_FROM_COLLECTION:
            return imagesList.deleteIn([payload.imageId, payload.collection]);

        case DELETED_FROM_All_COLLECTION:
            return imagesList.delete(payload.imageId);

        default:
            return imagesList
    }
}

// Action Creators
export function imageAddedToCollection(collection, imageId, imageData) {
    return {
        type: ADDED_TO_COLLECTION,
        payload: {
            imageId,
            collection,
            imageData
        }
    }
}

export function imageDeletedFromCollection(collection, imageId) {
    return {
        type: DELETED_FROM_COLLECTION,
        payload: {
            imageId,
            collection
        }
    }
}

export function imageDeletedFromAllCollection(imageId) {
    return {
        type: DELETED_FROM_All_COLLECTION,
        payload: {
            imageId,
        }
    }
}