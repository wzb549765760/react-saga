import React, {Component} from 'react'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import menuList from "../router/routeList"
import {Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import Index from "./Index";
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
        this.setState({
            selectedKey: this.props.location.pathname
        })
    }

    getMenuNodes = (list) => {
        return list.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.path}>
                        <Link to={item.path}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.path}
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
                    <Header style={{background: '#fff', padding: 0}}/>
                    <Content style={{margin: '0 16px',overflow:'auto',height:"calc( vh - 64px )"}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                            {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff',height:"calc( vh - 135px )"}}>
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
