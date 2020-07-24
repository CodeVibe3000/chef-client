import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from "apollo-link-error";
import axios from 'axios'

console.log(process.env.NODE_ENV)

const httpLink = createHttpLink({
  uri: (process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://chefappbob.herokuapp.com") +'/graphql',
});

const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink = onError(({ networkError }) => {
  try{
    if (networkError.statusCode === 403) {
      axios.post((process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://chefappbob.herokuapp.com") +"/refresh_token", {}, {headers:{
        refresh:localStorage.getItem("refreshToken")
      }}).then(res => {
        const token = res.data.accessToken
        const refreshToken = res.data.refreshToken
        try{
          localStorage.setItem("token", token)
          localStorage.setItem("refreshToken", refreshToken)

          window.location.reload()
        }catch(e){

        }
      })
    }
    if (networkError.statusCode === 401) {
      window.location.pathname = "/login"
    }
  }catch(e) {
    
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache()
});