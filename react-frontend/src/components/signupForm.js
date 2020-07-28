import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../views/doctorSignup.css';

const SignupForm = (props) => {
    const [firstname, setFirstname] = useState(props.values.firstname);
    const [lastname, setLastname] = useState(props.values.lastname);
    const [username,setUsername] = useState(props.values.username)
    const [password1,setPassword1] = useState(props.values.password1)
    const [password2,setPassword2] = useState(props.values.password2)
    const [qualification,setQualification] = useState(props.values.qualification)
    const [speciality,setSpeciality] = useState(props.values.speciality)
    const [postgrad,setPostgraduation] = useState(props.values.postgrad)
    const [email,setEmail] = useState(props.values.email)
    const [DOB,setDOB] = useState(props.values.DOB)
    const [phone, setPhone] = useState(props.values.phone);
    const [dailyTime, setDailyTime] = useState(props.values.dailyTime);
    const [endTime, setEndTime] = useState(props.values.endTime);

    const today = () => {
        let dt = new Date()
        return dt.getMonth() + "-" + dt.getDate() + "-" + dt.getFullYear() 
    }

    const signUp = async(e) => {
        e.preventDefault()
        if(username==="" || password1==="" || password2==="" || email==="" || qualification==="" || postgrad==="" || speciality===""){
            alert("Fill in all fields")
        }
        else if(password1!==password2){
            alert("Passwords do not match")
        }
        else{
            let formdata = new FormData()
            if(props.method==="POST"){
                formdata.append("username",username)
                formdata.append("password",password1)
                formdata.append("password2",password2)
            }
            formdata.append("Postgrad",postgrad)
            formdata.append("Specialization",speciality)
            formdata.append("Degrees",qualification)
            formdata.append("email",email)
            formdata.append("DOB",DOB)
            formdata.append("first_name",firstname)
            formdata.append("last_name",lastname)
            formdata.append("contact_no",phone)
            formdata.append("daily_start_time",dailyTime)
            formdata.append("daily_end_time",endTime)
            //DOB, 'first_name','last_name','contact_no', daily_start_time, daily_end_time
            try{
                props.activity(true);
                const response = await fetch(props.url, {
                    method: props.method,
                    headers: {
                        //'Content-Type': 'application/json',
                        'Authorization': props.token
                    },
                    body: formdata
                })
                // console.log(await response.text())
                const resData = await response.json()
                console.log(resData)
                if(resData.added || resData.updated){
                    toast.success(props.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                props.activity(false);
                props.addDoctor(resData.Doctor)
            }
            catch(err){
                console.log(err);
                props.activity(false)
            }
        }
    }
    return(
        <form className="form" style={{overflowY: (props.method==="PUT" && 'scroll'), height: (props.method==="PUT" && '95%')}}>
            <Grid container className="gridContainer">
                <Grid
                    className="fields-container"
                    container
                    item
                    lg={6}
                    sm={8}
                    xs={12}
                >
                    <div className="fields-inner-container ">
                        <TextField
                            required
                            className="fields1"
                            id="outlined-basic"
                            label="First Name"
                            defaultValue={firstname}
                            onChange={(event) => setFirstname(event.target.value)}
                            variant="outlined"
                        />
                    </div>
                </Grid>
                <Grid
                    className="fields-container"
                    container
                    item
                    lg={6}
                    sm={8}
                    xs={12}
                >
                    <div className="fields-inner-container  ">
                        <TextField
                            required
                            type="text"
                            className="fields1"
                            id="outlined-basic"
                            label="Last Name"
                            defaultValue={lastname}
                            onChange={(event) => setLastname(event.target.value)}
                            variant="outlined"
                        />
                    </div>
                </Grid>
                {props.method==="POST" && <Grid className="fields-container" container item sm={6} xs={12} >
                    <div className="fields-inner-container">
                        <TextField required className="fields1" id="outlined-basic" label="Username" onChange={(event)=>setUsername(event.target.value)} variant="outlined"/>
                    </div>
                </Grid>}
                <Grid className="fields-container" container item sm={6} xs={12}>
                    <div className="fields-inner-container">
                        <TextField required type="email" className="fields1" id="outlined-basic" label="Email-ID" defaultValue={email} onChange={(event)=>setEmail(event.target.value)} variant="outlined"/>
                    </div>
                </Grid>
                <Grid
                    className="fields-container"
                    container
                    item
                    lg={6}
                    sm={8}
                    xs={12}
                >
                    <div className="fields-inner-container">
                        <TextField
                            required
                            className="fields1"
                            id="outlined-basic"
                            label="Phone"
                            defaultValue={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            type="Number"
                            variant="outlined"
                        />
                    </div>
                </Grid>
                {props.method==="POST" && <> <Grid className="fields-container" container item sm={6} xs={12}>
                    <div className="fields-inner-container">
                        <TextField required className="fields1" id="outlined-basic" label="Password" type="Password" onChange={(event)=>setPassword1(event.target.value)} variant="outlined" />
                    </div>
                </Grid>
                <Grid className="fields-container" container item sm={6} xs={12}>
                    <div className="fields-inner-container">
                        <TextField required className="fields1" id="outlined-basic" label="Re-enter Password" type="Password" onChange={(event)=>setPassword2(event.target.value)} variant="outlined" />
                    </div>
                </Grid> </>}
                <Grid
                    className="fields-container"
                    container
                    item
                    lg={6}
                    sm={8}
                    xs={12}
                >
                    <div className="fields-inner-container">
                        <TextField
                        id="date"
                        label="Date of Birth"
                        type="date"
                        defaultValue={today()}
                        style={{ width: 230 }}
                        defaultValue={DOB}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => setDOB(event.target.value)}
                        />
                    </div>
                </Grid>
                <Grid
                    className="fields-container"
                    container
                    item
                    lg={6}
                    sm={8}
                    xs={12}
                >
                    <div className="fields-inner-container">
                        <TextField
                            id="time"
                            label="Daily Start Time"
                            type="time"
                            // defaultValue={today()}
                            style={{ width: 230 }}
                            defaultValue={dailyTime}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => setDailyTime(event.target.value+":00")}
                        />
                    </div>
                </Grid>
                <Grid
                    className="fields-container"
                    container
                    item
                    lg={6}
                    sm={8}
                    xs={12}
                >
                    <div className="fields-inner-container">
                        <TextField
                        id="time"
                        label="Daily End Time"
                        type="time"
                        // defaultValue={today()}
                        style={{ width: 230 }}
                        defaultValue={endTime}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => setEndTime(event.target.value+":00")}
                        />
                    </div>
                </Grid>
                <Grid className="fields-container" container item sm={6} xs={12}>
                    <div className="fields-inner-container">
                        <FormControl variant="outlined" >
                            <InputLabel id="demo-simple-select-outlined-label">
                                Qualification*
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                className="fields1"
                                id="demo-simple-select-outlined"
                                defaultValue={qualification}
                                onChange={(event)=>{setQualification(event.target.value)}}
                                labelWidth={120}
                            >
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                <MenuItem value={'MBBS'}>MBBS</MenuItem>
                                <MenuItem value={'BDS'}>BDS</MenuItem>
                                <MenuItem value={'BHMS'}>BHMS</MenuItem>
                                <MenuItem value={'DHMS'}>DHMS</MenuItem>
                                <MenuItem value={'BAMS'}>BAMS</MenuItem>
                                <MenuItem value={'BUMS'}>BUMS</MenuItem>
                                <MenuItem value={'BVSc & AH'}>{'BVSc & AH'}</MenuItem>
                                <MenuItem value={'B.Pharm.'}>B.Pharm</MenuItem>
                                <MenuItem value={'D.Pharm.'}>D.Pharm</MenuItem>
                                <MenuItem value={'BOT'}>BOT</MenuItem>
                                <MenuItem value={'BMLT'}>BMLT</MenuItem>
                                <MenuItem value={'BPT'}>BPT</MenuItem>
                                <MenuItem value={'B.Sc. Nursing'}>B.Sc. Nursing</MenuItem>
                                <MenuItem value={'BNYS'}>BNYS</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid className="fields-container" container item sm={6} xs={12}>
                    <div className="fields-inner-container">
                        <FormControl variant="outlined" >
                            <InputLabel id="demo-simple-select-outlined-label">
                                Postgraduation*
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                className="fields1"
                                id="demo-simple-select-outlined"
                                defaultValue={postgrad}
                                onChange={(event)=>{setPostgraduation(event.target.value)}}
                                labelWidth={120}
                            >
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                <MenuItem value={'None'}>None</MenuItem>
                                <MenuItem value={'MD'}>MD</MenuItem>
                                <MenuItem value={'MS'}>MS</MenuItem>
                                <MenuItem value={'Diploma'}>Diploma</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid className="fields-container" container item sm={6} xs={12}>
                    <div className="fields-inner-container">
                        <FormControl variant="outlined" >
                            <InputLabel id="demo-simple-select-outlined-label">
                                Speciality*
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                className="fields1"
                                id="demo-simple-select-outlined"
                                defaultValue={speciality}
                                onChange={(event)=>{setSpeciality(event.target.value)}}
                                labelWidth={120}
                            >
                                <MenuItem value="">
                                    <em>Select</em>
                                </MenuItem>
                                <MenuItem value={'None'}>None</MenuItem>
                                <MenuItem value={'DM'}>DM</MenuItem>
                                <MenuItem value={'MCh'}>MCh</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
            </Grid>
            <div style={{paddingBottom: 30}}>
                <Button type="submit" className="signUpButton" id="stylebutton" variant="contained" onClick={(e)=>signUp(e)}>{props.method==="POST" ? "SIGN UP" : "SUBMIT"}</Button>
            </div>
            {/* <div style={{paddingBottom: 30}}>
                <p>Already Registered? <Link className="link" to="/">Login</Link></p>
            </div> */}
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
        </form>
    )
}

export default SignupForm;