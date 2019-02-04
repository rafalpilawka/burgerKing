import React , {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //THIS ONE CAN BE A FUNCTIONAL COMPONENT_ IN MODAL WE CHECKING IF CMPONENT SHOULD BE UPDATED
    componentWillUpdate(){
        console.log('ORDER SUMMARY WILL UPDATE');
    }
    render(){

    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey=>{
        return (<li key={igKey+1}>
            <span 
            style={{textTransform: 'capitalize'}}
            >{igKey}</span>: {this.props.ingredients[igKey]}
            </li>)
    });
    return (<Aux>  
        <div className={classes.Content} >
                <h3>Your order</h3>
                <p>Burger with:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <h3><strong>Total Price: <span className={classes.Color}>{this.props.total.toFixed(2)}</span></strong></h3>
                
                <p>Continue with checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>
                    CANCEL
                </Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>
                    CONTINUE
                </Button>
                
            </div>
            </Aux>)
            
};
}
export default OrderSummary;