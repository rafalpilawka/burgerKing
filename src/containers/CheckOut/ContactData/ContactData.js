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
            validation: {
                required: true
            },
            valid: false,
                    },
            street: {
                elementType : 'input',
                elementConfig:{type: 'text', placeholder: 'Your street'},
                value: '',
                validation: {
                    required: true,
   
                },
            valid: false,
                        },
            postal: {
                elementType : 'input',
                elementConfig:{type: 'text', placeholder: 'ZIPCODE'},
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
            valid: false,
                        },
            country: {
                elementType : 'input',
                elementConfig:{type: 'text', placeholder: 'Country'},
                value: '',
                validation: {
                    required: true
                },
            valid: false,
                        },
            email: {
                elementType : 'input',
                elementConfig:{type: 'email', placeholder: 'Your email'},
                value: '',
                validation: {
                    required: true
                },
            valid: false,
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

    //CUSTOM REQUIRE CHECK VALIDATION
    checkValidity(value, rules){
        let isValid = true ;  
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength){
            isValid = value.trim().length >= rules.minLength && isValid
        }
        if (rules.maxLength){
            isValid = value.trim().length <= rules.maxLength && isValid
        }
        return isValid
    }

    componentDidMount(){
   
        console.log('this.props: ', this.props);
    }

    orderHandler=(event)=>{
        event.preventDefault();
        //PREVENTING OF RELOADING PAGE IN FORM 
            const formData = {};
            for(let formElementIdentifier in this.state.orderForm ){
                formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
            }
          this.setState({loading: true});
          const order ={
              ingredients: this.props.ingredients,
              price: this.props.price,
              orderData: formData
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
       updatedFormElement.valid =this.checkValidity
                            (updatedFormElement.value , updatedFormElement.validation);
       updatedOrderForm[inputIdentifier]= updatedFormElement;
       this.setState({orderForm: updatedOrderForm});
       console.log(updatedFormElement, updatedFormElement.value.length);
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
            <form onSubmit={this.orderHandler}>
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