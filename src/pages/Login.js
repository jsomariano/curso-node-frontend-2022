import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import "./Login.css"

const App = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Content className='ContentContainer'>
            <Row>
                <Col align="center" span={24}>
                    <Form
                        name="basic"
                        className='Form'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            className='LoginImageContainer'
                        >
                            <object data='./engineering_team.svg' width={400} height={400} />
                        </Form.Item>

                        <Form.Item
                            label="E-mail"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Informe seu endereço de E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Senha"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Informe sua senha!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Lembrar senha</Checkbox>
                        </Form.Item>

                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Content >
    );
};
export default App;
