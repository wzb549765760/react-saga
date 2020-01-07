import React, {Component} from 'react'
import {Layout, Menu, Breadcrumb, Icon, PageHeader, Button} from 'antd';
import menuList from "../router/routeList"
import {Link} from 'react-router-dom'
import '../static/less/Home.less'
import {Route} from 'react-router-dom'
import Index from "./Index";
import {delCookie} from "../Util/reg";
import Card from "./Card";



const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


class Home extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            selectedKey: this.props.location.pathname, //选中
            openKey: '' //展开
        };
        console.log(this.state.selectedKey)
    }

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    getSelectKey() {
        console.log(this.props)
        this.setState({
            selectedKey: this.props.location.pathname
        })
    }

    getMenuNodes = (list) => {
        return list.map((item, index) => {
            if (!item.children) {
                return (
                    <Menu.Item key={index}>
                        <Link to={item.path}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={index}
                        title={
                            <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
                        }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    };

    outLogin() {
        delCookie("userName");
        delCookie("password");
        this.props.history.push({pathname: '/login'})
    }


    render() {
        let selectedKey = this.props.location.pathname;
        console.log(this.props.location.pathname)
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" selectedKeys={[selectedKey]} onSelect={() => {
                        this.getSelectKey()
                    }}
                          onOpenChange={this.onOpenChange} mode="inline">
                        {
                            this.getMenuNodes(menuList)
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <PageHeader
                            style={{
                                border: '1px solid rgb(235, 237, 240)',
                            }}

                            onBack={() => {
                                window.history.back()
                            }}

                            extra={[<Button key="1" onClick={() => {
                                this.outLogin()
                            }}>退出登录</Button>]}

                            title="返回"/>
                    </Header>
                    <Content style={{margin: '0 16px', overflow: 'auto'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff', height: "calc(100vh - 200px)", overflow: "auto"}}>
                            <Route exact path="/index" component={Index}/>
                            <Route path="/card" component={Card}/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>运用管理</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Home;
