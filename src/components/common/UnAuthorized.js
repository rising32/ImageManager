import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class UnAuthorized extends Component {

    render() {
        // TODO
        return (
            <div>
                <h1>Unauthorized, please <Link to={'/auth/signIn'}>Sign In</Link></h1>
            </div>
        )
    }
}

export default UnAuthorized