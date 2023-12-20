import { Button, Card, Form, Input, Typography,Modal, Avatar } from "antd";
import { MdFingerprint } from "react-icons/md";
import { useEffect, useState } from "react";
import FingerprintController from "../../utils/fingerprint";

const {Title} = Typography;



export default function LoginUser(){
    const [isOpen,setIsOpen] = useState(false);
    const fingerprintController = new FingerprintController();

    useEffect(()=>{
        fingerprintController.init();
        console.log("here")
        return ()=>fingerprintController.destroy();
    },[])

    return(
        <>
            <div style={{
                height:"100vh",
                width:"100vw",
                backgroundColor:"lightgray",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column"
            }}>
                <Title level={3} style={{fontSize:"bold"}}>
                    E-VOTING SYSTEM
                </Title>
                <Title level={4} style={{fontSize:"bold"}}>
                    User Login
                </Title>
                <Card style={{
                    height:"25vh",
                    width:"30vw"
                }}>
                    <Form>
                        <Form.Item>
                            <Input size="large" placeholder="Enter your e-mail address"/>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={()=>setIsOpen(true)} icon={<MdFingerprint style={{fontSize:24,display:"flex",alignItems:"center"}}/>} size="large" danger block type="primary">
                                Click to Scan Fingerprint
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            <Modal onCancel={()=>setIsOpen(false)} open={isOpen} footer={null} >
                <Card style={{
                    height:"20vh",
                    width:"100%",
                    marginBlock:"1em",
                    textAlign:"center"
                }}>
                    <Avatar icon={<MdFingerprint/>} size={100}/>
                </Card>
                <Button block type="primary" style={{backgroundColor:"green"}}>
                    Login
                </Button>
            </Modal>
        </>
    )
}