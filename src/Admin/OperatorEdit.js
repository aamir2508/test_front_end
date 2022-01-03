import React, { useState, useEffect } from 'react';
import NavbarLocal from '../Navbar/Navbar';
import * as Service from '../utils/Service/Service';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import './Operator.css';
import {
  useParams
} from 'react-router-dom';


const OperatorEdit = () => {
   
  let { userid } = useParams();
  let [operators, setOperator] = useState(null);

  let  [userName, setuserName] = useState(null);
  let  [userEmail, setuserEmail] = useState(null);
  let  [userPwd, setuserPwd] = useState(null);
  let  [userAdmin, setuserAdmin] = useState(null);
  
  let  [isUpdate, setisUpdate] = useState(null);


  useEffect(() => {
   loadData();
    
  }, []);

  const  loadData  = () => {
    userName = "";
    setuserName(userName);
    userEmail = "";
    setuserEmail(userEmail);
    userPwd = "";
    setuserPwd(userPwd);
    userAdmin = "";
    setuserAdmin(userAdmin);
  if(userid) {
    // write logic to update
    Service.fetchData('getAllUsers').then(res => {
      setOperator(res);
      operators = res.filter( result => result.userId == userid );
      operators = operators[0];
      console.log(operators);

      userName = operators.userName;
      setuserName(userName);
      userEmail = operators.emailAddress;
      setuserEmail(userEmail);
      userPwd = operators.password;
      setuserPwd(userPwd);
      userAdmin = operators.isAdmin;
      setuserAdmin(userAdmin);
      setisUpdate(true);
    });
  } else {
    setisUpdate(false);

  }
  };

  const history = useHistory();

  const handleSubmitButtonPressed = () => {
    const opratorData = {
      name: userName,
      email: userEmail,
      password: userPwd,
      isAdmin: userAdmin
    }
    console.log("handle calleddddd");
    console.log(opratorData);
    Service.fetchPostData('createUser',opratorData).then(res => {
      history.push('/operatorlist');
    });
  };

  const handleDelete = () => {
    console.log("delete done ....");
    const opratorData = {
      name: userName,
    }
    console.log("handle calleddddd");
    console.log(opratorData);
    Service.fetchLoginPostData('deleteUser',opratorData).then(res => {
      if(res.status >= 400) {
        const json =  res.json()
        .then( data => {
          console.log(data);
          toast.error(data.result);
        } );
      } else {
        toast.success("deleted successful");
        history.push('/operatorlist');
      }
    });
  }

  const handleUpdate = () => {
    const opratorData = {
      name: userName,
      email: userEmail,
      password: userPwd,
      isAdmin: userAdmin
    }
    console.log("handle calleddddd");
    console.log(opratorData);
    Service.fetchPostData('updateUser',opratorData).then(res => {
      toast.success("Updated successful");
    });
  }
  
  
  
    return (
      <div>
        <ToastContainer />
        <NavbarLocal /> 
      <div className='container'>
        <div className='bg-light p-2 m-1 rounded '>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" >User Name</span>
            </div>
             {<input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"
             value={userName} 
             onChange={(event) => { setuserName(event.target.value);}}
              /> }
          </div>
        </div>
        <div className='bg-light p-2 m-1 rounded '>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">User Email</span>
            </div>
             { <input type="text" className="form-control" placeholder="Username" aria-label="User Email" aria-describedby="basic-addon1"
             value={userEmail} 
             onChange={(event) => { setuserEmail(event.target.value);}}
              /> }
          </div>
        </div>
        <div className='bg-light p-2 m-1 rounded '>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">User Password</span>
            </div>
             { <input type="text" className="form-control" placeholder="Username" aria-label="User Password" aria-describedby="basic-addon1"
             value={userPwd} 
             onChange={(event) => { setuserPwd(event.target.value);}}
              /> }
          </div>
        </div>
        <div className='bg-light p-2 m-1 rounded '>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Admin</span>
            </div>
             { <input type="text" className="form-control" placeholder="Username" aria-label="userAdmin" aria-describedby="basic-addon1"
             value={userAdmin} 
             onChange={(event) => { setuserAdmin(event.target.value);}}
              /> }
          </div>
        </div>
        <div className='bg-light p-2 m-1 rounded '>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              {/* <span className="input-group-text" id="basic-addon1"></span> */}
            </div>
            {isUpdate && <button type="button" className="btn btn-secondary" onClick={ handleDelete }>Delete</button>}
            {isUpdate && <button type="button" className="btn btn-secondary" onClick={ handleUpdate }>Update</button>}
            {!isUpdate && <button type="button" className="btn btn-secondary" onClick={handleSubmitButtonPressed}>Create Operator</button>}
          </div>
        </div>
      </div>
      </div>
    );
  };
  
  export default OperatorEdit;