import { Alert, Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../helpers/axios'
import "./Login.css"

const Login = () => {
    const axiosInstance = useMemo(() => axios(), [])
    const [getErrorMesage, setErrorMessage] = useState()
    let navigate = useNavigate()

    const onFinish = useCallback(async (values) => {
        setErrorMessage(null)
        try {
            console.log('Success:', values);
            console.log(axios)
            const response = await axiosInstance.post("usuarios/login", values)
            const UserData = response.data

            localStorage.setItem("auth", JSON.stringify(UserData))

            navigate("/users")
        } catch (error) {
            console.warn(error)
            if (error.response) {
                const response = error.response
                const data = response.data
                setErrorMessage(data.message)
            } else {
                throw error
            }
        }
    }, [navigate, axiosInstance]);

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const renderErrorMessage = useCallback(() => {
        if (!getErrorMesage) return null

        return (
            <Form.Item>
                <Alert message={getErrorMesage} type='error' />
            </Form.Item>
        )

    }, [getErrorMesage])

    return (
        <Content className='ContentContainer'>
            <Row>
                <Col align="center" span={24}>
                    <Form
                        name="basic"
                        className='FormLogin'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            className='LoginImageContainer'
                        >
                            <object data='./engineering_team.svg' width={400} height={400} />
                        </Form.Item>

                        {renderErrorMessage()}

                        <Form.Item
                            label="E-mail"
                            name="email"
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
                            name="senha"
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

                        <Form.Item>
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
export default Login;
