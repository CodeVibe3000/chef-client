import gql from 'graphql-tag'

export default gql`
query ($id:Float!){
    getRecipeById(id:$id){
      id
      name
      description
      imgUrl
      ingredients
      instructions
      public
      published
      sections{
        name
        instructions
      }
      user{
        id
      }
    }
  }
`