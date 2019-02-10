import React from 'react';
import classes from './Input.module.css';

const input = ( props ) => {
    let inputElement = null;
let inputClasses =[classes.InputElement]

if (props.invalid && props.shouldValidate && props.touched){
    //CHECKING PROPS OF INVALID SHOULDVALIDATE AND TOUCHED FOR ADDING CLASS
    inputClasses.push(classes.Invalid)
}

let validationError = null;

if (props.invalid && props.touched) {
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    // validationError = <p>Please enter a valid {props.valueType}</p>; 
    // validationError = <p>{props.errorMessage}</p>;

}

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className = {inputClasses.join(' ')} 
            {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textArea'):
            inputElement = <textarea className = {inputClasses.join(' ')} 
            {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        
        case ('select'):
            inputElement = (
            <select 
            className = {inputClasses.join(' ')} 
            value={props.value} onChange={props.changed}>
            {props.elementConfig.options.map(option=>(
                <option key={option.value} value={option.value}>{option.displayValue}</option>
            )
               )}
            </select>
            );
            break;
            
        default:
            inputElement = <input className = {inputClasses.join(' ')} 
            {...props.elementConfig} value={props.value} onChange={props.changed}/>;
    }
     return (
        <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {validationError}
        </div>
    )
}



export default input;