import { Button, Layout,Menu,Typography,message } from "antd"
import { Link,Outlet, useNavigate } from "react-router-dom";
import {UserAddOutlined, UserOutlined,FileExcelOutlined,  DashboardOutlined, ArrowLeftOutlined} from "@ant-design/icons"
import { AUTH_TOKEN_NAME } from "../../utils/defaults";
import { userStore } from "../../store/userStore";


const {Sider,Header,Content} = Layout;
const {Title} = Typography





export default function AdminDashboardLayout(){

    const logout = userStore(state=>state.logout);
    const navigate = useNavigate();
    
    const handleLogout = ()=>{
        sessionStorage.removeItem(AUTH_TOKEN_NAME);
        logout();
        message.success("Logout successful");
        navigate("/login")
    }
    
    
    const SIDEBAR_MENU_ITEMS = [
        {
            key:"dashboard",
            label:<Link to="/admin">Dashboard</Link>,
            icon:<DashboardOutlined/>
        },
        {
            key:"users",
            label:<Link to="/admin/users">Users</Link>,
            icon:<UserOutlined/>
        },
        {
            key:"election",
            label:<Link to="/admin/election">Election</Link>,
            icon:<UserAddOutlined/>
        },
        {
            key:"results",
            label:<Link to="/admin/results">Results</Link>,
            icon:<FileExcelOutlined/>
        },
        {
            key:"configurations",
            label:<Button onClick={handleLogout} type="text" style={{color:"white"}}>Logout</Button>,
            icon:<ArrowLeftOutlined/>
        }
    ]
    return(
        <>
            <Layout>
                <Header  style={{
                        height:"5em",
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor:"white",
                        borderBottom:"1px solid white",
                        justifyContent:"space-between"
                        }}>
                    <Title level={3}>
                        ADMINISTRATOR
                    </Title>
                </Header>
                <Layout>
                    <Sider width={300}
                        style={{
                            backgroundColor:"#df1c0d"
                        }}>
                            <Menu
                            mode="inline"
                            style={{
                            height: '90vh',
                            overflowY:"scroll",
                            borderRight: 0,
                            backgroundColor:"#df1c0d",
                            color:"white"
                            }}
                            items={SIDEBAR_MENU_ITEMS}
                        />
                    </Sider>
                            <Layout
                style={{
                    padding: '0 0 0 12px',
                }}
                >
                    <Content
                    style={{
                    padding: 24,
                    margin: 0,
                    height: "calc(100vh - 5em)",
                    background: "rgba(0,0,0,0.02)",
                    overflowY:"scroll"
                    }}
                >
                    <Outlet/>
                </Content>
                </Layout>
                </Layout>
            </Layout>
        </>
    )
}