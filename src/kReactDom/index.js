

import { TEXT, PLACEMENT, UPDATE, DELETION } from "../kReact/const";

// 下一个单元任务  fiber
let nextUnitOfWork = null;
// work in progress fiber root （正在执行的根fiber）
let wipRoot = null;

// 当前的根节点
let currentRoot = null;

// work in progress fiber  （正在执行的fiber）
let wipFiber = null;

let deletions = null;

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
    },
    base: currentRoot
  };
  nextUnitOfWork = wipRoot;
  deletions = [];
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
  wipFiber = fiber;
  wipFiber.hooks = [];
  wipFiber.hookIndex = 0;

  const { type, props } = fiber;
  const children = [type(props)];
  reconcileChildren(fiber, children);
}

// 更新属性值，如className、nodeValue等
function updateNode(node, prevVal, nextVal) {
  // 如果说prevVal, nextVal里有相同的属性值，这个时候不用管
  // 如果说prevVal里有， nextVal没有，需要遍历prevVal执行删除操作
  // 如果说prevVal里没有， nextVal有，这个时候不用管
  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      // ! 源码中的合成事件下节课讲，源码当中用到了事件代理，这里瞎写一下
      if (k.slice(0, 2) === "on") {
        // 简单粗暴 这是个事件
        let eventName = k.slice(2).toLowerCase();
        node.removeEventListener(eventName, prevVal[k]);
      } else {
        if (!(k in nextVal)) {
          node[k] = "";
        }
      }
    });

  Object.keys(nextVal)
    .filter(k => k !== "children")
    .forEach(k => {
      // ! 源码中的合成事件下节课讲，源码当中用到了事件代理，这里瞎写一下
      if (k.slice(0, 2) === "on") {
        // 简单粗暴 这是个事件
        let eventName = k.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
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

function placeChild(newFiber, lastPlacedIndex, newIdx, shouldTrackSideEffects) {
  newFiber.index = newIdx;

  if (!shouldTrackSideEffects) {
    // 初次渲染
    return lastPlacedIndex;
  }

  // 界面更新阶段，但是这里的fiber有可能新增或者更新
  let base = newFiber.base;
  if (base !== null) {
    // 复用oldfiber
    let oldIndex = base.index;
    if (oldIndex < lastPlacedIndex) {
      return lastPlacedIndex;
    } else {
      return oldIndex;
    }
  } else {
    // 证明是新插入的节点
    newFiber.effectTag = PLACEMENT;
    return lastPlacedIndex;
  }
}

function reconcileChildren(returnFiber, newChildren) {
  let previousNewFiber = null;

  let oldFiber = returnFiber.base && returnFiber.base.child;

  let lastPlacedIndex = 0;

  let newIdx = 0;

  let nextOldFiber = null;

  let shouldTrackSideEffects = true;
  if (!oldFiber) {
    shouldTrackSideEffects = false;
  }

  for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
    if (oldFiber.index > newIdx) {
      nextOldFiber = oldFiber;
      oldFiber = null;
    } else {
      nextOldFiber = oldFiber.sibling;
    }

    let newChild = newChildren[newIdx];

    if (!(newChild.key === oldFiber.key && newChild.type === oldFiber.type)) {
      if (oldFiber === null) {
        oldFiber = nextOldFiber;
      }
      break;
    }

    const newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,
      node: oldFiber.node,
      base: oldFiber,
      return: returnFiber,
      effectTag: UPDATE
    };
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIdx,
      shouldTrackSideEffects
    );
    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
    oldFiber = nextOldFiber;
  }

  if (newIdx === newChildren.length) {
    while (oldFiber) {
      deletions.push({
        ...oldFiber,
        effectTag: DELETION
      });
      oldFiber = oldFiber.sibling;
    }
  }

  if (oldFiber === null) {
    for (; newIdx < newChildren.length; newIdx++) {
      let newChild = newChildren[newIdx];
      const newFiber = {
        key: newChild.key,
        type: newChild.type,
        props: newChild.props,
        node: null,
        base: null,
        return: returnFiber,
        effectTag: PLACEMENT
      };
      lastPlacedIndex = placeChild(
        newFiber,
        lastPlacedIndex,
        newIdx,
        shouldTrackSideEffects
      );
      if (previousNewFiber === null) {
        returnFiber.child = newFiber;
      } else {
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
    }
    return;
  }

  const existingChildren = mapRemainingChildren(returnFiber, oldFiber);
  for (; newIdx < newChildren.length; newIdx++) {
    let newChild = newChildren[newIdx];

    let newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,
      return: returnFiber
    };

    let matchedFiber = existingChildren.get(
      newChild.key === null ? newIdx : newChild.key
    );
    if (matchedFiber) {
      // 找到啦
      newFiber = {
        ...newFiber,
        node: matchedFiber.node,
        base: matchedFiber,
        effectTag: UPDATE
      };
      // 找到就要删除链表上的元素，防止重复查找
      shouldTrackSideEffects &&
        existingChildren.delete(newFiber.key === null ? newIdx : newFiber.key);
    } else {
      newFiber = {
        ...newFiber,
        node: null,
        base: null,
        effectTag: PLACEMENT
      };
    }
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIdx,
      shouldTrackSideEffects
    );
    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }

  if (shouldTrackSideEffects) {
    existingChildren.forEach(child =>
      deletions.push({
        ...child,
        effectTag: DELETION
      })
    );
  }
}



function mapRemainingChildren(returnFiber, currentFirstChild) {
  // Add the remaining children to a temporary map so that we can find them by
  // keys quickly. Implicit (null) keys get added to this set with their index
  // instead.
  const existingChildren = new Map();

  let existingChild = currentFirstChild;
  while (existingChild) {
    if (existingChild.key !== null) {
      existingChildren.set(existingChild.key, existingChild);
    } else {
      existingChildren.set(existingChild.index, existingChild);
    }
    existingChild = existingChild.sibling;
  }
  return existingChildren;
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