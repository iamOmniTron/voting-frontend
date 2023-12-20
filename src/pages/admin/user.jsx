import { Breadcrumb,Typography,Button,Spin, Modal, Form, Input, Select,Card,message, Space } from "antd";
import { DashboardOutlined,UserOutlined,PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import DataTable from "../../components/table";
import { useRef, useState } from "react";
import { useCreateUser, useDeleteUser, useUsers } from "../../hooks/user";
import { extractValueFromInputRef } from "../../utils/helpers";




const COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Fullname",
        key:"name",
        dataIndex:"name",
    },
    {
        title:"E-Mail",
        key:"email",
        dataIndex:"email",
    },
    {
        title:"Phone number",
        key:"phone",
        dataIndex:"phone"
    },
    {
        title:"Gender",
        key:"gender",
        dataIndex:"gender",
    },
    {
        title:"Admin",
        key:"admin",
        dataIndex:"isAdmin",
        render:(a)=> a === true? "Yes":"No"
    },
    {
        title:"Actions",
        key:"action",
        render:(_,user)=><UserEdit user={user}/>
    }
]


const BREADCRUMB_ITEMS = [
    {
        key:"1",
        title:(
            <>
            <DashboardOutlined/>
            Dashboard
            </>
        )
    },
    {
        key:"2",
        title:(
            <>
                <UserOutlined/>
                Users
            </>
        )
    }
];

function UserEdit({user}){

    const deleteUser = useDeleteUser();

    const handleDelete = async ()=>{
        await deleteUser(user.id);
        message.success("user deleted successfully")
    }

    return(
        <>
            <Space>
                <Button type="primary" danger icon={<DeleteOutlined/>} onClick={handleDelete}/>
            </Space>
        </>
    )
}


const {Title} = Typography;
const {Option} = Select;

export default function Users(){

    const [isOpen,setIsOpen] = useState(false);
    const [isCaptureOpen,setIsCaptureOpen] = useState(false);
    const [gender,setGender] = useState("male");

    const createUser = useCreateUser();
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);

    const {users,loading} = useUsers()


    const handleSubmit = async ()=>{
        const payload = {
            name:extractValueFromInputRef(nameRef),
            email:extractValueFromInputRef(emailRef),
            phone:extractValueFromInputRef(phoneRef),
            gender,
        }
        await createUser(payload);
        message.success("user created successfully")
        setIsOpen(false);
        setIsCaptureOpen(false);
    }


    return (
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    USERS
                </Title>
                <div>
                <Button onClick={()=>setIsOpen(true)} type="primary" style={{backgroundColor:"green"}} icon={<PlusOutlined/>}>
                    Add User
                </Button>
                </div>
            </div>
            <div>
            <Spin spinning={loading}>
                <DataTable data={users} cols={COLS}/>
            </Spin>
        </div>
        <Modal footer={null} title="Add new User" open={isOpen} onCancel={()=>setIsOpen(false)}>
            <Form>
                <Form.Item>
                    <Input ref={nameRef} placeholder="Enter fullname"/>
                </Form.Item>
                <Form.Item>
                    <Input ref={emailRef} placeholder="Enter email"/>
                </Form.Item>
                <Form.Item>
                    <Input ref={phoneRef} placeholder="Enter phone number"/>
                </Form.Item>
                <Form.Item>
                    <Select placeholder="Select Gender" onChange={(e)=>setGender(e)}>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                    </Select>
                </Form.Item>
                <Button type="primary" style={{backgroundColor:"green"}} onClick={()=>setIsCaptureOpen(true )}>
                    Bio-metric Capture
                </Button>
            </Form>
        </Modal>
        <Modal footer={null} open={isCaptureOpen} onCancel={()=>setIsCaptureOpen(false)} title="capture fingerprint">
            <Card style={{
                height:"20vh",
                width:"100%"
            }}>
            </Card>
            <div style={{
                display:"flex",
                justifyContent:"flex-end",
                gap:"1em",
                marginTop:"2em"
            }}>
            <Button type="primary" onClick={handleSubmit}>
                Confirm
            </Button>
            <Button danger type="primary">
                Reset
            </Button>
            </div>
        </Modal>
        </>
    )
}