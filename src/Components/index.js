import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Switch, Route, BrowserRouter,Redirect} from 'react-router-dom'
import {initListActionSaga} from '../Store/actionCreators'
import Login from '../views/Login/Login'
import Home from '../views/Home'

import {getCookie} from "../Util/reg";

class Index extends Component {
    constructor(prop) {
        super(prop)
        this.state = {}
    }

    getList() {
        this.props.initListSaga()
    }

    componentWillMount() {
        // this.getList()
    }

    render() {
        return (
            <React.Fragment>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/login" component={Login}/>
                  <Route path="/" render={
                    (props)=>{
                        if(getCookie("userName") && getCookie("password")){
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
        initListSaga() {
            const action = initListActionSaga()
            dispatch(action)
        }
    }
}

const mapStateToProps = state => {
    return {
        list: state.list
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
