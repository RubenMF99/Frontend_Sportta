import { useState } from "react";
import AxiosClient from "../AxiosClient/AxiosClient";
import Swal from 'sweetalert2';
import { Button, Modal, Row, Col, Container } from "react-bootstrap";
const User = ({ user, setControl }) => {
  const [registrarU, setregistrar] = useState({
    id:user.id,
    name: user.name,
    cell: user.cell,
    email: user.email
  });
  const { name, cell, email, password } = registrarU;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    setregistrar({
      ...registrarU,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    update_user();
  }
  const update_user = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
       await AxiosClient.put(`/users`,registrarU,config);
      Swal.fire({
        icon: "success",
        text: "Registro exitoso",
      });
      handleClose();
      setControl('update');
      setregistrar({
        id:user.id,
        name: user.name,
        cell: user.cell,
        email: user.email
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
         "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await AxiosClient.post(`/users`,{id},config);
      Swal.fire({
        icon: "success",
        title: "Exitoso",
        text: "Eliminado Correctamente",
      });
      setControl("delete");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.cell}</td>
      <td>{user.email}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteData(user.id);
          }}
        >
          Eliminar
        </button>
      </td>
      <td>
        <button
          className="btn btn-success"
          onClick={handleShow}
        >
          Actualizar
        </button>
      </td>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Actualiza tu Usuario</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Container>
              <Row>
                <Col xs={6} md={6}>
                  <label>
                    <strong> Nombre</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={name}
                    name="name"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <label>
                    <strong>Telefono</strong>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={cell}
                    name="cell"
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <label>
                    {" "}
                    <strong>email</strong>
                  </label>
                  <input
                    type="email"
                    className="form-control mb-3"
                    value={email}
                    name="email"
                    onChange={handleChange}
                  />
                </Col>
              
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cerrar
            </Button>
            <Button type="submit" className="btn-success">
              Hecho
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </tr>
  );
};

export default User
