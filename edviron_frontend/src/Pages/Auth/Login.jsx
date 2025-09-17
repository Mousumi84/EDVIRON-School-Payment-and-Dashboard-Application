import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { details } from "../../App";
import '../../Styles/Auth.css';
import { Button, Form, Input } from "antd";

function Login() {
    const { setIsLogin } = useContext(details);
    const navigate = useNavigate();

    const loginAPI = async (e) => {
        //e.preventDefault();
        console.log(e);
        const { email, password } = e;


        try {
            const response = await axios({
                url: `${process.env.REACT_APP_API_URL}/api/auth/login`,
                method: "POST",
                data: {
                    email,
                    password,
                },
            });
            console.log("login=>", response);

            if (response.data.status !== 200) {
                alert(response.data.message);
                return;
            }

            let token = response.data.token;
            localStorage.setItem("Token", token);
            localStorage.setItem("User", JSON.stringify(response.data.session.user));
            setIsLogin(true);
            navigate("/dashboard/transactions")

        } catch (error) {
            alert("An error occured, please try after some time");
        }
    }


    return (
        <div id="login" className="box">
            <Form
                className="card p-5"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: "50%" }}
                initialValues={{ remember: true }}
                onFinish={loginAPI}
                autoComplete="off"
            >
                <h3 className="pb-4">LOGIN</h3>
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
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

                <div className='last'>Don't have an account ? <Link to={"/signup"}>Signup</Link></div>
            </Form>
        </div>
    );
}

export default Login;