import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './DefaultLayout.css'

const { Header, Sider, Content } = Layout;
const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

 

  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <Layout>

      <Layout className="site-layout">
        <Header className="site-layout-background "
          style={{
            padding: 0,
            background:'linear-gradient(to top, #e2ebf0 100%, #cfd9df 0%)',
            position: 'sticky',
            top: 0,
            zIndex: 9999,

            left: 0,
            width: '100%'
          }}
        >
          <div className='d-flex justify-content-between align-items-center bs1 '>
            <div className='d-flex align-items-center'>
              <UserOutlined />
              <h4 className='pt-3 text-primary'>{JSON.parse(localStorage.getItem('user')).username}</h4>
            </div>

            <h2 className='logotext pt-1'><b>AnyGram</b></h2>

            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </div>

        </Header>
        <Content
          style={{

            background:' linear-gradient(to top, #d3e1e9 0%, #e2ebf0 100%)',
          }}
        >
          {props.children}
        </Content>
      </Layout>
      <Sider
        style={{ position: 'sticky', top: 0, bottom: 0, overflow: 'auto', height: '100vh' }}
        trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={[
            {
              key: '/',
              icon: <HomeOutlined />,
              label: <Link style={{textDecoration:'inherit'}}to='/'>Home</Link>
            },


            {
              key: '/profile',
              icon: <UserOutlined />,
              label: <Link style={{textDecoration:'inherit'}}to={`/profile/${user._id}`}>Profile</Link>
            },

            {
              key: '/addpost',
              icon: <PlusOutlined />,
              label: <Link style={{textDecoration:'inherit'}}to='/addpost'>Addpost</Link>
            },

            {
              key: '/allusers',
              icon: <UsergroupAddOutlined />,
              label: <Link style={{textDecoration:'inherit'}}to='/allusers'>AllUsers</Link>
            },

            {

              icon: <LogoutOutlined />,
              label: <Link style={{textDecoration:'inherit'}} onClick={() => { localStorage.removeItem(('user'), window.location.reload()); }}>Logout</Link>
            },



          ]}
        />
      </Sider>
    </Layout>
  );
};

export default DefaultLayout;