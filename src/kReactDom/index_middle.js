

import { TEXT, PLACEMENT } from "../kReact/const";

// 下一个单元任务  fiber
let nextUnitOfWork = null;
// work in progress fiber root （正在执行的根fiber）
let wipRoot = null;

/**
 * fiber架构
 * type: 标记类型
 * key: 标记当前层级下的唯一性
 * child : 第一个子元素 fiber
 * sibling ： 下一个兄弟元素 fiber
 * return： 父fiber
 * node： 真实dom节点
 * props：属性值
 * base: 上次的节点 fiber
 * effectTag: 标记要执行的操作类型（删除、插入、更新）
 */

// ! vnode  虚拟dom对象
// ! node  真实dom

function render(vnode, container) {
  // 初始值
  wipRoot = {
    node: container,
    props: {
      children: [vnode]
    }
  };
  nextUnitOfWork = wipRoot;
}

// 创建node
function createNode(vnode) {
  const { type, props } = vnode;
  let node = null;
  // 判断节点类型
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    // 判断是函数组件还是类组件
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = document.createDocumentFragment();
  }

  // 把props.children遍历，转成真实dom节点 ，再插入node
  // reconcileChildren(props.children, node);
  // 更新属性节点
  updateNode(node, props);
  return node;
}

function updateClassComponent(fiber) {
  const { type, props } = fiber;
  let cmp = new type(props);
  const children = [cmp.render()];
  reconcileChildren(fiber, children);
}

function updateFunctionComponent(fiber) {
  const { type, props } = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children);
}

// 更新属性值，如className、nodeValue等
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      node[k] = nextVal[k];
    });
}

function updateHostComponent(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }

  // 协调子元素
  const { children } = fiber.props;
  reconcileChildren(fiber, children);

}

// workInProgressFiber Fiber ->child->sibling
// children 数组
function reconcileChildren(workInProgressFiber, children) {
  // 构建fiber架构
  let prevSlibling = null;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (Object.prototype.toString.call(child).slice(8, 13) === 'Array') {
      let childrenList = children;
      let index = 1;
      child.forEach(c => {
        childrenList.splice(i + index, 0, ...c.props.children);
        index += c.props.children.length;
      });

      childrenList.splice(i, 1);
      reconcileChildren(workInProgressFiber, childrenList);
      break;
    }
    // 现在只考虑初次渲染
    // 创建一个新的fiber
    let newFiber = {
      type: child.type,
      props: child.props,
      node: null,
      base: null,
      return: workInProgressFiber,
      effectTag: PLACEMENT
    };
    // 形成一个链表结构
    if (i === 0) {
      workInProgressFiber.child = newFiber;
    } else {
      prevSlibling.sibling = newFiber;
    }
    // console.log('newFiber', newFiber);
    prevSlibling = newFiber;
  }
}

function performUnitOfWork(fiber) {
  //执行当前任务 更新当前fiber节点
  const { type } = fiber;
  if (typeof type === 'function') {
    // class function
    type.prototype.isReactComponent
      ? updateClassComponent(fiber)
      : updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }

  //获取下一个子任务（fiber）
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    // 找到兄弟
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 没有兄弟 往祖先上找
    nextFiber = nextFiber.return;
  }

}

function workLoop(deadline) {
  // 有下一个任务 并且当前帧没有结束
  // 这里的时间是模拟，源码当中用的过期时间，源码中的过期时间和时间单位相关内
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    //执行当前任务
    //获取下一个子任务（fiber）
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork && wipRoot) {
    // 提交
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

// window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主
// 事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先
// 进先调用的顺序执行，然而，如果回调函数指定了执行超时时间 timeout ，则有可能为了在超时前执行
// 函数而打乱执行顺序。

requestIdleCallback(workLoop);

function commitRoot() {
  commitWorker(wipRoot.child);
  wipRoot = null;
}

function commitWorker(fiber) {
  if (!fiber) {
    return;
  }

  // 找到parentNode,
  // 找到最近的有node节点的祖先fiber
  let parentNodeFiber = fiber.return;
  while (!parentNodeFiber.node) {
    parentNodeFiber = parentNodeFiber.return;
  }
  const parentNode = parentNodeFiber.node;
  if (fiber.effectTag === PLACEMENT && fiber.node !== null) {
    // 新增插入（dom父子关系插入）
    parentNode.appendChild(fiber.node);
  }

  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}

export default { render };