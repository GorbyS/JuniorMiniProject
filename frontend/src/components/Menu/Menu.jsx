import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Menu.module.css';

export default function Menu() {
    return (
        <div className={classes.menu}>
            <Link className={classes.button} to="/">Main page</Link>
            <Link className={classes.button} to="/add-contact">Client data</Link>
        </div>
    )
}