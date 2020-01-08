import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Switch, Route, BrowserRouter,Redirect} from 'react-router-dom'
import Login from '../views/Login/Login'
import Home from '../views/Home'

// import {getCookie} from "../Util/reg";

class Index extends Component {
    constructor(prop) {
        super(prop)
        this.state = {}
    }

    componentWillMount() {
        // this.getList()
    }

    render() {
        let{loginImf} = this.props;
        return (
            <React.Fragment>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/login" component={Login}/>
                  <Route path="/" render={
                    (props)=>{
                        if(loginImf){
                            return <Home {...props}/>
                        }else{
                            return <Redirect to="/login"/>
                        }
                    }
                  }/>
                    {/*<Route path="/index" component={requireAuthentication(Home)} />*/}
                </Switch>
              </BrowserRouter>
            </React.Fragment>

        )
    }
}

/*mapDispatchToProps  将redux里面的所有的action 配发给所有的组件*/

const mapDispatchToProps = dispatch => {
    return {

    }
};

const mapStateToProps = state => {
    return {
        loginImf: state.loginImf
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Index)
