import { ArrowLeftOutlined, CheckCircleFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Modal } from "antd";
import { useState } from "react";
import { MdFingerprint } from "react-icons/md";
import { useNavigate,useLocation } from "react-router-dom";





export default function  Vote(){
    const navigate = useNavigate()

    const {state:contestant} = useLocation()

    const [isOpen,setIsOpen] = useState(false);
    const [isValid,setIsValid] = useState(false)


    return(
        <>
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100%",
            width:"100%"
        }}>
            <Card style={{
                height:"60vh",
                width:"60vw",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                gap:"2em"
            }}>
                <Avatar icon={<UserOutlined/>} size={220} style={{display:"block",textAlign:"center"}}/>
                <div style={{display:"flex", gap:"1em",marginTop:"1em"}}>
                    <Button size="large" danger type="primary" onClick={()=>navigate(-1)} icon={<ArrowLeftOutlined/>}>
                        Go Back
                    </Button>
                <Button onClick={()=>setIsOpen(true)} type="primary" style={{backgroundColor:"green"}} size="large" icon={<MdFingerprint/>}>
                    Vote for {contestant.fullname}
                </Button>
                </div>
            </Card>
        </div>

        <Modal title={"Thumbprint to vote"} open={isOpen} footer={null} onCancel={()=>setIsOpen(false)}>
            <div style={{
                height:"20vh",
                textAlign:"center"
            }}>
                <Avatar style={{backgroundColor:"white"}} icon={<CheckCircleFilled style={{color:"green",fontSize:70}}/>} size={100}/>
            </div>
            <div>
                <Button disabled={!isValid} block type="primary" style={{backgroundColor:"green"}}>
                    Confirm Vote
                </Button>
            </div>
        </Modal>
        </>
    )
}