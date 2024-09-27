import {Button, Checkbox, Form, Input, Modal} from 'antd';
import axios from "axios";
import {useState} from "react";
//import {useEffect, useState} from 'react';

function LoginMenu() {
    //const addr = "https://10.0.2.15:8000"
    const addr = "http://127.0.0.1:8000"
    const onFinish = (values) => {
        axios.post(addr+'/auth/jwt/login', {
            "username": values.username,
            "password": values.password,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(r => {
            if (r.status == 204) {
                console.log(r.headers["access-control-allow-credentials"])
                axios.get(addr+'/users/me')
            } else {
                return Register(values)
            }
        }).catch(function (error) {
            console.log(error)
            return Register(values)
        });
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const Register = (values) => {
        axios.post(addr+'/auth/jwt/register', {

                "username": values.username,
                "password": values.password,

        }).then(r => {
            if (r.status == 204) {
                return (
                    <div>Successful registration</div>
                )
            } else {
                return <div>Error {r.status}</div>
            }
        });
    };

    return (
        <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="on"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
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
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    )
}

export default LoginMenu