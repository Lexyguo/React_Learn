import React from "react";

const Input = props => {
    return <input {...props} />;
};

// const CustomizeInput = ({value = "", ...props}) => (
//   <div style={{padding: 10}}>
//     <Input style={{outline: "none"}} value={value} {...props} />
//   </div>
// );

class CustomizeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { value = "", ...otherProps } = this.props;
        return (
            <div style={{ padding: 10 }}>
                <Input style={{ outline: "none" }} value={value} {...otherProps} />
            </div>
        );
    }
}

export default CustomizeInput;
// 如果直接在Form中使用input标签会出现以下报错
// 错误原因：由于一开始没有对value设置值
// 解决办法：预设value=""
// index.js:1 Warning: A component is changing an uncontrolled input of type undefined to be controlled.
// Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using
//  a controlled or uncontrolled input element for the lifetime of the component. 
// More info: https://fb.me/react-controlled-components
