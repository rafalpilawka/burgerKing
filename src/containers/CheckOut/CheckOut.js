import React,  {Component} from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary';
// import  URLSearchParams from 'url';
// import 'url-search-params-polyfill';
import queryString from 'query-string';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class CheckOut extends Component{
state={
    ingredients: {
       
    },
    totalPrice: 0
}



componentDidMount(){
// console.log("checkout PROPS", this.props.location.search);
//     const query= new URLSearchParams(this.props.location.search);
//     const ingredients={};
// let price = 0;
// MAX WAY OF GETTING PRICE
//     for(let param of query.entries()){
            // if (param[0] === 'price'){
            //     price = param[1]
            // }else{
            //     ingredients[param[0]]= +param[1];
            // }
//         //['param','param']
//         ingredients[param[0]]= +param[1]; //parse to number
//     }
//     this.setState({ingredients: ingredients});
this.parseQueryParams();



}

componentDidUpdate(prevProps, prevState) {
    if(prevState.content !== this.state.content) {
      console.log('I have new content!', this.state.content);
    }
  }

parseToInteger(parsed){
    
    for (let prop in parsed) 
    { if (String(parseInt(parsed[prop])) === parsed[prop]) 
        { parsed[prop] = parseInt(parsed[prop]); } }
        return parsed;

}

// filter(parsed, val){
//    let filtered =  Object.keys(parsed)
//     .filter(key => (parsed[key]!==val))
//     .forEach(key => delete parsed[key]);
  
//   console.log('----FILTER----', filtered);

//     }


clickedButton(){
    console.log('BUTTON CLICKED' , this.state);
}

clickedButton2(params){
    console.log(params);
}
keyFilter=(master,param)=>{
    let number =0;
    let val= Object.keys(master).filter((key)=>
        key === param ? number = (parseFloat(master[key])).toFixed(2) : null
        // if(key===param){ parseInt(master[key])}
    )
    return number;
}

keyFilterMaker=(master,param)=>{
    let ingredients ={};
    let val= Object.keys(master).map((key)=>(
        key !== param ?  Object.assign(ingredients , {[key] : parseInt(master[key])}): null
        // if(key===param){ parseInt(master[key])}
    ))
    return ingredients;
}

parseQueryParams () {
    // console.log('PROPS LOCATION SEARCH', this.props.location.search);

   let ingredients={};
        // let price = {};
    let parsed = queryString.parse(this.props.location.search);
            console.log('PARSED BEFORE FILTER', parsed);
    let priceFilter=this.keyFilter(parsed , 'price');
    
    this.setState({totalPrice: parseFloat(priceFilter)});
    console.log("działa?", priceFilter);
    ingredients=this.keyFilterMaker(parsed , 'price')
    // ingredients = this.parseToInteger(parsed);
    console.log("AFETR PARSE TO INTEGER" , ingredients);
    this.setState({ingredients: ingredients});
  

        console.log( "PROPS LOCATION" , this.state );
    }


checkoutCancellHandler=()=>{
    this.props.history.goBack();
}

checkoutContinueHandler=()=>{
    this.props.history.replace('/checkout/contact-data');
    console.log("PROPS IN CHECKOUT-------", this.state);
}

nts

render(){
    return (
       
       <div>
           <button onClick={()=>(this.clickedButton())}>BUTTON</button>
           {/* <button onClick={()=>{this.clickedButton2('asasa')}}>BUTTON 2</button> */}
           <CheckOutSummary ingredients={this.state.ingredients}
           checkoutCancel={this.checkoutCancellHandler}
           checkoutContinue={this.checkoutContinueHandler}/>
            <Route 
            path={this.props.match.url + '/contact-data/'} 
            render={(props)=>(<ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>)}/>
            {/* <ContactData/> */}

       </div>
        
    )


}
}

export default CheckOut;