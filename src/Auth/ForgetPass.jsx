
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
const ForgetPass = () => {
  const onFinish = (values) => {
   console.log(values)
};

  return (
    <div className="bg-white flex justify-center items-center gap-0 "
            style={{
                width: "100%",
                background: "#2E4CB9",
                height: "100vh",
            }}
        >

            <div className=" bg-white flex justify-center items-center rounded-lg">
                <Form
                    name="normal_login"
                    className="password-form"
                    initialValues={{
                        remember: true,
                    }}
                    style={{ width: "630px", background: "white", borderRadius: "12px", padding: "90px 57px" }}

                    onFinish={onFinish}
                >
                    <div className="text-center mb-10">
                        <h1 style={{ fontSize: "30px", color: "#494949", textAlign: "center" }}>Forget Password?</h1>
                        <p>Please enter your email to get verification code</p>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                        <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}> Email Address</label>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            name="email"
                            id="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your email!",
                                },
                            ]}
                        >
                            <Input
                                placeholder="esteban_schiller@gmail.com"
                                type="email"
                                style={{
                                    border: "1px solid #E0E4EC",
                                    height: "52px",
                                    background: "white",
                                    borderRadius: "8px",
                                    outline: "none",
                                }}

                            />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Link to={'/verify'}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button rounded-3xl"
                            block
                            style={{
                                height: "45px",
                                fontWeight: "400px",
                                fontSize: "18px",
                                background: "#2E4CB9",
                                color: "white",
                                alignSelf: "bottom",
                                marginTop: "30px",
                            }}
                        >
                            <button
                                className="login-form-forgot "
                                style={{ color: "#FFF" }}
                           
                            >
                                Countinue
                            </button>

                        </Button></Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
  );
};

export default ForgetPass;
