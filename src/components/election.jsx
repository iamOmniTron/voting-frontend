import { Button, Card, Col, Row,Typography } from "antd";
import {PicCenterOutlined,ClockCircleFilled} from "@ant-design/icons"
import { useNavigate } from "react-router-dom";


const {Text,Title} = Typography;

export default function ElectionCard({election}){

    const navigate = useNavigate()

    return(
        <>
            <Col span={8} xs={24} md={8} style={{marginBlock:"0.5em"}}>
                <Card hoverable style={{
                    height:"30vh",
                    backgroundColor:"#df1c0d"
                }}>
                    <div style={{
                        height:"20vh",
                        color:"white"
                    }}>
                        <div style={{display:"flex",gap:"1em"}}>
                            <PicCenterOutlined/>
                            <Title style={{color:"white"}} level={4}>
                                {election.title}
                            </Title>
                        </div>
                        <div style={{display:"flex",gap:"1em"}}>
                            <ClockCircleFilled/>
                            <Title style={{color:"white"}} level={4}>
                                {election.commencement}
                            </Title>
                        </div>
                    </div>
                    <Row gutter={12}>
                            {/* {
                                election.status === "ended" &&  */}
                        <Col span={24}>
                            <Button type="primary" onClick={()=>navigate("/result",{state:election})}>
                                View Results
                            </Button>
                        </Col>
                            {/*  } */}
                            {/* {
                                election.status === "ongoing" &&  */}
                            <Col span={24}>
                                <Button type="primary" style={{backgroundColor:"green"}} onClick={()=>navigate("/vote-details",{state:election})}>
                                    Vote
                                </Button>
                            </Col>
                            {/* } */}
                            {/* {
                                election.status === "pending" && */}
                        <Col span={24}>
                            <Text style={{color:"white"}}>
                               Awaiting commencement...
                            </Text>
                        </Col>
                            {/* } */}
                    </Row>
                </Card>
            </Col>
        </>
    )
}