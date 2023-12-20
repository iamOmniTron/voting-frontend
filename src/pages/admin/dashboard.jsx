import { Breadcrumb,Row,Typography,Spin } from "antd";
import {DashboardOutlined,UserOutlined, MedicineBoxOutlined} from "@ant-design/icons"
import CardItem from "../../components/cardItem";
import DataTable from "../../components/table";
import { useUsers } from "../../hooks/user";


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
];


const COLUMNS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        key:"fullname",
        title:"Fullname",
        dataIndex:"name"
    },
    {
        key:"phone",
        title:"Phone",
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
]

const {Title} = Typography;




export default function AdminDashboard(){

    const {loading,users} = useUsers();

    return(
        <>
            <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",height:"20vh"}}>
                <Row style={{height:"100%"}} gutter={16}>
                    <CardItem link={"/admin/election"} color={"orange"} title={"Election"} icon={<MedicineBoxOutlined style={{
                        fontSize:30
                    }}/>}/>
                    <CardItem link={"/admin/users"} color={"orange"} title={"Users"} icon={<UserOutlined style={{
                        fontSize:30
                    }}/>}/>
                </Row>
            </div>
            <div style={{
                marginTop:"3em"
            }}>
                <Title level={3}>
                    REGISTERED USERS
                </Title>
                <Spin spinning={loading}>
                    <DataTable data={users} cols={COLUMNS}/>
                </Spin>
            </div>
        </>
    )
}