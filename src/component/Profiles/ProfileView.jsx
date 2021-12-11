
import React, { useEffect, useState } from 'react'
import Headers from '../Home-Page/Header'
import queryString from 'query-string';
import { useHistory, useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@restart/ui/esm/Button';
import Select from 'react-select'
import PaymentPay from './PaymentPay';
import moment from 'moment';
import { useSelector } from 'react-redux';
import Loading from '../Home-Page/Loading';
import { useDispatch } from 'react-redux';
import { loadingVisibility } from '../../features/configurationsActivity';
 
export default function ProfileView() {
    
    const [date, setDate] = useState(new Date());
    const [time,SetTime]= useState("");
    const [submit,setSubmit]=useState(false)
    const [submitData,setSubmitData]=useState()
    const history = useHistory();
    const { id } = useParams();
    const [data,setData]=useState([]);
    const [options,setOptions]=useState([]);
    const[avtime,setAvtime]=useState(false);

    const selectUser=useSelector((state)=>state.userActivity.value)
    const loggeduser=useSelector((state)=>state.authActivity.user)
    console.log("userid "+selectUser.userid);

    const dispatch = useDispatch();

    useEffect(async () => {
        //getAllData();
        dispatch(loadingVisibility({visibility:"true"}));
      
        let result=await fetch("http://localhost:5000/api/professional/get/"+selectUser.userid);
        
        result = await result.json();
        setData(result);
        dispatch(loadingVisibility({visibility:"false"}));
     }, [])

    const Wrapper = styled.section`
    padding: 4em;
    background: papayawhip;
  `;

  const ProfileImage=styled.img`
  src: url('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260');
  `;

const paymentBtnHandler=()=>{
    dispatch(loadingVisibility({visibility:"true"}));
   // alert(id+ " "+time.value);
    let modify=moment(date).format("DD/MM/YYYY")
    setSubmitData({"pid":id,"date":modify,"timeid":time.value,"time":time.label,"uid":data.uid,"name":data.name})
    setSubmit(true);

    dispatch(loadingVisibility({visibility:"false"}));
    // let path = `/payment`; 
    // history.push(path);
}

const dateChange=(date)=>{
setDate(date);
 
// console.log(date.getDay());
try{
    dispatch(loadingVisibility({visibility:"true"}));
    let time=data.timeSlot.timeSlot[date.getDay()].times;
    
    let dec=time;
    console.log(dec)
    let val=[];
    val.push({"value":"Select Time","label":"Select Time"});
    dec.map((e)=>{
      console.log(e.time+" "+e.availability)
      if(e.availability==true){
        val.push({"value":e.id,"label":e.time})
      }else{
      val.push({"value":e.id,"label":e.time,"disabled": "true"})
      }
      //  val.push({"value":dec[i],"label":dec[i]})
    })
    // for(var i = 0; i < dec.length; i++) {
       
    //    // setOptions({"value":dec[i],"label":dec[i]})
    //    //var hour=dec[i];
    //    //console.log(dec[i])
       
         
        
     
    // }
    setOptions ([...val
     
       ]);
       setAvtime(true);
       dispatch(loadingVisibility({visibility:"false"}));
}catch(v){
    setAvtime(false);
    setOptions({"value":"Not Available","label":"Not Available"})
    console.log(v)
}

// setOptions({value:date.})
// data.timeSlot.timeSlot.map((d)=>
// console.log(d)
// //setOptions({value:d.times,label:d.times})
// );
}

const makeCall=()=>{
    let path = `/makecall/${id}`; 
    history.push(path);
}

const showUserLogin=()=>{
  
    history.push('/signin');
}
const showUserSignup=()=>{
  
    history.push('/signup');
}
// const options = [
//     { value: '8.00', label: '8.00',disabled: true },
//     { value: '10.00', label: '10.00' },
//     { value: '12.00', label: '12.00' }
//   ]

    return (
        <>
        
            <Headers/>
            <Loading />
            {console.log(data)}
            {!submit? 
          
            <div className='container mt-5'>
            <div className="row">
  <div className="col"><img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"></img></div>
  <div className="col">
  <div className='mt-5'>
        <h5>Hi I am,</h5><h2>{data.name}</h2><h5>I am a </h5><h2>Professional {data.profession_name}</h2>
        <section>
            {data.description}
        </section>
      </div>
  </div>
  <div className="col mt-5">
      Select My Available Time
      <DatePicker  className="form-control" selected={date} onChange={date => dateChange(date)} />
      
      {avtime==true?
      <Select  options={options}  isOptionDisabled={(option) => option.disabled} onChange={t=>SetTime(t)} />
     :"Please Select Difirent date"}
     <div className='mt-5'>
     {((localStorage.getItem("token")!=null) && (loggeduser!=null ))?
     <Button className="btn btn-success" onClick={()=>paymentBtnHandler()}>Make Sheduled</Button>
         : <div>  <Button className="btn btn-success" onClick={()=>showUserLogin()}>Login</Button> <Button className="btn btn-success" onClick={()=>showUserSignup()}>Sign up</Button></div>}
     {/* <Button className="btn btn-danger" onClick={()=>makeCall()}>Call Now</Button> */}
         </div>
  </div>
</div>
            

            </div>
           
            :
            <PaymentPay Submitdata={submitData} />
}
        </>
    )
}
