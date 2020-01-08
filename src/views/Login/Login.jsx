import React, {Component} from 'react'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import {connect} from 'react-redux'
import {loginImfActionSaga} from '../../Store/actionCreators'
import './Login.less'
// import http from "../../Util/http";

import {setCookie} from "../../Util/reg";

class Login extends Component {
    constructor(prop) {
        super(prop);
        this.state = {};
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const key = 'updatable';
                let {username, password} = values;
                message.loading({content: '加载中', key});
                setTimeout(()=>{
                    setCookie("userName",username);
                    setCookie("password",password);
                    message.success({content: '登录成功', key, duration: 2});
                    this.props.history.push({ pathname: '/index'})
                },1000)
                // http.post('/api/login/index', {username, password}, data => {
                //     if (data.responseCode === '0000') {
                //         alert(3)
                //         message.success({content: '登录成功', key, duration: 2});
                //         this.props.history.push({ pathname: '/index'})
                //     } else {
                //         message.error({content: data.errorMsg, key, duration: 2});
                //     }
                // })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div id="loginDIV">
                <div className="login">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '用户名不能为空'}],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="请输入用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '密码不能为空'}],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    type="password"
                                    placeholder="请输入密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住我</Checkbox>)}
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginImfSaga(username, password) {
            const action = loginImfActionSaga(username, password)
            dispatch(action)
        }
    }
}

const mapStateToProps = state => {
    return {
        list: state.list
    }
}
const L = Form.create()(Login)
export default connect(mapStateToProps, mapDispatchToProps)(L);
