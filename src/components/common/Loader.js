import React from 'react'
import {withStyles} from '@material-ui/core/styles';

const styles = theme => {
    return {
        loader: {
            border: '10px solid #f3f3f3',
            borderTop: '10px solid #3498db',
            borderRadius: '50%',
            width: 80,
            height: 80,
            margin: [[30, 'auto']],
            animation: 'spin 2s linear infinite'
        },

        '@keyframes spin': {
            '0': {
                transform: 'rotate(0deg)'
            },
            '100%': {
                transform: 'rotate(360deg)'
            }
        }
    }
};

function Loader(props) {

    const {classes} = props;
    return <div className={classes.loader}/>

}

export default withStyles(styles)(Loader)
