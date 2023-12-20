import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import {Avatar, Button, Card, Col, Descriptions,Divider,Row,Tag,Typography} from "antd";
import { useNavigate,useLocation } from "react-router-dom";


const {Title} = Typography;




function CandidateCard({contestant}){
    const navigate = useNavigate();

    return(
        <>
            
            <Col xs={24} md={8} style={{marginBlock:"0.5em"}}>
                <Card hoverable style={{
                    height:"30vh",
                    width:"30vw",
                    display:"flex",
                    flexDirection:"row"
                }}>
                    <div>
                        <Avatar icon={<UserOutlined style={{fontSize:30}}/>}/>
                    </div>
                    <div>
                        <Descriptions column={1}>
                            <Descriptions.Item label="contestnat name">
                                {contestant.fullname}
                            </Descriptions.Item>
                            <Descriptions.Item label="name">
                               <Tag color="blue">{contestant.party}</Tag>
                            </Descriptions.Item>
                        </Descriptions>
                        <Button onClick={()=>navigate("/vote",{state:contestant})} type="primary" style={{backgroundColor:"green"}}>
                            Vote
                        </Button>
                    </div>
                </Card>
            </Col>
        </>
    )
}


export default function VoteDetails(){

    const navigate = useNavigate()
    const {state:election} = useLocation();
    const candidates = JSON.parse(election.contestants);

    return(
        <>
            <Button type="text" onClick={()=>navigate("/")}>
                <ArrowLeftOutlined style={{fontWeight:"bolder",fontSize:20}}/>
            </Button>
                <div style={{
                    height:"30vh",
                    width:"30vw",
                    marginLeft:"2em",
                    marginBlock:"1em"
                }}>
                    <Descriptions column={1} layout="horizontal">
                        <Descriptions.Item  label={<Title level={3}>Title</Title>}>
                            <Title level={3}>{election.title}</Title>
                        </Descriptions.Item>
                        <Descriptions.Item label={<Title level={3}>Time</Title>}>
                         <Title level={3}>{election.commencement}</Title>
                        </Descriptions.Item >
                        <Descriptions.Item label={<Title level={3}>Status</Title>}>
                          <Tag color="green">{election.status}</Tag>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <Divider orientation="left">SELECT YOUR CANDIDATE</Divider>
                <div style={{
                    paddingInline:"2em"
                }}>
                    <Row gutter={6}>
                        {
                            candidates.map((c,idx)=>(
                                <CandidateCard key={idx} contestant={c}/>
                            ))
                        }
                    </Row>
                </div>
        </>
    )
}