import React, { useEffect, Component } from "react";
import { Form, Button, Input } from "antd";
import { render } from "@testing-library/react";
const FormItem = Form.Item;
const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

// export default class AntdFormPage extends Component {
//     formRef = React.createRef();
//     componentDidMount() {
//         this.formRef.current.setFieldsValue({ name: 'admin' })
//     }

//     onFinish = values => {
//         console.log('Success:', values);
//     };

//     onFinishFailed = errorInfo => {
//         console.log('Failed:', errorInfo);
//     };

//     render() {
//         return (
//             <Form ref={this.formRef}
//                 onFinish={this.onFinish}
//                 onFinishFailed={this.onFinishFailed}>
//                 <FormItem label="姓名" name="name" rules={[nameRules]}>
//                     <Input placeholder="请输入姓名" />
//                 </FormItem>
//                 <FormItem label="密码" name="password" rules={[passworRules]}>
//                     <Input placeholder="请输入密码" />
//                 </FormItem>
//                 <FormItem>
//                     <Button>重置</Button>
//                 </FormItem>
//             </Form>
//         )
//     }

// }