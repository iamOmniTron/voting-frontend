import {Avatar, Button, Card,Divider,Form,Input,Typography,message} from "antd"
import { useRef, useState } from "react";
import { useAdminLogin } from "../../hooks/auth";
import { AUTH_TOKEN_NAME } from "../../utils/defaults";
import { extractValueFromInputRef } from "../../utils/helpers";
import { getUserProfile,userStore } from "../../store/userStore";
import {useNavigate} from "react-router-dom";

const {Title,Text} = Typography;



export default function Login(){
    const [loading,setLoading] = useState(false);

    const setUser = userStore(state=>state.setUser);
    const loginAdmin = useAdminLogin();
    const navigate = useNavigate()

    const emailRef = useRef(null);
    const passwordRef = useRef(null)


    const handleSubmit = async ()=>{
        setLoading(true)
        const payload = {
            email:extractValueFromInputRef(emailRef),
            password:extractValueFromInputRef(passwordRef)
        }
        const token = await loginAdmin(payload);
        if(!token) {
            message.error("cannot log in admin");
            setLoading(false);
            return;
        };
        sessionStorage.setItem(AUTH_TOKEN_NAME,token);
        const loggedUser = await getUserProfile();
        if(!loggedUser){
            setLoading(false);
            return;
        }
        message.success("login successful")
        setUser({...loggedUser});
        setTimeout(()=>{
            message.success("redirecting to dashboard...");
            return navigate("/admin/")
        },1000)
    }
    return(
        <>
            <div style={{
                height:"100vh",
                width:"100vw",
                backgroundColor:"lightgray",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center"
            }}>
                <Avatar src={"/finger.png"} size={120} style={{
                    marginBottom:"2em"
                }}/>
                <Card style={{
                    height:"50vh",
                    width:"30vw",
                }}>
                        <Title level={3} style={{textAlign:"center"}}>
                            ADMINISTRATOR LOGIN
                        </Title>
                        <Divider/>
                        <Form>
                            <Form.Item>
                                <Input ref={emailRef} placeholder="Enter Admin email"/>
                            </Form.Item>
                            <Form.Item>
                                <Input.Password ref={passwordRef} placeholder="Enter Password"/>
                            </Form.Item>
                            <Form.Item>
                                <Button onClick={handleSubmit} loading={loading} block type="primary" style={{backgroundColor:"#df1c0d"}}>
                                    LOGIN
                                </Button>
                            </Form.Item>
                        </Form>
                </Card>
                <Text style={{marginTop:"auto"}}>
                    E-Voting System 2023-2024
                </Text>
            </div>
        </>
    )
}