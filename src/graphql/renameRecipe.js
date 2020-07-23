import gql from "graphql-tag";

export default gql`
mutation ($id:Float!, $name:String!, $description:String!){
    renameRecipe(id:$id, name:$name, description:$description)
  }
`