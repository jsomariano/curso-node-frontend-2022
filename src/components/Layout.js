import { Breadcrumb, Menu } from 'antd'
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Layout.css"

const LayoutComponent = ({ children }) => {
    let navigate = useNavigate()


    return (
        <Layout className='layoutContainer'>
            <Header>
                <div className="logo" />
                <Menu
                    mode="horizontal"
                    theme='dark'
                    defaultSelectedKeys={['home']}
                    items={[
                        {
                            key: "home",
                            label: "Home"
                        },
                        {
                            key: "logout",
                            label: "Logout",
                            onClick() {
                                navigate("/login")
                                localStorage.clear()
                            }
                        }
                    ]}
                />
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">{children}</div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    )
}

export default LayoutComponent;

