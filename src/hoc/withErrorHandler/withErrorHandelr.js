import React , {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal' ;
import Aux from '../Aux/Aux';


const withErrorHandler =(WrappedComponent, axios) => {
    return class extends Component{

        state={
            error: null,
        }
        errorConfirmedHandler=()=>{
            this.setState=({error: null})

        }

        componentWillMount(){
            this.reqInterceprtor = axios.interceptors.request.use(req=>{this.setState({error: null})
        return req;
        });
            this.resInterceptor = axios.interceptors.response.use(res=>res, error=>{this.setState({error: error})});
        }

        componentWillUnmount(){
            console.log('Will unMount', this.reqInterceprtor , this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceprtor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                 <Aux>
        <Modal 
        show={this.state.error}
        modalClosed={this.errorConfirmedHandler}
        >{this.state.error ? this.state.error.message : null}</Modal>
        <WrappedComponent {...this.props}/>
    </Aux>
            )

        }  
    } 
    
     
}

 export default withErrorHandler;
    
