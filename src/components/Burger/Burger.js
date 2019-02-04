import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredients from './BurgerIngredient/BurgerIngredient'
import { withRouter } from 'react-router-dom';

const burger =(props)=>{

    // console.log("PROPS IN BURGER" , props);
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey =>{
        // let arrayCheck = [...Array(props.ingredients[igKey])];
        // console.log(arrayCheck);
        // console.log('igKey', igKey);
        // console.log('...Array_props.ingredientsigKey',[...Array(props.ingredients[igKey])]);
        return [...Array(props.ingredients[igKey])].map((_,i)=>
        {
            return <BurgerIngredients key={igKey+i} type={igKey}/>}
        )
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);

    if (transformedIngredients.length === 0){//LENGTH OF ARRAY MATOLE

        transformedIngredients = <p><strong>Please start adding ingredients!</strong></p>
    }

    // console.log(transformedIngredients);
    return(
        <div className={classes.Burger}>
        <BurgerIngredients type= "bread-top"/>
        {transformedIngredients}
        <BurgerIngredients type= "bread-bottom"/>
        </div>
    );
    
}

export default withRouter(burger);

//When We need props from routing