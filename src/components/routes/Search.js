import React, {Component} from "react";
import {connect} from "react-redux";
import MainMenu from "../MainMenu.js";
import GridListOfImages from "../GridListOfImages.js";
import Loader from "../common/Loader";
import {searchImages} from "../../ducks/searchImages";
import PropTypes from "prop-types";

class Search extends Component {

    static propTypes = {
        // from Route
        match: PropTypes.shape({
            params: PropTypes.shape({
                searchKey: PropTypes.string.isRequired
            })
        }),

        // from connect
        listOfFoundImages: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLoaded: PropTypes.bool.isRequired,
        isError: PropTypes.bool.isRequired,

        // action creator
        searchImages: PropTypes.func.isRequired
    };

    componentWillMount() {
        const {searchKey} = this.props.match.params;

        this.props.searchImages(searchKey);
    }

    componentDidUpdate(prevProps) {
        const {searchKey} = this.props.match.params;

        if (prevProps.match.params.searchKey !==  searchKey) {
            this.props.searchImages(searchKey);
        }
    }

    render() {
        return (
            <div>
                <MainMenu/>
                {this.getBody()}
            </div>
        );
    }

    getBody() {
        const {isLoading, isLoaded, isError, listOfFoundImages} = this.props;

        if (isLoading) {
            return <Loader/>;
        }

        if (isError) {
            return <div>error</div>;
        }

        if (isLoaded) {
            return (
                <GridListOfImages
                    listOfImages={listOfFoundImages.get("listOfImages")}
                />
            );
        }

        return <div>No content</div>;
    }
}

export default connect(state => ({
        listOfFoundImages: state.listOfFoundImages,
        isLoading: state.listOfFoundImages.isLoading,
        isLoaded: state.listOfFoundImages.isLoaded,
        isError: state.listOfFoundImages.isError
    }), {searchImages})(Search);
