import React from 'react';
import classes from './Order.module.css';


const order=(props)=>{

    const ingredients=[];

    for(let ingredientName in props.ingredients ){
        ingredients.push({
            
            name: ingredientName , amount: props.ingredients[ingredientName]
        })   
    };

    const ingredientOutput = ingredients.map( ig =>{
            return (<span 
            style={{
                textTransform: 'capitalize',
                margin: '0 8px',
                display: 'inline-block',
                border: '1px solid #ccc',
                padding: '5px'
                
            }}
            key={ig.name}>
                {ig.name} : ({ig.amount})
                </span>)
        // ({ig.amount})??????????????
    }) 

// let ingredients = Object.keys(props.ingredients)
//     .map(igKey =>{
//         // let arrayCheck = [...Array(props.ingredients[igKey])];
//         // console.log(arrayCheck);
//         // console.log('igKey', igKey);
//         // console.log('...Array_props.ingredientsigKey',[...Array(props.ingredients[igKey])]);
//         return [...Array(props.ingredients[igKey])].map((_,i)=>
//         {
//             return <BurgerIngredients key={igKey+i} type={igKey}/>}
//         )
//     }).reduce((arr,el)=>{
//         return arr.concat(el)
//     },[]);
    
    return(
    <div className={classes.Order}>
    <p> Ingredients: {ingredientOutput}</p>
    <p>Price <strong>USD {Number.parseFloat(props.price)}</strong></p>

</div>
)


};






export default order;