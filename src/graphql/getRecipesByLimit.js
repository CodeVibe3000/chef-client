import gql from 'graphql-tag'

export default gql`
query($limit: Float!){
    getNewestRecipes(limit:$limit){
      name
      id
      description
      imgUrl
      user{
        name
        username
        id
        email
      }
    }
  }
`