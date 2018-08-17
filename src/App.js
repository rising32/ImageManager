import React, {Component} from 'react';
import Root from './components/Root'
import store from './redux'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import history from './history'
import './config'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

class App extends Component {

    render() {

        const theme = createMuiTheme({
            visuallyHidden: {
                position: 'absolute',
                clip: 'rect(0 0 0 0)',
                width: 1,
                height: 1,
                margin: -1,
            },

            container: {
                maxWidth: 1100,
                margin: [[0, 'auto']],
                padding: [[0, 10]]
            },

            pageTitle: {
                marginTop: 0,
                fontSize: 32,
                color: '#757575',
            },

            button: {
                success: {
                    color: '#4CAF50',
                    '&:hover': {
                        backgroundColor: '#E8F5E9'
                    }
                },

                imageCardButton: {
                    marginRight: 15,
                    minHeight: 10,
                    minWidth: 60,
                    height: 30,
                    fontSize: 14,
                    padding: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    textTransform: 'none',
                    marginBottom: 10,

                    '&:hover':
                        {
                            backgroundColor: "white"
                        },
                }
            },
        });

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <MuiThemeProvider theme={theme}>
                        <Root/>
                    </MuiThemeProvider>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;
