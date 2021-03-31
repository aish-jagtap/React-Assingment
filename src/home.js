import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Home = () => {

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetch("https://run.mocky.io/v3/af630b81-f508-49a8-af74-2ff8c62d3d3c")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  const onFinish = (values) => {
    if (verify()) {
       alert("User login successfully");
       history.push("/dashboard");

    } else {
      return alert("Failed to login");
    }
  };

  const verify = () => {
    for (var i = 0; i < users.length; i++) {
      if (users[i].username == userName && users[i].password == password)
      {
        localStorage.setItem("username" , users[i].username);
        localStorage.setItem("userRole" , users[i].role)
        setRole(users[i].role)
        return true;
      }
    }
    return false;
  };

  const onFinishFailed = (errorInfo) => {
    return alert("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter User Name"
            name="username"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            name="password"
          />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Home;
