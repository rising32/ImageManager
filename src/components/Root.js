import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import UserPage from './routes/UserPage';
import AuthPage from './routes/AuthPage';
import Home from './routes/Home';
import ProtectedRoute from './common/ProtectedRoute';
import ListMyCollections from "./routes/ListMyCollections.js";
import Search from './routes/Search';
import LikedImages from './routes/LikedImages';
import MyCollection from './routes/MyCollection.js';

class Root extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path={'/'} component={Home} exact/>
                    <ProtectedRoute path={'/user'} component={UserPage}/>
                    <Redirect from={'/auth'} to={'/auth/signIn'} exact/>
                    <Route path={'/auth/:formForAuth'} component={AuthPage}/>
                    <Route path={'/search/:searchKey'} component={Search}/>
                    <Route path={'/likedImages'} component={LikedImages}/>
                    <Route path={'/myCollections'} component={ListMyCollections} exact/>
                    <Route path={'/myCollections/:keyCollection'} component={MyCollection}/>
                    <Redirect from={'*'} to={'/'}/>
                </Switch>
            </div>
        );
    }
}

export default Root;
