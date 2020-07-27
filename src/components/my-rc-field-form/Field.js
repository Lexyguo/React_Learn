import React, { Component } from "react";
import FieldContext from "./FieldContext";


export default class Fied extends Component {

    static contextType = FieldContext;

    componentDidMount() {
        const { registerEntity } = this.context;
        this.cancelRegister = registerEntity(this);
    }

    componentWillUnmount() {
        // 取消注册
        if (this.cancelRegister) {
            this.cancelRegister();
        }
    }

    onStoreChange = () => {
        this.forceUpdate();
    };

    getControlled = () => {
        const { props: { name } } = this
        const { getFieldValue, setFieldsValue } = this.context;
        return {
            value: getFieldValue(name),
            onChange: event => {
                const newVal = event.target.value
                setFieldsValue({
                    [name]: newVal
                })
            }
        }
    }

    render() {
        const returnChildNode = React.cloneElement(this.props.children, this.getControlled());
        return returnChildNode;
    }
}