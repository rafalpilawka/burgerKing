import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state={
        name: '',
        email:'',
        adress:{
            street:'',
            postal:''
        },
        loading: false,
        totalprice: 0
    }

    componentDidMount(){
   
        console.log('this.props: ', this.props);
    }

    orderHandler=(event)=>{
        event.preventDefault();
        //PREVENTING OF RELOADING PAGE IN FORM 

          this.setState({loading: true});
    const order ={
        ingredient: this.props.ingredients,
        price: this.props.totalPrice,
        customer: {
            name: 'Max Stol',
            adres: {
                street: 'Dummy str',
                number: 'dummy number',
                country: 'outside'
            },
            email: 'test@test.com',
        },
        delivery: 'fastest'
    }  
    axios.post('/orders.json',order).then(response=>{
        console.log(response);
    this.setState( { loading: false} );
    this.props.history.push('/')
    }).catch(error=>
        (this.setState( { loading: false } ))
        );
    // for firebase we need to add .json

    }

    render(){
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                    <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Your postal code"/>
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
     
        );
        if (this.state.loading){
            form = <Spinner/>;
        }
        return(
            <div className={classes.ContactData}>
                <h3>Your Burger Cost: {this.props.totalPrice}</h3>
                <h4>Enter Your data</h4>
               {form}
            </div>
        )
    }
}
export default ContactData;