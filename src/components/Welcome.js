import React, {Component} from "react";
import SearchForm from "./SearchImageForm.js";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'

const styles = theme => {
    return {
        welcome: {
            backgroundImage: 'url("/img/welcome-bg.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            color: 'white',
            paddingTop: '25vh',
            position: 'absolute',
            height: '100vh',
            width: '100%',
            top: 0,
            right: 0,
            zIndex: 100,

            '&::before': {
                content: '""',
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                opacity: 0.35,
                top: 0,
                left: 0,
                zIndex: 100,
            }
        },

        container: {
            position: 'relative',
            maxWidth: 900,
            zIndex: 110,
            margin: [[0, 'auto']],
            textShadow: '2px 2px 3px rgba(0, 0, 0, 0.71)',
        },

        title: {
            fontSize: 46,
            marginBottom: 10,
        },

        subtitle: {
            fontSize: 24,
        },

        exampleLink: {
            color: '#d4d4d4',

            '&:hover': {
                color: '#bcbcbc',
            }
        }
    }
};

class Search extends Component {

    static propTypes = {
        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {

        const {classes} = this.props;
        const exampleListKey = ['mountains', 'sea', 'nature', 'food', 'house'];
        const exampleLinkList = [];

        exampleListKey.forEach(searchKey => {
            exampleLinkList.push(
                <Link className={classes.exampleLink} to={`/search/${searchKey}`} key={searchKey}>
                    {`${searchKey}, `}
                </Link>
            )
        });

        return (
            <section className={classes.welcome}>
                <div className={classes.container}>
                    <h2 className={classes.title}>Welcome to Images Manager!</h2>
                    <h3 className={classes.subtitle}>
                        Join us and create your collections from tens of billions of photos
                    </h3>

                    <SearchForm theme="welcome"/>

                    <p>
                        Try {exampleLinkList} or better enter your text
                    </p>
                </div>
            </section>
        );
    }
}

export default withStyles(styles)(Search);
