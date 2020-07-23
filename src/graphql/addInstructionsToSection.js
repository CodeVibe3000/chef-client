import gql from "graphql-tag";

export default gql`
mutation ($instructions:[String!]!, $name:String!, $id:Float!){
  addInstructionsToSection(name:$name, id:$id, instructions:$instructions)
}
`