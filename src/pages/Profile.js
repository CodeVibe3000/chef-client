import React from 'react'
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag'

const profile = gql`
query{
    me{
        name
        username
        email
    }
}
`

export default function Profile() {
    const { loading, error, data } = useQuery(profile)

    if(!error && !loading){

        var me = data.me
        console.log(me)

        return (
            <p>hi</p>
        )
    }

    return (
        <p>loading</p>
    )
}