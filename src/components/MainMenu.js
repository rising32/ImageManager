import React, {Component} from "react";
import {NavLink, Link} from "react-router-dom";
import CropFree from "@material-ui/icons/CropFree";
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import SearchImageForm from './SearchImageForm'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

const styles = theme => {
    return {
        menu: {
            display: 'flex',
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 120,
            backgroundColor: 'white',
            padding: [[10, 40]],
            width: '100%',
            justifyContent: 'space-between',
        },

        logoLink: {
            display: 'flex',
            alignItems: 'center',
            color: 'gray',

            '&:hover': {
                color: '#575757',
            },
        },

        logoIcon: {
            minWidth: 40,
            minHeight: 40,
        },

        logoText: {
            fontSize: 16,
            marginLeft: 10,
        },

        search: {
            flexGrow: 1,
            margin: [[0, 30]]
        },

        navLinks: {
            display: 'flex',
            flexWrap: 'no-wrap',
            alignItems: 'center',
        },

        link: {
            marginRight: 20,
            color: '#7b7b7b',

            '&:hover': {
                color: '#575757'
            },
        },

        linkActive: {
            color: '#ae3836',

            '&:hover': {
                color: '#8b3331'
            },
        },

        auth: {
            position: 'relative',
            paddingLeft: 30,

            '&::before': {
                content: '""',
                position: 'absolute',
                width: 1,
                height: '60%',
                backgroundColor: 'rgba(0, 0, 0, 0.56)',
                left: 5,
                top: '50%',
                transform: 'translateY(-50%)',
            }
        },

        button: theme.button.success
    }
};

class MainMenu extends Component {

    static propTypes = {
        // from connect
        routerPathName: PropTypes.string.isRequired,

        // withStyles
        classes: PropTypes.object.isRequired
    };

    render() {

        const {classes} = this.props;

        return (
            <nav
                className={classes.menu}
            >
                <div>
                    <Link
                        to="/"
                        className={classes.logoLink}
                    >
                        <CropFree className={classes.logoIcon}/>
                        <div className={classes.logoText}>
                            Images <br/> Manager
                        </div>
                    </Link>
                </div>

                {this.getSearchForm()}

                <div
                    className={classes.navLinks}
                >
                    <NavLink
                        to="/likedImages"
                        className={classes.link}
                        activeClassName={classes.linkActive}
                    >
                        Likes
                    </NavLink>

                    <NavLink
                        to="/myCollections"
                        className={classes.link}
                        activeClassName={classes.linkActive}
                    >
                        My Collections
                    </NavLink>

                    <div
                        className={classes.auth}
                    >
                        <NavLink
                            to="#"
                            className={classes.link}
                        >
                            Sign In
                        </NavLink>

                        <NavLink
                            to="/auth/signUp"
                        >
                            <Button
                                variant="outlined"
                                className={classes.button}
                            >
                                Sign Up
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </nav>
        );
    }

    getSearchForm = () => {

        const {routerPathName, classes} = this.props;

        if (routerPathName === '/') {
            return;
        }

        return (
            <div className={classes.search}>
                <SearchImageForm
                    className={classes.search}
                    theme={"menu"}
                    autoFocus={false}
                />
            </div>
        );
    }
}

export default connect(state => ({
    routerPathName: state.router.location.pathname
}))(withStyles(styles)(MainMenu));
