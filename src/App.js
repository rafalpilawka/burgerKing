import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import {Route , Switch , Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {

  // state={
  //   show: true
  // };


  // componentDidMount(){
  //   setTimeout(()=>{this.setState({show: false})}, 5000)
  // }
  render() {
    return (
      <div>
          <Layout>
            <Switch >
           {/* {this.state.show ?  <BurgerBuilder/>: null} */}
           <Route path="/checkout" component={CheckOut}/>
           <Route path="/orders" exact component={Orders}/>
           <Route path="/" exact component={BurgerBuilder}/>
          
           </Switch>
          </Layout>
      </div>
    );
  }
}

export default App;
