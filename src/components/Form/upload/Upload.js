import React, { useState } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import './Upload.css';
import Navbar from '../Navbar/Navbar';

const Upload = () => {
  const [selectedVideos, setSelectedVideos] = useState(null);
  const [loaded, setLoaded] = useState(0);
//   const [error, setError] = useState('');
  const navigate = useNavigate();

  const maxSelectFile = (e) => {
    let files = e.target.files;
    if (files.length > 1) {
      toast.error('Maximum 1 file is allowed');
      e.target.value = null;
      return false;
    } else {
      let err = '';
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 524288000) { // 500 MB
          err += files[i].name + ', ';
        }
      }
      if (err !== '') {
        // error caught
        e.target.value = null;
        toast.error(err + " is/are too large. Please select file size < 500Mb");
      }
    }
    return true;
  }

  const fileChangeHandler = (e) => {
    const files = e.target.files;
    if (maxSelectFile(e)) {
        setSelectedVideos(files);
        setLoaded(0);
    }
  }

  const fileUploadHandler = (e) => {
    const data = new FormData();
    for (let i = 0; i < selectedVideos.length; i++) {
      data.append('file', selectedVideos[i]);
    }
    axios.post('http://127.0.0.1:3333/api/upload', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    }, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
        });
      }
    }).then(res => {
      toast.success('Upload Successful');
    }).catch(err => {
      toast.error(`Upload Fail with status: ${err.statusText}`);
    });
  }

  return (
    // if (!localStorage.getItem('userTokenTime')) return <Redirect to="/signIn" />
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="form-group">
            <ToastContainer />
          </div>
          <h4>Upload Video</h4>
          <hr className="my-4" />

          <form method="post" name="videoUpload" action="/api/upload" id="#" encType="multipart/form-data">
            <div className="form-group files">
              <label>Upload Your Videos Here</label>
              <input
                type="file"
                name="file"
                className="form-control"
                multiple="multiple"
                accept="video/*"
                onChange={fileChangeHandler} />
              <Progress max="100" color="success" value={loaded} className="mt-4 mb-1">
                {isNaN(Math.round(loaded, 2)) ? 0 : Math.round(loaded, 2)}%
              </Progress>
              <button
                type="button"
                className="btn btn-success btn-block"
                onClick={fileUploadHandler}>Upload Video
              </button>
            </div>
          </form>
        </div>
      </>
    );
}

export default Upload;