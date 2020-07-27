import React, { useEffect } from "react";
import { Form, Button, Input } from "antd";
const FormItem = Form.Item;
const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
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

export default function AntdFormPage() {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: "admin",
      password: "123",
    });
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form {...layout} form={form} onFinish={onFinish} onReset={onReset}>
      <FormItem label="姓名" name="name" rules={[nameRules]}>
        <Input placeholder="请输入姓名" />
      </FormItem>
      <FormItem label="密码" name="password" rules={[passworRules]}>
        <Input placeholder="请输入密码" />
      </FormItem>
      <FormItem {...tailLayout}>
        <Button type="primary" size="large" htmlType="submit">
          提交
        </Button>
        <Button type="primary" size="large" htmlType="reset">
          重置
        </Button>
      </FormItem>
    </Form>
  );
}
