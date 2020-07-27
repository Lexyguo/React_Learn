import React, { useEffect } from "react";
// import Form, { Field } from "rc-field-form";
import Form, { Field } from "../components/my-rc-field-form";
import Input from "../components/Input";
const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };
export default function MyRCFieldForm(props) {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ username: "admin" });
    }, []);

    const onFinish = value => {
        console.log(value)
    }

    const onFinishFailed = value => {
        console.log('onFinishFailed', value)
    }

    const onReset = () => {
        form.setFieldsValue({ username: "", password: "" })
    }

    return (
        <div>
            <h3>MyRCFieldForm</h3>
            <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} onReset={onReset}>
                <Field name="username" rules={[nameRules]}>
                    <Input placeholder="请输入姓名" />
                </Field>
                <Field name="password" rules={[passwordRules]}>
                    <Input placeholder="请输入密码" />
                </Field>
                <button type="submit">提交</button>
                <button type="reset">重置</button>
            </Form>
        </div>
    )

}