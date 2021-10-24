import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';

export default function PaymentPay(props) {
  const history=useHistory();
  const [paymentdata,SetPaymentdata]=useState({"profession":"","time":"","date":"","timeid":""});
  const selectUser=useSelector((state)=>state.userActivity.value)

  //console.log("userid "+selectUser.userid);
    console.log(props.Submitdata)
    const PaymentDetails = styled.section`
    padding: 4em;
    background: papayawhip;
  `;
  const TitleText=styled.h2`
  color: black;
  `;
  const NameText=styled.h1`
  color: aquamarine;
  `;

  const handlePayment=(e)=>{

    e.preventDefault();

    const paymentBody={
        "profession":selectUser.userid,
        "time":props.Submitdata.time,
        "date":props.Submitdata.date,
        "timeid":props.Submitdata.timeid
    }

    const config={
      headers:{
        "Content-Type":'application/json',
        Authorization:'Bearer '+localStorage.getItem("token")
      }
    }

    console.log("paymentBody "+paymentBody);
    axios.post('http://localhost:5000/api/payment/payment', paymentBody, config)
        .then(response =>  {
          console.log(response);
      //       localStorage.setItem("token",response.data.accessToken);
      //        dispatch(signedUser({
      //      user:loginData.usernameOrEmail 
      //  }));
       })

  };

    return (
     
       <div className="container mt-5">
      

      <div className="row">
          <div className="col">
          <PaymentDetails>
              <TitleText>I need to Contact </TitleText>
              <NameText> {props.Submitdata.name}</NameText>
              <TitleText>in</TitleText>
              <NameText>{props.Submitdata.date}</NameText>
              <TitleText>At</TitleText>
              <NameText>{props.Submitdata.time}</NameText>
              </PaymentDetails>
          </div>
        <div className="col-md-4 order-md-2 mb-4">
    
    <form onSubmit={(e)=>{handlePayment(e)}}>
            <hr className="mb-4"/>

            <h4 className="mb-3">Payment</h4>

            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" checked required/>
                <label className="custom-control-label" for="credit">Credit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required/>
                <label className="custom-control-label" for="debit">Debit card</label>
              </div>
              <div className="custom-control custom-radio">
                <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required/>
                <label className="custom-control-label" for="paypal">Paypal</label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label for="cc-name">Name on card</label>
                <input type="text" className="form-control" id="cc-name" placeholder="" required/>
                <small className="text-muted">Full name as displayed on card</small>
                <div className="invalid-feedback">
                  Name on card is required
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label for="cc-number">Credit card number</label>
                <input type="text" className="form-control" id="cc-number" placeholder="" required/>
                <div className="invalid-feedback">
                  Credit card number is required
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 mb-3">
                <label for="cc-expiration">Expiration</label>
                <input type="text" className="form-control" id="cc-expiration" placeholder="" required/>
                <div className="invalid-feedback">
                  Expiration date required
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label for="cc-expiration">CVV</label>
                <input type="text" className="form-control" id="cc-cvv" placeholder="" required/>
                <div className="invalid-feedback">
                  Security code required
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
            </form>
            
            </div>
        </div>
      </div>
 
      
    )
}
