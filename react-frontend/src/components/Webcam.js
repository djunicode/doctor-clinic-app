import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const constraints = {
    width: 250,
    height: 250,
    facingMode: "user"
};
    
const WebCam = (props) => {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null)
    const [activityIndicator, setActivityIndicator] = useState(false)
    const [videoConstraints, setVideoConstraints] = useState(constraints)
    
    const capture = useCallback(
        () => {
            let image = webcamRef.current.getScreenshot()
            setImageSrc(image);
            props.demo(image)
        },
        [webcamRef]
    );

    const uploadDp = async(dp) => {
        setActivityIndicator(true)
        let formdata = new FormData();
        formdata.append("profile_pic", dp);
        try{
            const response = await fetch(props.url+props.ID, {
                method: "PUT",
                headers: {
                    'Authorization': props.token
                },
                body: formdata,
            })
            // console.log(await response.text())
            const resData = await response.json()
            console.log(resData)
            if(resData.updated){
                toast.success("Uploaded Profile Picture", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                props.closeCamera(true)
            }
            else{
                alert("Something went wrong")
            }
        }
        catch(err){
            console.log(err)
            alert("Something went wrong")
        }
        setActivityIndicator(false)
    }
    
    return (
        <div style={{width: 290, height: 310, border: '1.5px solid black', borderRadius: 5, textAlign:'center', backgroundColor: 'white'}}>
            {activityIndicator && <LinearProgress />}
            <ClearIcon onClick={() => props.closeCamera(false)} style={{position: 'absolute', right: 10, top: 10, cursor: 'pointer', color:'white'}} />
            <Webcam
                audio={false}
                height={250}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={250}
                videoConstraints={videoConstraints}
                style={{marginTop: 10}}
            />
            <Button className="defred" variant="contained" color="secondary" style={{marginRight: 5}} onClick={capture}>CAPTURE</Button>
            {imageSrc!==null  && <Button className="defred" variant="contained" color="secondary" style={{marginLeft: 5}} onClick={() => {
                uploadDp(imageSrc)
            }}>CONFIRM</Button>}
            {/* <button onClick={() => {
                if(videoConstraints.facingMode==="user"){
                    setVideoConstraints({
                        ...videoConstraints,
                        facingMode: { exact: "environment" }
                    })
                }
            }}>SWITCH</button> */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </div>
    );
}; 

export default WebCam