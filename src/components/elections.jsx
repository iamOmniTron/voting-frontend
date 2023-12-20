import { Row } from "antd";
import ElectionCard from "./election";
import { useElections } from "../hooks/election";


export default function ElectionsContainer(){

    const {elections} = useElections();


    return(
        <>
            <div style={{
                hieght:"100%",
                padding:"1em"
            }}>
                <Row gutter={12}>
                    {
                        elections.map((e,idx)=>(
                            <ElectionCard election={e} key={idx}/>
                        ))
                    }
                </Row>
            </div>
        </>
    )
}