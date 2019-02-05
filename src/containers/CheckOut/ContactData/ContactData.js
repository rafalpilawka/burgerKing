import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {

    state={
      orderForm:{

            name: {
            elementType : 'input',
            elementConfig:{type: 'text', placeholder: 'Your name'},
            value: '',
                    },
            street: {
                elementType : 'input',
                elementConfig:{type: 'text', placeholder: 'Your street'},
                value: '',
                        },
            number: {
                elementType : 'input',
                elementConfig:{type: 'text', placeholder: 'ZIPCODE'},
                value: '',
                        },
            country: {
                elementType : 'input',
                elementConfig:{type: 'text', placeholder: 'Country'},
                value: '',
                        },
            email: {
                elementType : 'input',
                elementConfig:{type: 'email', placeholder: 'Your email'},
                value: '',
                        },
            delivery: {
                elementType : 'select',
                elementConfig:{options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'},
                ]},
                value: '',
                        },
    }  ,


      loading: false,
      totalPrice: 0,
    }

    componentDidMount(){
   
        console.log('this.props: ', this.props);
    }

    orderHandler=(event)=>{
        event.preventDefault();
        //PREVENTING OF RELOADING PAGE IN FORM 

          this.setState({loading: true});
          const order ={
                        }
    const ingredient= this.props.ingredients;
    const price= this.props.totalPrice;
       
    axios.post('/orders.json',order).then(response=>{
        console.log(response);
    this.setState( { loading: false} );
    this.props.history.push('/')
    }).catch(error=>
        (this.setState( { loading: false } ))
        );
    // for firebase we need to add .json

    }

    inputChangedHandler=(event,inputIdentifier)=>{
        // console.log(event.target.value);
        const updatedOrderForm={
            ...this.state.orderForm
        }
       const updatedFormElement= {...updatedOrderForm[inputIdentifier]}
       updatedFormElement.value = event.target.value;
       updatedOrderForm[inputIdentifier]= updatedFormElement;
       this.setState({orderForm: updatedOrderForm});
    }

    render(){

        const formElementsArray =[];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            }) }
            //CREATING ARRAY OF OBJECTS FOR FORM 

        let form = (
            <form>
                    {formElementsArray.map(formElement=>(
                        <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event)=>this.inputChangedHandler(event, formElement.id)}
                        />
                    ))
                    }
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