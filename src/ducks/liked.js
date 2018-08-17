import {appName} from '../config'
import {Map} from 'immutable'

export const moduleName = 'liked';

// Actions
export const ADD_LIKE = `${appName}/${moduleName}/ADD_LIKE`;
export const DELETE_LIKE = `${appName}/${moduleName}/DELETE_LIKE`;

// Reducer
export default function reducer(likesList = new Map(), action) {
    const {type, payload} = action;

    switch (type) {

        case ADD_LIKE:
            return likesList.set(payload.imageId, payload.imageData);

        case DELETE_LIKE:
            return likesList.delete(payload.imageId);

        default:
            return likesList
    }
}

// Action Creators
export function addLike(imageId, imageData) {
    return dispatch => {

        dispatch({
            type: ADD_LIKE,
            payload: {
                imageId,
                imageData
            }
        })
    }
}

export function deleteLike(imageId) {
    return {
        type: DELETE_LIKE,
        payload: {
            imageId
        }
    }
}