import React from 'react';
import { Button, Checkbox, Form, Input, Select } from 'antd';
const { Option } = Select;


const TestDemo = () => {

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="64">+64</Option>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1200 }}
      >
        <Form.Item
          label="Recipient Name"
          name="recipientName"
          rules={[{ required: true, message: 'Please input your recipientname!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>I have read the agreement</Checkbox>
        </Form.Item>

      </Form>
    </>
  )
}

export default TestDemo