import gql from 'graphql-tag'

export default gql`
query($q:String!){
	searchRecipes(q:$q){
    id
    name
    imgUrl
    description
    user{
      name
      id
    }
  }
}
`