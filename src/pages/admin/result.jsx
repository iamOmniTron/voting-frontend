import { Typography,Breadcrumb,Spin, Tag } from "antd"
import { DashboardOutlined,FileExcelOutlined } from "@ant-design/icons";
import DataTable from "../../components/table";
import { useElections } from "../../hooks/election";

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
                <FileExcelOutlined/>
                Results
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
        title:"Election End Date",
        key:"date",
        dataIndex:"commencement"
    },
    {
        title:"Status",
        key:"status",
        dataIndex:"status",
        render:(s)=><Tag color="blue">{s}</Tag>
    },
    {
        title:"Total Contestants",
        key:"contestants",
        render:(_,e)=>{
            const ctns = JSON.parse(e.contestants);
            return ctns.length;
        }
    },
    {
        title:"Winner",
        key:"winner",
        dataIndex:"winner",
        render:(w)=>w??"Results Unavailable"
    }
]


export default function Results(){

    const {loading,elections} = useElections();


    return(
        <>
              <div style={{height:"3em",backgroundColor:"white",padding:"1em",margin:"2em 0"}}>
                <Breadcrumb items={BREADCRUMB_ITEMS}/>
            </div>
            <div style={{padding:"0 1em",display:"flex",justifyContent:"space-between"}}>
                <Title level={3}>
                    ELECTIONS RESULT
                </Title>
                <div>
                </div>
            </div>
            <div>
                <Spin spinning={loading}>
                    <DataTable data={elections} cols={COLUMNS}/>
                </Spin>
            </div>
        </>
    )
}