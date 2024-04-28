import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Form, Input, InputNumber, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUsuarioStorage';


const { Title, Text } = Typography;



export const Login = () => {

  useHideMenu(false);

  const navegate = useNavigate();

  const [user] = useState(getUserStorage());


  const onFinish = ({ agent, desktop }) => {

    localStorage.setItem('agent', agent);
    localStorage.setItem('desktop', desktop);

    navegate('/desktop');
  };


  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // if (user.agent && user.desktop) {
  //   navegate('/desktop');
  // }
  return (
    <>
      <Title level={2}>Login</Title>
      <Text>Please, input your name and desktop number</Text>
      <Divider />
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Agent name"
          name="agent"
          rules={[
            {
              required: true,
              message: 'Please, input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desktop"
          name="desktop"
          rules={[
            {
              required: true,
              message: 'Please, input the desktop number!',
            },
          ]}
        >
          <InputNumber min={1} max={6} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 14,
          }}
        >
          <Button type="primary" htmlType="submit" shape='round'>
            <SaveOutlined />
            Login
          </Button>
        </Form.Item>
      </Form>
    </>


  );
};
