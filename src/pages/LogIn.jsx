import React from 'react';
import { Button, Form, Input} from 'antd';
import { useNavigate } from 'react-router';
import api from "../services/todoApi.js"
import { useAuth } from '../context/AuthContext.jsx';

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    // number: '${label} is not a valid number!',
  }
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
};

const LogIn = () =>{ 
  const {authAction}=useAuth()
 const {userAuth}=api
  const navigate=useNavigate()

  const onFinish = async(values) => {
     const {confirm,...restValues}=values
     const response=await userAuth(restValues,"login");
     const data=await response.json()
     authAction(data.token)
  };
   

  const handleSignup=()=>{
    navigate("/signup")
  }



  
  return(
    <div className="flex justify-center items-center min-h-screen">
  <Form
    {...layout}
    name="login"
    onFinish={onFinish}
    style={{
      maxWidth: 600,

    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['email']}
      label="Email"
      rules={[
        {
          type: 'email',
        },
        {
            required: true,
          },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
        {
            min: 6,
            message: 'Password must be at least 6 characters!',
          },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Log In
      </Button>
      <a onClick={handleSignup} className='ml-7'>
        Register
      </a>
    </Form.Item>
  </Form>
  </div>
);

}
export default LogIn;