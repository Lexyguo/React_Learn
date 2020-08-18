import React, { Component } from 'react';
import './App.css';
// import {
//   BrowserRouter as Router, Route, Link, Switch,
//   withRouter, Prompt
// } from 'react-router-dom'
// import {
//   BrowserRouter as Router, Route, Link, Switch,
//   withRouter, Prompt
// } from './kReactRouterDom'
// import AntdFormPage from "./pages/AntdFormPage";
// import MyRCFieldForm from "./pages/MyRCFieldForm";
// import MyRCForm from "./pages/MyRCForm";
// import ReduxPage from "./pages/ReduxPage";
// import HooksPage from "./pages/HooksPage";
// import ReactReduxPage from "./pages/ReactReduxPage";
// import ReactReduxHookPage from "./pages/ReactReduxHookPage";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import UserPage from "./pages/UserPage";
import _404Page from "./pages/404Page";
import UseCallbackPage from "./pages/UseCallbackPage";
import UseMemoPage from "./pages/UseMemoPage";

function App() {
  return (
    <div className="App">
      {/* <AntdFormPage /> */}
      {/* <MyRCFieldForm /> */}
      {/* <MyRCForm /> */}
      {/* <ReduxPage /> */}
      {/* <HooksPage /> */}
      {/* <ReactReduxPage /> */}
      {/* <ReactReduxHookPage /> */}
      {/* <Router>
        <Link to="/">首页</Link>
        <Link to="/welcome">欢迎页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/product/123">产品</Link>
        <Switch>
          <Route exact path="/" children={HomePage}></Route>
          <Route path="/welcome" component={WelcomePage}></Route>
          <Route path="/user" render={() => <UserPage />}></Route>
          <Route path="/product/:id" render={() => <ProductPage />}></Route>
          <Route component={_404Page}></Route>
        </Switch>

      </Router> */}
      <UseCallbackPage />
      {/* <UseMemoPage /> */}
    </div>
  );
}

export default App;

// @withRouter
// class ProductPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { confirm: true };
//   }

//   render() {
//     // console.log(this.props)
//     const { params, url } = this.props.match;
//     return <div>
//       <h3>Product id={params.id}</h3>
//       <Link to={url + '/detail'} >详情</Link>
//       <Route path={url + '/detail'} component={Detail}></Route>
//       {/* <Prompt />官方说明：用于在用户离开页面之前及时提示用户。当你的应用程序
//       进入应阻止用户离开的状态时（比如一个表格被填满了一半），渲染一个 <Prompt> 。 */}
//       <Prompt
//         when={this.state.confirm}
//         message="Are you sure you want to leave?"
//       // message={location => {
//       //   return "Are you sure you want to leave-fun";
//       // }}
//       /></div>
//   }

// }

// function Detail({ match }) {

//   return (<div><h4>detail of {match.url}</h4></div>)
// }