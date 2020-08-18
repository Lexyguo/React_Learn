import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// lesson 7 页面代码
// import React, { Component } from './kReact';
// import ReactDOM from './kReactDom';
// class ClassComp extends Component {
//   static defaultProps = {
//     color: "pink",
//   };
//   render() {
//     return (
//       <div className="border">
//         class组件-{this.props.name}
//         <p className={this.props.color}>omg</p>
//       </div>
//     );
//   }
// }

// function FunctionComp(props) {
//   return <div className="border">函数组件-{props.name}</div>;
// }


// const jsx = (
//   <div className="border">
//     <p>全栈</p>
//     <a href="https://www.kaikeba.com/">开课吧</a>
//     <ClassComp name="class" color="red" fontSize="50px" />
//     <FunctionComp name="function" />
//     {/* 目前的kreact只实现了对 文本、function、类节点的实现，不包含对如下节点的实现 */}
//     {[1, 2].map(item => (
//       <React.Fragment key={item}>Fragment{item}</React.Fragment>
//     ))}
//     <h1>aaa</h1>
//     {/* <>
//       <h1>aaa</h1>
//       <h1>bbb</h1>
//     </> */}
//   </div>
// );

// ReactDOM.render(jsx, document.getElementById("root"));