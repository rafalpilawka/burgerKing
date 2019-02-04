import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandelr';


// const prices={
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.4,
//     bacon: 1.1

// }

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {...}
    // }

state = {
    ingredients: null,
    totalprice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
    priceList: null,
    
}

componentDidMount(){
    console.log("COMPONENT DID MOUNT THIS PROPS" ,this.props);
    axios.get('https://react-my-burger-a4a87.firebaseio.com/ingredients.json').then(
        response=>{
                this.setState({ingredients: response.data})}).catch(error=>{this.setState({error: true})});

    //  axios.post('/prices.json',{prices}).then(response=>{
    //                 console.log(response)});

    axios.get('https://react-my-burger-a4a87.firebaseio.com/prices.json').then(response=>
    {console.log("JUZ NIE WIEM ", response.data); 
     let pricesServ=Object.values(Object.values(response.data)[0])[0];
    this.setState({priceList: pricesServ});
    // console.log("JUZ NIE WIEM 2 ", this.state)

            } 
                ).catch(error=>{this.setState({error: true})});

        // axios.post('https://react-my-burger-a4a87.firebaseio.com/nowe.json', {name: 'noweee'} ).then(
        //     response=>{ console.log(response);})
        //             // this.setState({ingredients: response.data})
        //         .catch(error=>{this.setState({error: true})});
                
}

purchaseHandler=()=>{
    this.setState({purchasing: true});
}

purchaseCancelHandler=()=>{
    this.setState({purchasing: false});
}

purchaseContinueHandler=()=>{
    // alert('You will continue with order') ; 
    // this.setState({loading: true});
    // const order ={
    //     ingredient: this.state.ingredients,
    //     price: this.state.totalprice,
    //     customer: {
    //         name: 'Max Stol',
    //         adres: {
    //             street: 'Dummy str',
    //             number: 'dummy number',
    //             country: 'outside'
    //         },
    //         email: 'test@test.com',
    //     },
    //     delivery: 'fastest'
    // }  
    // axios.post('/orders.json',order).then(response=>{
    //     console.log(response);
    // this.setState( { loading: false, purchasing: false } )
    // }).catch(error=>
    //     (this.setState( { loading: false , purchasing: false} ))
    //     );
    // // for firebase we need to add .json
    const queryParams=[];
    for (let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i)+'=' +encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push("price=" + this.state.totalprice)
    const queryString= queryParams.join('&');
    this.props.history.push({
        pathname: '/checkout',
        search: '?'+queryString

    });

}
updatePurchaseState=(ingredients)=>{

const sum = Object.keys(ingredients).map(igKey=>{
                        return ingredients[igKey];
                    }).reduce((sum , el)=>{
                        return sum + el;
                    },0);
                    this.setState({purchasable: sum>0});
                    };

addIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    // console.log('addINgredientHandler', this.state.ingredients[type] );
    const updatedCount = oldCount+1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceAddition = this.state.priceList[type];
    // console.log('this.state.priceList', this.state.priceList[type]);
    const oldPrice = this.state.totalprice;
    const newPrice =  oldPrice + priceAddition;
    this.setState({totalprice: newPrice , ingredients: updatedIngredients})
    this.updatePurchaseState(updatedIngredients);
    // console.log('STATE PURCHASABLE', this.state.purchasable)
}
    
removeIngredientHandler =(type)=>{
    const oldCount = this.state.ingredients[type];
  

    if (oldCount > 0)
    {  const updatedIngredients = {
        ...this.state.ingredients};
    const updatedCount = oldCount-1;
    
    updatedIngredients[type]=updatedCount;
    const priceDeduction = this.state.priceList[type];
    const oldPrice = this.state.totalprice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalprice: newPrice , ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
    }else{
        console.log('no ' + type + ' to romove');
    };
    }




render=()=>{


    const disabledInfo={
        ...this.state.ingredients
    };
    for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    // console.log(disabledInfo , 'DISABLED INFO')
    


    let orderSummary =  null;
    let burger = this.state.error ? <p>INgredients cant be loaded></p> : <Spinner/>
    if (this.state.ingredients !== null){
        burger =(
                    <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <div> <p 
                    style={{textAlign: 'center'}}
                    >Build Controls</p></div>
                    <BuildControls 
                    disabled = {disabledInfo}
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    price = {this.state.totalprice}
                    purchasable = {this.state.purchasable}
                    purchasing = {this.purchaseHandler}/>
                    </Aux>);
        orderSummary = <OrderSummary 
            ingredients = {this.state.ingredients} 
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue = {this.purchaseContinueHandler}
            //CONTINUE TO CHECKOUT
            total={this.state.totalprice}/>
    }
    
    if (this.state.loading){
        orderSummary = <Spinner/>
    }

    return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>  
                {orderSummary}
            </Modal>
            {burger};
            {/* <Burger ingredients={this.state.ingredients}/>
            <div> <p style={{textAlign: 'center'}}>Build Controls</p></div>
            <BuildControls 
            disabled = {disabledInfo}
            ingredientAdded={this.addIngredientHandler} 
            ingredientRemoved={this.removeIngredientHandler}
            price = {this.state.totalprice}
            purchasable = {this.state.purchasable}
            purchasing = {this.purchaseHandler}/> */}

            {/* <BuildControls ingredients={this.state.ingredient} /> */}
        </Aux>
    )
    }
componentDidUpdate(){
    // console.log(this.state);
}

}

export default withErrorHandler(BurgerBuilder,axios);