import gql from "graphql-tag";

export default gql`
    mutation($description:String!, $name: String!, $public: Boolean!){
        createRecipe(description:$description, name:$name, public: $public)
    }	
`