import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckOutSummary.module.css'

const checkOutSummary=(props)=>{
    return (
        <div className={classes.CheckOutSummary}>
            <h1>Hope will taste well</h1>
            <div style={{width: '100%'  , margin: 'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button  btnType="Danger" clicked={props.checkoutCancel}>Cancel</Button>
            <Button   btnType="Success" clicked={props.checkoutContinue} >Continue</Button>
        </div>
        
        );


}

export default checkOutSummary;