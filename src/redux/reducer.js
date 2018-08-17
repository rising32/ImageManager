import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer, {moduleName as authModule} from '../ducks/auth'
import listOfFoundImagesReducer, {moduleName as searchImagesModule} from '../ducks/searchImages'
import myCollectionReducer, {moduleName as myCollectionModule} from '../ducks/myCollections'
import imagesInCollectionReducer, {moduleName as imagesInCollectionModule} from '../ducks/listImagesInCollection'
import likesReducer, {moduleName as likesModule} from '../ducks/liked'

export default combineReducers({
    router,
    form,
    [authModule]: authReducer,
    [searchImagesModule]: listOfFoundImagesReducer,
    [myCollectionModule]: myCollectionReducer,
    [imagesInCollectionModule]: imagesInCollectionReducer,
    [likesModule]: likesReducer,
});
