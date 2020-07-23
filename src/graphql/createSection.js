import gql from "graphql-tag";

export default gql`
mutation($name: String!, $id: Float!){
    createSection(name:$name, id:$id)
  }`