import gql from 'graphql-tag'

export default gql`
    mutation ($username: String!, $email: String!, $password: String!, $name:String!) {
        register(username: $username, email: $email, password: $password, name:$name)
    }
`