import { Button, Space, Table } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ModalCadastroComponent from '../components/ModalCadastro';
import ModalEdicaoComponent from '../components/modalEdicao'
import axios from '../helpers/axios'

const Users = () => {
  const axiosInstance = useMemo(() => axios(), [])
  const [usuarios, setUsuarios] = useState([])
  const [usuarioSelected, setUsuarioSelected] = useState(null)

  const [openModal, setOpenModal] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)

  const [openModalEdicao, setOpenModalEdicao] = useState(false)
  const [loadingModalEdicao, setLoadingModalEdicao] = useState(false)

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/usuarios/listagem")

      return setUsuarios(response.data)
    } catch (error) {
      console.warn(error)
      if (error.response) {
        const response = error.response
        const data = response.data
        window.alert(data.message)
      } else {
        throw error
      }
    }
  }, [axiosInstance])

  const deleteUserData = useCallback(async (usuario) => {
    try {
      await axiosInstance.delete(`/usuarios/${usuario.id}/delete`)

      await fetchUserData()
    } catch (error) {
      console.warn(error)

      if (error.response) {
        const response = error.response
        const data = response.data
        window.alert(data.message)

      } else {
        throw error
      }
    }
  }, [axiosInstance, fetchUserData])


  useEffect(() => {
    fetchUserData()

  }, [fetchUserData, openModal, openModalEdicao])

  function renderActions(usuario, records) {
    return (
      <Space size="middle">
        <Button onClick={() => deleteUserData(usuario)} danger>Deletar</Button>
        <Button type="link" block onClick={() => {
          setOpenModalEdicao(true)
          setUsuarioSelected({
            ...usuario,
            data_nascimento: moment(usuario.data_nascimento)
          })
        }}
        >Editar</Button>
      </Space>
    )
  }

  return (
    <span>
      <div>
        <h3>
          <b>
            Listagem de Usuários
          </b>
          <span style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}>
            <Button type="primary" onClick={() => setOpenModal(true)} ghost>Cadastrar</Button>
          </span>
        </h3>
        <ModalCadastroComponent
          open={openModal}
          loading={loadingModal}
          setOpenResponse={setOpenModal}
          setLoadingResponse={setLoadingModal}
        />
        <ModalEdicaoComponent
          open={openModalEdicao}
          loading={loadingModalEdicao}
          setOpenResponse={setOpenModalEdicao}
          setLoadingResponse={setLoadingModalEdicao}
          usuario={usuarioSelected}
          setUsuario={setUsuarioSelected}
        />
      </div>
      <Table
        dataSource={usuarios}
      >
        <Table.Column
          title="#"
          dataIndex="id"
          key="id"
          render={(text) => <b>{text}</b>}
        />

        <Table.Column
          title="Nome"
          dataIndex="nome"
          key="nome"
          render={(text) => <i>{text}</i>}
        />

        <Table.Column
          title="E-mail"
          dataIndex="email"
          key="email"
        />

        <Table.Column
          title={'Ação  '}
          key={'action'}
          render={renderActions}
        />

      </Table>
    </span>
  )
}
export default Users;
