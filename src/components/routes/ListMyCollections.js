import React, {Component} from 'react'
import MainMenu from '../MainMenu.js'
import ListMyCollections from '../ListMyCollections.js'

class ListCollections extends Component {

    render() {
        return (
            <div >
                <MainMenu />
                <ListMyCollections/>
            </div>
        )
    }
}

export default ListCollections