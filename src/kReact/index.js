import Component from './Component';
import { TEXT } from './const'

const RESERVED_PROPS = {
    key: true,
    ref: true,
};

function createElement(type, config, ...children) {
    let propName;

    const props = {
        ...config,
        children: children.map(child =>
            typeof child === "object" ? child : createTextNode(child)
        )
    };

    let key = null;
    let ref = null;

    if (config !== null) {
        if (hasValidRef(config)) {
            ref = config.ref;

        }
        if (hasValidKey(config)) {
            key = '' + config.key;
        }
    }

    for (propName in config) {
        if (
            hasOwnProperty.call(config, propName) &&
            !RESERVED_PROPS.hasOwnProperty(propName)
        ) {
            props[propName] = config[propName];
        }
    }

    if (key || ref) {
        const displayName =
            typeof type === 'function'
                ? type.displayName || type.name || 'Unknown'
                : type;
        if (key) {
            console.warn(props, displayName);
        }
        if (ref) {
            console.warn(props, displayName);
        }
    }

    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps;
        for (propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }

    return {
        type,
        props
    };
}

function createTextNode(text) {
    return {
        type: TEXT,
        props: {
            children: [],
            nodeValue: text
        }
    };
}

function hasValidRef(config) {
    if (hasOwnProperty.call(config, 'ref')) {
        const getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
        if (getter && getter.isReactWarning) {
            return false;
        }
    }
    return config.ref !== undefined;
}

function hasValidKey(config) {
    if (hasOwnProperty.call(config, 'key')) {
        const getter = Object.getOwnPropertyDescriptor(config, 'key').get;
        if (getter && getter.isReactWarning) {
            return false;
        }
    }
    return config.key !== undefined;
}


export default { createElement };
export { Component };
