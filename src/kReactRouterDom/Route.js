import React, { Component } from 'react'
import matchPath from "./matchPath";
import { RouterContext } from "./Context";

export default class Route extends Component {
    render() {
        return (
            <RouterContext.Consumer>
                {context => {
                    const location = context.location;
                    const { children, component, render, path, computedMatch } = this.props;
                    const match = computedMatch ? computedMatch : path ? matchPath(location.pathname, this.props) : context.match;
                    console.log('match', match)
                    const props = {
                        ...context,
                        match
                    }
                    return (
                        <RouterContext.Provider value={props}>
                            {/* {
                                match ? (children ? (typeof children === 'function' ? children(props) : children) : (component ? React.createElement(component, props) : (render ? render(props) : null))) : (typeof children === 'function' ? children(props) : null)
                            } */}
                            {
                                match
                                    ? children
                                        ? typeof children === 'function'
                                            ? children(props)
                                            : children
                                        : component
                                            ? React.createElement(component, props)
                                            : render
                                                ? render(props)
                                                : null
                                    : typeof children === 'function'
                                        ? children(props)
                                        : null
                            }
                        </RouterContext.Provider>
                    );
                }}
            </RouterContext.Consumer>
        )
    }
}
