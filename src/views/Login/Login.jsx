import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loginImfActionSaga } from '../../Store/actionCreators'
import './Login.css'
class Login extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      username: '', // 当前输入的用户名
      password: '' // 当前输入的密码
    }
  }

  handleUsernameInput = e => {
    this.setState({ username: e.target.value })
  }

  handlePasswordInput = e => {
    this.setState({ password: e.target.value })
  }

  handleSubmit = async e => {
    // async可以配合箭头函数
    e.preventDefault() // 这个很重要, 防止跳转
    this.setState({ requesting: true })

    const username = this.state.username;
    const password = this.state.password;
    this.setState({ requesting: false })
    this.props.loginImfSaga(username,password)

  }
  render() {
    return (
      <div id="loginDIV">
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <input
              className="login-input"
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameInput}
              placeholder="用户名"
              required="required"
            />
            <input
              className="login-input"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordInput}
              placeholder="密码"
              required="required"
            />
            <button
              className="btn btn-primary btn-block btn-large"
              type="submit"
              disabled={this.state.requesting}
            >
              登录
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginImfSaga(username,password) {
      const action = loginImfActionSaga(username,password)
      dispatch(action)
    }
  }
}

const mapStateToProps = state => {
  return {
    list: state.list
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)