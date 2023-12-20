import { Typography,Breadcrumb,Spin,Button, Modal, Form, Input, DatePicker, Row, Col,Space,message, Tag } from "antd"
import { DashboardOutlined,PlusOutlined,MedicineBoxOutlined,MinusCircleOutlined } from "@ant-design/icons";
import DataTable from "../../components/table";
import { useRef, useState } from "react";
import { useCreateElection, useElections } from "../../hooks/election";
import { extractValueFromInputRef } from "../../utils/helpers";

const {Title} = Typography;


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
                <MedicineBoxOutlined/>
                Election
            </>
        )
    }
];

const COLUMNS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Title",
        key:"title",
        dataIndex:"title"
    },
    {
        title:"Election Date",
        key:"date",
        dataIndex:"commencement",
    },
    {
        title:"Status",
        key:"status",
        dataIndex:"status"
    },
    {
        title:"Winner",
        key:"winner",
        dataIndex:"winner",
        render:(w)=> w?? <Tag color="yellow">No Winner Yet</Tag>
    }
];

const CONTESTANTS_COLUMNS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Fullname",
        key:"name",
        dataIndex:"fullname"
    },
    {
        title:"Party",
        key:"party",
        dataIndex:"party"
    }
]


export default function Election(){

    const [isOpen,setIsOpen] = useState(false);
    const [contestants,setContestants] = useState([]);
    const [currItem,setCurrItem] = useState({});
    const [start,setStart] = useState(null);
    const [end,setEnd] = useState(null);


    function addItem(callback1,callback2){
        setContestants((prev)=>{
            return [...prev,currItem]
        });
        setCurrItem({});
        callback1()
        callback2();
    }

    const titleRef = useRef(null);


    const createElection = useCreateElection();
    const {loading,elections} = useElections();


    const handleSubmit = async ()=>{
        const payload = {
            title:extractValueFromInputRef(titleRef),
            commencement:start,
            endDate:end,
            contestants: JSON.stringify(contestants)
        };
        await createElection(payload);
        message.success("Election created successfully");
        setIsOpen(false)
    }

    return(
        <>
              <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    MANAGE ELECTION
                </Title>
                <div>
                <Button onClick={()=>setIsOpen(true)} type="primary" style={{backgroundColor:"green"}} icon={<PlusOutlined/>}>
                    Add Election
                </Button>
                </div>
            </div>
            <div>
                <Spin spinning={loading}>
                    <DataTable data={elections} cols={COLUMNS}/>
                </Spin>
            </div>
            <Modal title="Add Election" footer={null} open={isOpen} onCancel={()=>setIsOpen(false)}>
                <Form>
                    <Form.Item>
                        <Input ref={titleRef} placeholder="Enter Title"/>
                    </Form.Item>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item>
                                <DatePicker onChange={(_,v)=>setStart(v)} style={{width:"100%"}} picker="date" placeholder="Enter Commencement date"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item>
                                <DatePicker onChange={(_,v)=>setEnd(v)} style={{width:"100%"}} picker="date" placeholder="Enter End date"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div>
                        <b>Contestants:</b>
                    </div>
                    <DataTable data={contestants} cols={CONTESTANTS_COLUMNS}/>
                    {/* START */}
                    <Form.List name="items" style={{width:'100%'}}>
                    {(fields, { add, remove }) => (
                        <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space
                            key={key}
                            style={{
                                display: 'flex',
                                alignItems:'center',
                                marginBottom: 8,
                                width:'100%',
                                marginTop:"1em"
                            }}
                            align="baseline"
                            >
                            <Form.Item
                                {...restField}
                                name={[name, 'Item']}
                                rules={[
                                {
                                    required: true,
                                    message: 'Missing Contestant Name',
                                },
                                ]}
                            >
                                <Input placeholder="Enter contestant fullname" onChange={(e)=>setCurrItem((prev)=>({...prev,fullname:e.target.value}))}/>
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'Party']}
                                rules={[
                                {
                                    required: true,
                                    message: 'Missing Contestant Party',
                                },
                                ]}
                            >
                                <Input placeholder="Enter contestant party" onChange={(e)=>setCurrItem((prev)=>({...prev,party:e.target.value}))}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" style={{backgroundColor:"green"}} onClick={()=>addItem(()=>remove(name),add)}>
                                    Add Item
                                </Button>
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} style={{marginBottom:"2em"}}/>
                            </Space>
                        ))}
                        <Form.Item style={{marginTop:"1em"}}>
                            <Button block style={{backgroundColor:"green"}} type="primary" onClick={() => add()} icon={<PlusOutlined />}>
                            { contestants.length < 1 ? 'Add Contestant' : 'Add Another Contestant'}
                            </Button>
                        </Form.Item>
                        </>
                    )}
                    </Form.List>
                    {/* END */}
                    <Form.Item>
                        <Button onClick={handleSubmit} size="large" type="primary">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}