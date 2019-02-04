import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = ()=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link={'/'} >Burger Builder</NavigationItem>
        <NavigationItem link={'/orders'} >Orders</NavigationItem>
        {/* <NavigationItem link={'/'} >Orders</NavigationItem> */}
    <div>NOWY COMMIT</div>
    </ul>

);
export default navigationItems;