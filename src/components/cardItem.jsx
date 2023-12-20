import {Col,Row,Card,Typography} from "antd";
import { Link } from "react-router-dom";
import {SyncOutlined} from "@ant-design/icons"
const {Title} = Typography


export default function CardItem(props){
    const {title,icon,link,color} = props;
    return(
        <>
           <Col span={12} style={{
                        height:"100%",
                    }}>
                        <Link to={link}>
                            <Card style={{
                            backgroundColor:color,
                            height:"100%"
                        }}>
                            <Row style={{
                                height:"100%"
                            }}>
                                <Col span={20} style={{
                                height:"100%",
                                display:"flex",
                                alignItems:"space-between",
                                flexDirection:"column",
                                color:"white"
                            }}>
                                {icon}
                                <Title level={2} style={{color:"white"}}>
                                    {title}
                                </Title>
                                </Col>
                                <Col span={4} style={{
                                height:"100%"
                            }}>
                                <SyncOutlined spin style={{color:"white",fontSize:20}}/>
                                </Col>
                            </Row>
                            </Card>
                        </Link>
                    </Col>
        </>
    )
}