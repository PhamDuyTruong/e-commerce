import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import {ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/commerce.png';
import {Link, useLocation} from 'react-router-dom'
import useStyles from './styles';



export default function Navbar({totalItems}) {
    const classes = useStyles();
    const location = useLocation();
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" component={Link} to="/" color="inherit">
                        <img  src={logo} alt="image" height="25px" className={classes.image}/>
                        E-Commerce
                    </Typography>
                    <div className={classes.grow}></div>
                    {location.pathname ==="/" && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                    )}
                </Toolbar>
            </AppBar>   
        </>
    )
}
