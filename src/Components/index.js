import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { initListActionSaga } from '../Store/actionCreators'

import Login from '../views/Login/Login'
import Home from '../views/Home'

class Index extends Component {
  constructor(prop) {
    super(prop)
    this.state = {}
  }

  getList() {
    this.props.initListSaga()
  }

  componentWillMount() {
    this.getList()
  }

  // render() {
  //   let { list } = this.props
  //   return (
  //     <div>
  //       {list.map((v, k) => {
  //         return <span key={k}>{JSON.stringify(v)}</span>
  //       })}
  //     </div>
  //   )
  // }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Home" component={Home} />
        </Switch>
      </BrowserRouter>
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
