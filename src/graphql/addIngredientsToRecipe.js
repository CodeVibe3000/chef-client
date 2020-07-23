import gql from "graphql-tag";

export default gql`
mutation ($id:Float!, $ing:[String!]!){
    addIngredientsToRecipe(id:$id, ingredients:$ing)
  }
`