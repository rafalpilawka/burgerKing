import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component  {
 
state = {
    showSideDrawer: true,
}

sideDrawerCloseHandler =()=>{
    // let newSideDrawer = this.showSideDrawer;
    // newSideDrawer = !newSideDrawer;
    // this.setState({showSideDrawer: newSideDrawer})
    this.setState({showSideDrawer: false});
}

sideDrawerToggleHandler = () =>{
    
    this.setState((prevState)=>{return{showSideDrawer: !prevState.showSideDrawer}});
    console.log('zmiana');
    

}
componentDidUpdate(){
    console.log(this.state.showSideDrawer)
}
    
 render() { 
    return( 
    <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer 
        open={this.state.showSideDrawer}
        closed={this.sideDrawerCloseHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
    </Aux>
    )    
} 
   
};

export default Layout;