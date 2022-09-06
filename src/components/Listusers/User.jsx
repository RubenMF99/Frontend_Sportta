


const User = ({user}) => {

  return (
    <tr>
                 <td>{user.id}</td>
                 <td>{user.name}</td>
                 <td>{user.cell}</td>
                 <td>{user.email}</td>
                 
      </tr>
  )
}

export default User