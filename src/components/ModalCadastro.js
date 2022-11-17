import { Button, DatePicker, Form, Input, Modal } from 'antd';
import React, { useCallback, useMemo } from 'react';
import axiosInstance from '../helpers/axios';


const ModalCadastroComponent = ({
    open, loading,
    setOpenResponse, setLoadingResponse
}) => {
    const axios = useMemo(() => axiosInstance(), [])

    const handleOk = useCallback(() => {
        setLoadingResponse(false);
        setOpenResponse(false);
    }, [setLoadingResponse, setOpenResponse]);

    const handleCancel = useCallback(() => {
        setOpenResponse(false);
    }, [setOpenResponse]);

    const onFinish = useCallback(async (values) => {
        try {
            setLoadingResponse(true);
            await axios.post("/usuarios/cadastro", values)
        } catch (error) {
            console.warn(error)
            if (error.response) {
                const response = error.response
                const data = response.data
                window.alert(data.message)
            } else {
                throw error
            }
        } finally {
            setLoadingResponse(false)
            setOpenResponse(false);
        }
        handleOk()
    }, [axios, handleOk, setLoadingResponse, setOpenResponse]);

    const onFinishFailed = useCallback((values) => {
        console.log(values)
    }, []);

    return (
        <Modal
            open={open}
            title="Title"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Nome"
                    name="nome"
                    rules={[
                        {
                            required: true,
                            message: 'Informe seu nome',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

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
                            message: 'Informe sua senha',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Data de nascimento"
                    name="data_nascimento"
                    rules={[
                        {
                            required: true,
                            message: 'Informe sua data de nascimento',
                        },
                    ]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    style={{
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems: "flex-end"
                    }}
                >
                    <Button loading={loading} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default ModalCadastroComponent;
