import React, {Component} from 'react'
import {Upload, Icon, message, Input, Button, Form} from 'antd';
import '../static/less/card.less'
import http from "../Util/http";
import dataVerification from "../Util/DataVerification"

let baseUrl = "http://192.168.8.29:8001/oms";

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Card extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            loading: false,
            loading1: false,
            imageUrl: "",
            imageUrl1: ''
        };
    }

    handleChange = info => {
        if (info.file.response) {
            if (info.file.status === 'uploading') {
                this.setState({loading: true});
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                this.setState({
                    imageUrl: info.file.response.imgePath,
                    loading: false,
                })
            }
        } else {
            this.setState({loading: false});
        }
    };

    handleChange1 = info => {
        if (info.file.response) {
            if (info.file.status === 'uploading') {
                this.setState({loading: true});
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                this.setState({
                    imageUrl1: info.file.response.imgePath,
                    loading: false,
                })
            }
        } else {
            this.setState({loading: false});
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let {imageUrl, imageUrl1} = this.state;
        const key = 'updatable';
        if (!imageUrl) {
            message.error({content: "请上传身份证正面照片", key, duration: 2});
            return;
        }
        if (!imageUrl1) {
            message.error({content: "请上传身份证背面照片", key, duration: 2});
            return;
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const key = 'updatable';
                let {username, idCard, bankNum, mobile} = values;
                message.loading({content: '加载中', key});
                http.formData({
                    data: {
                        idCardFront: imageUrl,
                        bankCardFront: imageUrl1,
                        name: username,
                        idCardNo: idCard,
                        bankCardNo: bankNum,
                        mobile: mobile,
                    },
                    method: "post",
                    url: "/mcht/card/cert",
                    callback: (data) => {
                        debugger;
                        if (data.respCode === '000000') {
                            message.success({content: '登录成功', key, duration: 2});
                            this.props.history.push({pathname: '/index'})
                        } else {
                            message.error({content: data.respMsg, key, duration: 2});
                        }
                    }
                });
                //
                // http.post('/mcht/card/cert', {
                //     data: parmss
                // }, data => {
                //     if (data.respCode === '000000') {
                //         message.success({content: '登录成功', key, duration: 2});
                //         this.props.history.push({pathname: '/index'})
                //     } else {
                //         message.error({content: data.respMsg, key, duration: 2});
                //     }
                // })
            }
        });
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">上传身份证正面照片</div>
            </div>
        );
        const uploadButton1 = (
            <div>
                <Icon type={this.state.loading1 ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">上传身份证反面照片</div>
            </div>
        );
        const {imageUrl, imageUrl1} = this.state;
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <div className="tittle">图片上传</div>
                <div className="loadImg">
                    <div className="loadMain">
                        <div className="name">
                            身份证正面照片
                            <span>*</span>
                        </div>
                        <div className="img">
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={baseUrl + '/mcht/imge/upload'}
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                            </Upload>
                        </div>
                    </div>
                    <div className="loadMain">
                        <div className="name">
                            身份证背面照片
                            <span>*</span>
                        </div>
                        <div className="img">
                            <Upload
                                name="file"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={baseUrl + '/mcht/imge/upload'}
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange1}
                            >
                                {imageUrl1 ?
                                    <img src={imageUrl1} alt="avatar" style={{width: '100%'}}/> : uploadButton1}
                            </Upload>
                        </div>
                    </div>
                </div>
                <div className="tittle">基本信息</div>
                <div className="imfMain">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        validator: (rule, value, callback) => dataVerification.checkName(rule, value, callback)
                                    }
                                ],
                            })(
                                <Input
                                    placeholder="请输入姓名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('idCard', {
                                rules: [{
                                    validator: (rule, value, callback) => dataVerification.checkIdCardNo(rule, value, callback)
                                }],
                            })(
                                <Input
                                    placeholder="请输入身份证号"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('bankNum', {
                                rules: [{
                                    validator: (rule, value, callback) => dataVerification.checkBankCardNo(rule, value, callback)
                                }],
                            })(
                                <Input
                                    placeholder="请输入银行卡号"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('mobile', {
                                rules: [
                                    {
                                        validator: (rule, value, callback) => dataVerification.checkMobile(rule, value, callback)
                                    }
                                ]
                            })(
                                <Input
                                    placeholder="请输入手机号"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                保存
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const C = Form.create()(Card)
export default C;
