import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MainMenu from '../MainMenu.js'
import MyCollection from '../MyCollection.js'

class Collection extends Component {

    static propTypes = {
        // from Route
        match: PropTypes.shape({
            params: PropTypes.shape({
                keyCollection: PropTypes.string.isRequired
            })
        }),
    };

    render() {
        const {keyCollection} = this.props.match.params;
        return (
            <div>
                <MainMenu/>
                <MyCollection keyCollection={keyCollection}/>
            </div>
        );
    }
}

export default Collection;
