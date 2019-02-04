import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandelr';
class Orders extends Component{

    state={
orders: [],
loading: false

    }

    componentDidMount(){
        axios.get('/orders.json').then(res=>{
            const fetchedOrders=[];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                }
                )
                this.setState({orders: fetchedOrders})
                // PUSHING NEW OBJECT to array
                //GETTING ORDERS FROM FIREBASE
            }
            console.log(res);
            console.log(this.state);
                this.setState({loading: false})
        }).catch(err=>{
            this.setState({loading: false})
        }
       
    )
             
}
    render(){

        return(
        <div>
            {this.state.orders.map( order =>(
                 <Order 
                 key={order.id}
                 ingredients={order.ingredient}
                 price={order.price}
                //  price={+order.price} this making the same as Number.parse.toFloat
                 /> 
            ))}
        </div> )
    }
}

export default  withErrorHandler(Orders , axios);

// NEED TO ADD AXIOS TO WITHERROR WRAPPER FOR PROPER WORK OF INTERCEPTORS