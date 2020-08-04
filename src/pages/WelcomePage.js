import React from 'react'
// import { useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";
import { useHistory, useLocation, useParams, useRouteMatch } from "../kReactRouterDom";
export default function WelcomePage() {
    const match = useRouteMatch();
    console.log('match', match)
    const history = useHistory();
    console.log('history', history)
    const location = useLocation();
    console.log('location', location)
    const _params = useParams();
    console.log('_params', _params)
    return (
        <div>
            <h3>WelcomePage</h3>
        </div>
    )
}
