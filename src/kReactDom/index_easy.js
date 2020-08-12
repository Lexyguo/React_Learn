

import { TEXT } from "../kReact/const";

function render(vnode, container) {
    const node = createNode(vnode);
    container.appendChild(node);
}

function createNode(vnode) {
    const { props, type } = vnode;
    let node = null;

    if (type === TEXT) {
        node = document.createTextNode("");
    } else if (typeof type === "string") {
        node = document.createElement(type);
    } else if (typeof type === "function") {
        node = type.prototype.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode);
    } else {
        node = document.createDocumentFragment();
    }

    // 把props.children遍历，转成真实dom节点 ，再插入node
    reconcileChildren(props.children, node);
    // 更新属性节点
    updateNode(node, props);

    return node;
}

function updateClassComponent(vnode) {
    const { type, props } = vnode;
    let cmp = new type(props);
    const vvnode = cmp.render();
    // 生成node节点
    const node = createNode(vvnode);
    return node;
}

function updateFunctionComponent(vnode) {
    const { type, props } = vnode;
    const vvnode = type(props);
    // 生成node节点
    const node = createNode(vvnode);
    return node;
}

// ! 源码childrne可以是单个对象或者是数组，我们这里统一处理成了数组（在createElement里）
function reconcileChildren(children, node) {
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (Array.isArray(child)) {
            for (let j = 0; j < child.length; j++) {
                render(child[j], node);
            }
        } else {
            render(child, node);
        }
    }

}

// 更新属性值，如className、nodeValue等
function updateNode(node, nextVal) {
    Object.keys(nextVal)
        .filter(k => k !== "children")
        .forEach(k => {
            node[k] = nextVal[k];
        });
}

export default { render };