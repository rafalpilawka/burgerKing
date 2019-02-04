import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


//MAX WAY
const controls= [ 
    {label: 'Salad', type:'salad' },
    {label: 'Cheese', type:'cheese' },
    {label: 'Meat', type:'meat' },
    {label: 'Bacon', type:'bacon'},
    {label:'Onion', type:'onion'}
];

const buildControls = (props)=>(
    
            <div className={classes.BuildControls}>
                <p>Burger Price: <strong>{props.price.toFixed(2)}</strong></p>
                {controls.map(ctrl=>(<BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={()=> props.ingredientAdded(ctrl.type)}
                removed={()=>props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>))}
                {/* checking type of controls */}
                <button 
                className={classes.OrderButton} disabled = {!props.purchasable}
                onClick={props.purchasing}>
                ORDER NOW
                </button>
            </div>

);




// const buildControls=(props)=>{
//     let listOfControls = Object.keys(props.ingredients).map(igKey => {return <BuildControl label={igKey} />});

//         return(
//             <div className={classes.BuildControls}>
//                      {listOfControls} 
//             </div>
//               )
//         };
       

export default buildControls;

