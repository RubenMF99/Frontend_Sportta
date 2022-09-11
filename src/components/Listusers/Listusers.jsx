import { useEffect, useState } from "react";
import AxiosClient from "../AxiosClient/AxiosClient";
import useAuth from "../../hooks/useAuth";
import { Button, Modal, Row, Col, Container } from "react-bootstrap";
import User from "./User";
import Swal from 'sweetalert2';

const Listusers = () => {
  const [registrarU, setregistrar] = useState({
    name: "",
    cell: "",
    email: "",
    password: ""
  });
  const [ repeatPassword,setRepeatPassword] = useState('');
  const { name, cell, email, password } = registrarU;
  const [users, setUsers] = useState([]);
  const { idControl } = useAuth();
  const [control,setControl] = useState('');
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
    if ([name, cell, email, password].includes("")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }
    if (password !== repeatPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas deben ser iguales",
      });
      return;
    }
    register_user();
    //reseteamos el forma
    setregistrar({
      name: "",
      cell: "",
      email: "",
      password: "",
    });
    setRepeatPassword('');
  };

  const register_user = async () => {
    try {
      const response = await AxiosClient.post("/register", registrarU);
      Swal.fire({
        icon: "success",
        text: "Registro exitoso",
      });
      setControl('registro');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const Listusers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await AxiosClient.get("/users", config);
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };
    Listusers();
  }, [control]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-2 mt-5 mx-3">
          <button className="btn btn-success">Cerrar Sesion</button>
        </div>
        <div className="col-2 mt-5 mx-1">
          <button className="btn btn-primary" onClick={handleShow}>
            Agregar Usuarios
          </button>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-auto">
          <h2>Tus Usuarios</h2>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-8">
          <table className="table table-responsive">
            <tbody>
              {users?.map((user) => (
                <User user={user} setControl={setControl} key={user.id} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Datos del Usuario</Modal.Title>
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
                <Col xs={6} md={6}>
                  <label>
                    {" "}
                    <strong> password </strong>
                    <input
                      type="password"
                      className="form-control mb-3"
                      value={password}
                      name="password"
                      onChange={handleChange}
                    />
                  </label>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6}>
                  <label>
                    {" "}
                    <strong> Repetir password </strong>
                    <input
                      type="password"
                      className="form-control mb-3"
                      value={repeatPassword}
                      name="repeatPassword"
                      onChange={(e)=>{setRepeatPassword(e.target.value)}}
                    />
                  </label>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cerrar
            </Button>
            <Button type="submit" className="btn-success">
              Registrar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Listusers;
