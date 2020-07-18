import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header'
import { useHistory, Link } from 'react-router-dom';
import './doctorSignup.css';

const DoctorSignup = (props) => {
    const [username,setUsername] = useState("")
    const [password1,setPassword1] = useState("")
    const [password2,setPassword2] = useState("")
    const [qualification,setQualification] = useState("")
    const [speciality,setSpeciality] = useState("")
    const [postgrad,setPostgraduation] = useState("")
    const [email,setEmail] = useState("")
    const [activityIndicator,setActivityIndicator] = useState(false)
    const history = useHistory();

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
            formdata.append("username",username)
            formdata.append("postgrad",postgrad)
            formdata.append("password1",password1)
            formdata.append("password2",password2)
            formdata.append("special",speciality)
            formdata.append("quali",qualification)
            formdata.append("Email",email)
            try{
                setActivityIndicator(true);
                const response = await fetch('register/',{
                    method: 'POST',
                    headers: {
                        //'Content-Type': 'application/json',
                    },
                    body: formdata
                })
                console.log(await response.text())
                const resData = await response.json()
                
                if(resData.success==='Successfully created new doctor'){
                    history.push('/')
                }
                setActivityIndicator(false);
            }
            catch(err){
                console.log(err);
                setActivityIndicator(false)
            }
        }
    }

    return(
        <div className="bodyStyles">
            <Header />
            {activityIndicator ? <LinearProgress /> : null}
            <div className="outerContainer">
                <div className="innerContainer">
                    <div className="innerField">
                        <h1 className="heading">DOCTOR-SIGNUP</h1>
                        <form className="form">
                            <Grid container className="gridContainer">
                                <Grid className="fields-container" container item sm={6} xs={12} >
                                    <div className="fields-inner-container">
                                        <TextField required className="fields1" id="outlined-basic" label="Username" onChange={(event)=>setUsername(event.target.value)} variant="outlined"/>
                                    </div>
                                </Grid>
                                <Grid className="fields-container" container item sm={6} xs={12}>
                                    <div className="fields-inner-container">
                                        <TextField required type="email" className="fields1" id="outlined-basic" label="Email-ID" onChange={(event)=>setEmail(event.target.value)} variant="outlined"/>
                                    </div>
                                </Grid>
                                <Grid className="fields-container" container item sm={6} xs={12}>
                                    <div className="fields-inner-container">
                                        <TextField required className="fields1" id="outlined-basic" label="Password" type="Password" onChange={(event)=>setPassword1(event.target.value)} variant="outlined" />
                                    </div>
                                </Grid>
                                <Grid className="fields-container" container item sm={6} xs={12}>
                                    <div className="fields-inner-container">
                                        <TextField required className="fields1" id="outlined-basic" label="Re-enter Password" type="Password" onChange={(event)=>setPassword2(event.target.value)} variant="outlined" />
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
                            <div>
                                <Button type="submit" className="signUpButton" id="stylebutton" variant="contained" onClick={(e)=>signUp(e)}>SIGN UP</Button>
                            </div>
                            <div style={{paddingBottom: 30}}>
                                <p>Already Registered? <Link className="link" to="/">Login</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorSignup;