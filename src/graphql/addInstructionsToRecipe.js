import gql from "graphql-tag";

export default gql`
mutation($id: Float!, $ins: [String!]!){
    addInstructionsToRecipe(id:$id, instructions:$ins)
  }
`