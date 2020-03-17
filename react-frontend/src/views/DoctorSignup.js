import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useHistory } from 'react-router-dom';
import './doc.css';

const DoctorSignup = (props) => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [qualification,setQualification] = useState("")
    const [speciality,setSpeciality] = useState("")
    const [postgraduation,setPostgraduation] = useState("")
    const [activityIndicator,setActivityIndicator] = useState(false)
    const history = useHistory();

    const signUp = async() => {
        if(username==="" || password==="" || qualification==="" || postgraduation==="" || speciality===""){
            alert("Fill in all fields")
        }
        else{
            try{
                setActivityIndicator(true);
                const response = await fetch('',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username,
                        password,
                        qualification,
                        postgraduation,
                        speciality
                    })
                })
                const resData = await response.json()
                console.log(resData);
                history.push('/login')
                setActivityIndicator(false);
            }
            catch(err){
                console.log(err);
            }
        }
    }

    return(
        <div className="bodyStyles">
            {activityIndicator ? <LinearProgress /> : null}
            <h1>DOCTOR-SIGNUP</h1>
            <form>
                <div className="fields-container">
                    <TextField className="fields" id="outlined-basic" label="Username*" onChange={(event)=>setUsername(event.target.value)} variant="outlined"/><br />
                </div>
                <div className="fields-container">
                    <TextField className="fields" id="outlined-basic" label="Password*" type="Password" onChange={(event)=>setPassword(event.target.value)} variant="outlined" /><br />
                </div>
                <div className="fields-container">
                <FormControl variant="outlined" >
                    <InputLabel id="demo-simple-select-outlined-label">
                        Qualification*
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        className="fields"
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
                        <MenuItem value={'B.Pharm'}>B.Pharm</MenuItem>
                        <MenuItem value={'D.Pharm'}>D.Pharm</MenuItem>
                        <MenuItem value={'BOT'}>BOT</MenuItem>
                        <MenuItem value={'BMLT'}>BMLT</MenuItem>
                        <MenuItem value={'BPT'}>BPT</MenuItem>
                        <MenuItem value={'B.Sc. Nursing'}>B.Sc. Nursing</MenuItem>
                        <MenuItem value={'BNYS'}>BNYS</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <div className="fields-container">
                <FormControl variant="outlined" >
                    <InputLabel id="demo-simple-select-outlined-label">
                        Postgraduation*
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        className="fields"
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
                <div className="fields-container">
                <FormControl variant="outlined" >
                    <InputLabel id="demo-simple-select-outlined-label">
                        Speciality*
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        className="fields"
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
                <div className="signUpContainer">
                    <Button className="signUpButton" variant="contained" color="primary" onClick={()=>signUp()}>SIGN UP</Button>
                </div>
        </form>
        </div>
    )
}

export default DoctorSignup;