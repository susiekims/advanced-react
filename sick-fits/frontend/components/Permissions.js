import { Query } from "react-apollo";
import Error from "./ErrorMessage";
import Table from "./styles/Table";
import gql from "graphql-tag";
import SickButton from "./styles/SickButton";

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMUDELETE",
  "PERMISSIONUPDATE",
];

const Permissions = (props) => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      console.log(data);
      return (
        <div>
          <Error error={error} />
          <div>
            <h2>Manage Permissions</h2>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {possiblePermissions.map((permission) => (
                    <th>{permission}</th>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <User user={user} />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      );
    }}
  </Query>
);

class User extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map((permission) => (
          <td>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                type="checkbox"
                id={`${user.id}-permission-${permission}`}
              />
            </label>
          </td>
        ))}
        <td>
          <SickButton>Update</SickButton>
        </td>
      </tr>
    );
  }
}

export default Permissions;
