import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";

const constraints = {
    width: 250,
    height: 250,
    facingMode: "user"
};
    
const WebCam = (props) => {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null)
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
        let formdata = new FormData();
        formdata.append("profile_pic", dp);
        const response = await fetch("api/newpat/?patid="+props.patientID, {
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
            // toast.success("Uploaded Profile Picture", {
            //     position: "top-center",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
        }
    }
    
    return (
        <div style={{width: 290, height: 290, border: '1.5px solid black', borderRadius: 5, textAlign:'center'}}>
            <Webcam
                audio={false}
                height={250}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={250}
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>CAPTURE</button>
            {imageSrc!==null  && <button>CONFIRM</button>}
            {/* <button onClick={() => {
                if(videoConstraints.facingMode==="user"){
                    setVideoConstraints({
                        ...videoConstraints,
                        facingMode: { exact: "environment" }
                    })
                }
            }}>SWITCH</button> */}
        </div>
    );
}; 

export default WebCam