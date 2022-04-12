import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import 'antd/dist/antd.css'
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons'
import Home from './Home'
import About from './About'

const { Header, Content, Footer } = Layout

class App extends Component {

  state = {
    current: 'home',
  }

  render() {
    const { current } = this.state
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            onClick={this.handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            theme='dark'>
            <Menu.Item key="home" icon={<HomeOutlined />}>首页</Menu.Item>
            <Menu.Item key="about" icon={<AppstoreOutlined />}>关于</Menu.Item>
          </Menu>
        </Header>
        <Content style={{height: 'calc(100vh - 134px'}}>
          {
            this.state.current === 'home'? <Home></Home>: <About></About>
          }
        </Content>
        <Footer style={{ textAlign: 'center' }}>webpack-react ©2022 Created by Zhou wu chao</Footer>
      </Layout>
    )
  }
  handleClick = item => {
    console.log(item)
    this.setState({
      current: item.key
    })
  }
}

export default App