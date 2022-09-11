import AxiosClient from "../AxiosClient/AxiosClient";
import Swal from 'sweetalert2';
const User = ({ user, setControl }) => {
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
    </tr>
  );
};

export default User
