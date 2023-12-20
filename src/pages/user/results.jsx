import { Divider, Spin } from "antd";
import DataTable from "../../components/table";
import { useLocation } from "react-router-dom";



const COLS = [
    {
        title:"S/N",
        key:"s/n",
        render:(_,__,idx)=>idx+1
    },
    {
        title:"Candidate Name",
        key:"name",
        dataIndex:"name"
    },
    {
        title:"Votes Acquired",
        key:"votes",
        dataIndex:"votes"
    },
    {
        title:"Position",
        key:"position",
        render:(_,__,i)=>i+1
    }
]





export default function ElectionResult(){

    const {state:election} = useLocation();

    return(
        <>
            <div style={{
                paddingInline:"1em"
            }}>
                <div>
                    <Divider orientation="left">
                        ELECTION RESULTS FOR {(election.title).toUpperCase()}
                    </Divider>
                </div>

                <div>
                    <Spin spinning={false}>
                        <DataTable cols={COLS}/>
                    </Spin>
                </div>
            </div>
        </>
    )
}