import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer =(props)=>{
    
    let attachClasses =[classes.SideDrawer , classes.Close];

    if (props.open){
        attachClasses= [classes.SideDrawer, classes.Open] ;
    }
    
    return(
    <Aux>
    <Backdrop show={props.open} clicked={props.closed}/>    
    <div className={attachClasses.join(' ')}>
    {/* <div className={[classes.SideDrawer , classes.Close].join(' ')}> */}
            {/* <Logo height="11%" /> */}
            <div className={classes.Logo}>
                <Logo/>
            </div>
                <nav>
                    <NavigationItems/>
                </nav>

        </div>
    </Aux>
    
    );
};

export default sideDrawer ;