import React from 'react'
import Headers from '../Home-Page/Header'
import Sidebar from './Side-bar'
import styled from 'styled-components';
import axios from 'axios';
import Dropzone, { useDropzone } from "react-dropzone";
import { Card } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';
import { useState } from 'react';

export default function DashboardProfile() {
  const [details, setDetails] = useState({ userName: "", professionName: "", password: "", confirmpassword: "" })




  const Centerdiv = styled.div`
    margin: auto;
 width: 50%;
  
 padding: 10px;

    `;

  const Centerdiv1 = styled.div`
    margin: auto;
 width: 50%;
  
 padding: 10px;

    `;

  const dropzoneContainer = styled.div`
    height: 300;
    background: "#efefef";
    display: "flex";
    align-items: "center";
    justify-content: "center";
    border-style: "dashed";
    border-color: "#aaa";
  `;
  const previewimg = styled.div`
    width: 250;
    height: 250;
    margin: "auto";
    display: "block";
    margin-bottom: theme.spacing(2);
    object-fit: "contain";
  `;

  const wrapper = styled.div`
    margin: theme.spacing(1);
    position: "relative";
  `;


  const fabProgress = styled.div`
    color: green;
    position: "absolute";
    top: -6;
    left: -6;
    z-index: 1;
 `;
  const buttonProgress = styled.div`
    color: green;
    position: "absolute";
    top: "50%";
    left: "50%";
    margin-top: -12;
    margin-left: -12;
    `;


  const getAppointments = async (data) => {





    await axios.post(process.env.REACT_APP_BACKEND_URL+'api/profile/profileupload', data, {
      "headers": {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    }).then(response => {
      if (typeof response.data !== 'undefined' || response.data.length !== 0) {
        console.log("res " + JSON.stringify(response.data));

      }
      //  addNotify("Success", JSON.stringify(response));
    }).catch(error => {
      // addNotify("Error", JSON.stringify(error));
      console.log(error.response);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    });
  }

  const onFileChangeHandler = (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('file', e.target.files[i])
    }
    getAppointments(formData)
      .then(res => {
        console.log(res.data);
        alert("File uploaded successfully.")
      })
  };


  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [file, setFile] = React.useState();
  const [preview, setPreview] = React.useState();
  const [percent, setPercent] = React.useState(0);
  const [downloadUri, setDownloadUri] = React.useState();
  const [selectedImageFile, setSelectedImageFile] = React.useState();

  const onDrop = React.useCallback((acceptedFiles) => {

    const fileDropped = acceptedFiles[0];
    if (fileDropped["type"].split("/")[0] === "image") {
      setSelectedImageFile(fileDropped);
      //return;
    }
    setFile(fileDropped);
    const previewUrl = URL.createObjectURL(fileDropped);
    console.log("preview " + previewUrl);
    setPreview(previewUrl);
    setSuccess(false);
    setPercent(0);
  });

  const uploadFile = async () => {
    try {
      setSuccess(false);
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const API_URL = process.env.REACT_APP_BACKEND_URL+"api/profile/profileupload";
      const response = await axios.put(API_URL, formData, {
        "headers": {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem("token")
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPercent(percentCompleted);
        },
      });

      setDownloadUri(response.data.fileDownloadUri);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      alert(err.message);
    }
  };
  return (

    <>
      <Headers />
      <Sidebar active="profile" />
      {/*       
        <Centerdiv> */}
      <div style={{ margin: 'auto', padding: '10px', width: '50%' }}>
        <form>


        </form>
        <div className="text-center mt-5">
          <Dropzone onDrop={(e) => onDrop(e)} accept="image/png, image/gif" minSize={0}
            maxSize={5242880}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!isDragActive && 'Click here or drop a file to upload!'}
                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                {isDragReject && "File type not accepted, sorry!"}
              </div>
            )}
          </Dropzone>
        </div>
        <img
          onLoad={() => URL.revokeObjectURL(preview)}

          src={preview || "https://i.pinimg.com/474x/8c/70/8b/8c708b478e0e71f7599b75b9cc108ddf.jpg"}
        />
        {file && (<Button onClick={() => uploadFile()}>Upload</Button>)}



        <div className="mt-5 mb-5">
          <div className="form-group">
            <label>Your name</label>
            <input className="form-control" type="text" placeholder="professionName" name="professionName" id="professionName"
              value={
                details.professionName
              }
              onChange={
                (e) => setDetails({
                  ...details,
                  professionName: e.target.value
                })
              }
            />
          </div>
        </div>
        <div className="mt-5 mb-5">
          <div className="form-group">
            <label>Username</label>
            <input className="form-control" type="text" placeholder="userName" name="userName" id="userName"
              value={
                details.userName
              }
              onChange={
                (e) => setDetails({
                  ...details,
                  userName: e.target.value
                })
              }
            />
          </div>
        </div>

        <div className="mt-5 mb-5">
          <div className="form-group">
            <label>Current Password</label>
            <input className="form-control" type="password" placeholder="currentpassword" name="currentPassword" id="currentPassword"
              value={
                details.currentPassword
              }
              onChange={
                (e) => setDetails({
                  ...details,
                  currentPassword: e.target.value
                })
              }
            />
          </div>
        </div>

        <div className="mt-5 mb-5">
          <div className="form-group">
            <label>New Password</label>
            <input className="form-control" type="password" placeholder="newpassword" name="newPassword" id="newPassword"
              value={
                details.professionName
              }
              onChange={
                (e) => setDetails({
                  ...details,
                  professionName: e.target.value
                })
              }
            />
          </div>
        </div>

        <div className="mt-5 mb-5">
          <div className="form-group">
            <label>Confirm Password</label>
            <input className="form-control" type="password" placeholder="newpassword" name="newPassword" id="newPassword"
              value={
                details.professionName
              }
              onChange={
                (e) => setDetails({
                  ...details,
                  professionName: e.target.value
                })
              }
            />
          </div>
        </div>
        {/* </Centerdiv> */}
      </div>
    </>

  )
}
