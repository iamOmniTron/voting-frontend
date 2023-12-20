import { Avatar, Layout,Typography } from "antd"
import {UserOutlined} from "@ant-design/icons"
import ElectionsContainer from "../../components/elections";
import { Outlet } from "react-router-dom";
import { userStore } from "../../store/userStore";

const {Header,Content} = Layout;
const {Title} = Typography;

export default function Home(){

    const user = userStore(state=>state.user);

    return(
        <>
            <div style={{
                height:"100vh",
                width:"100vw",
            }}>
                <Layout>
                    <Header style={{
                        display:"flex",
                        alignItems:"center",
                        gap:"1em",
                        height:"10vh"
                    }}>
                        <Avatar icon={<UserOutlined/>} size={50}/>
                        <Title style={{color:"white"}} level={4}>{user.name}</Title>
                    </Header>
                    <Content style={{
                        backgroundColor:"lightgray",
                        height:"90vh",
                        overflowY:"scroll"
                    }}>
                        <Outlet/>
                    </Content>
                </Layout>
            </div>
        </>
    )
}