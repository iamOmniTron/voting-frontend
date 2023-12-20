import {FingerprintReader,SampleFormat} from "@digitalpersona/devices"




export default class FingerprintController{
     reader;

    async init(){
        this.reader = new FingerprintReader();
        this.reader.on("DeviceConnected",this.onDeviceConnected);
        this.reader.on("DeviceDisconnected",this.onDeviceDisconnected);
        this.reader.on("QualityReported",this.onQualityReported);
        this.reader.on("SamplesAcquired",this.onSamplesAcquired);
        this.reader.on("ErrorOccured",this.onErrorOccured);

        try {
            await this.reader.startAcquisition(SampleFormat.Intermediate);
        } catch (error) {
            console.log(error)
            throw new Error(error.message)
        }
     }

    onDeviceConnected = ()=>{
        console.log("Device connected successfully")
    }

    onDeviceDisconnected = ()=>{
        console.log("Device disconnected successfully")
    }

    onQualityReported = (e)=>{
        console.log(e)
    }

    onSamplesAcquired = (e)=>{
        console.log(e.samples)
    }

    onErrorOccured = (e)=>{
        console.log("An error occured",e)
    }


    destroy(){
        this.reader.off;
        delete this.reader;
    }

}