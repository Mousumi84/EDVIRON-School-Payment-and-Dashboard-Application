import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../../Styles/Auth.css';
import { Button, Form, Input } from "antd";

function Signup() {
    const navigate = useNavigate();

    const signupAPI = async (e) => {
        //e.preventDefault();
        console.log(e);
        const { email, name, role, password } = e;
        console.log(email, name, role, password, `${process.env.REACT_BASE_URL}/api/auth/signup`);

        try {
            const response = await axios({
                url: `${process.env.REACT_APP_API_URL}/api/auth/signup`,
                method: "POST",
                data: {
                    email,
                    name,
                    role,
                    password
                }
            });
            console.log(response);

            if (response.data.status !== 200) {
                alert(response.data.message);
                return;
            }

            navigate("/");

        } catch (error) {
            alert("An error occured, please try after some time");
        }
    }


    return (
        <div id="signup" className="box">
            <Form
                className="card p-5"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: "50%" }}
                initialValues={{ remember: true }}
                onFinish={signupAPI}
                autoComplete="off"
            >
                <h3 className="pb-4">SIGNUP</h3>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please input your role!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

                <div>Have an account ? <Link to={"/"}>Login</Link></div>
            </Form>
        </div>
    );
}


export default Signup;