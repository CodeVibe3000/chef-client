import gql from "graphql-tag";

export default gql`
{
	getMyRecipes{
    name
    id
    user{
      name
      id
      username
    }
    imgUrl
  }	
}
`