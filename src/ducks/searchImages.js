import {appName} from "../config";
import {OrderedMap, Record} from "immutable";
import queryString from "querystring";

export const moduleName = "listOfFoundImages";

const ReducerRecord = Record({
    isLoading: false,
    isLoaded: false,
    isError: false,
    listOfImages: null
});

const ImageSizeData = Record({
    url: null,
    width: null,
    height: null
});

const DataFoundImageRecord = Record({
    smallImageData: null,
    largeImageData: null,
    originalImageData: null
});

// Actions
export const SEARCH_REQUEST = `${appName}/${moduleName}/SEARCH_REQUEST`;
export const SEARCH_SUCCESS = `${appName}/${moduleName}/SEARCH_SUCCESS`;
export const SEARCH_ERROR = `${appName}/${moduleName}/SEARCH_ERROR`;

// Reducer
export default function reducer(imagesData = new ReducerRecord(), action) {
    const {type, payload} = action;

    switch (type) {
        case SEARCH_REQUEST:
            return imagesData.set("isLoading", true);

        case SEARCH_SUCCESS:
            return imagesData
                .set("listOfImages", payload.images)
                .set("isLoading", false)
                .set("isLoaded", true)
                .set("isError", false);

        case SEARCH_ERROR:
            return imagesData
                .set("isLoading", false)
                .set("isLoaded", true)
                .set("isError", true);

        default:
            return imagesData;
    }
}

// Action Creators
export function searchImages(searchValue) {
    return dispatch => {
        dispatch({
            type: SEARCH_REQUEST
        });

        const query = {
            method: "flickr.photos.search",
            api_key: "9ff0fef9b6c8e4509682e9576b9480f3",
            text: searchValue,
            format: "json",
            extras: "url_n,url_m,url_z,url_l,url_c,url_o",
            nojsoncallback: 1,
            sort: 'relevance'
        };

        const stringifiedQuery = queryString.stringify(query);
        fetch(`https://api.flickr.com/services/rest/?${stringifiedQuery}`)
            .then(response => response.json())

            .then(data => {
                let imagesData = OrderedMap();

                data.photos.photo.forEach(img => {

                    const flickrImages = {};

                    if (img.url_n) {
                        flickrImages.n = new ImageSizeData({
                            url: img.url_n,
                            width: img.width_n,
                            height: img.height_n
                        });
                    }

                    if (img.url_m) {
                        flickrImages.m = new ImageSizeData({
                            url: img.url_m,
                            width: img.width_m,
                            height: img.height_m
                        });
                    }

                    if (img.url_z) {
                        flickrImages.z = new ImageSizeData({
                            url: img.url_z,
                            width: img.width_z,
                            height: img.height_z
                        });
                    }

                    if (img.url_l) {
                        flickrImages.l = new ImageSizeData({
                            url: img.url_l,
                            width: img.width_l,
                            height: img.height_l
                        });
                    }

                    if (img.url_c) {
                        flickrImages.c = new ImageSizeData({
                            url: img.url_c,
                            width: img.width_c,
                            height: img.height_c
                        });
                    }

                    if (img.url_o) {
                        flickrImages.o = new ImageSizeData({
                            url: img.url_o,
                            width: img.width_o,
                            height: img.height_o
                        });
                    }

                    const small =
                        flickrImages.n ||
                        flickrImages.m ||
                        flickrImages.z ||
                        flickrImages.c ||
                        flickrImages.l ||
                        flickrImages.o;

                    const large =
                        flickrImages.l ||
                        flickrImages.c ||
                        flickrImages.o ||
                        flickrImages.z ||
                        flickrImages.m ||
                        flickrImages.n;

                    const original =
                        flickrImages.o ||
                        flickrImages.l ||
                        flickrImages.c ||
                        flickrImages.z ||
                        flickrImages.m ||
                        flickrImages.n;

                    imagesData = imagesData.set(img.id, new DataFoundImageRecord({
                        smallImageData: small,
                        largeImageData: large,
                        originalImageData: original
                    }));
                });

                dispatch({
                    type: SEARCH_SUCCESS,
                    payload: {
                        images: imagesData
                    }
                });
            })
            .catch(error =>
                dispatch({
                    type: SEARCH_ERROR,
                    error: error
                })
            );
    };
}
