import React from 'react'
import { Route, useParams } from 'react-router-dom'

export const User = () => {
    const { id } = useParams();
    return (
        <Route>
            <h2>Profile Componeent {id}</h2>
        </Route>
    )
}
