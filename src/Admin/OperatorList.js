import React, { useEffect, useState } from 'react';
import * as Service from '../utils/Service/Service';
import { useHistory } from 'react-router-dom';


import './Operator.css';
import { TableList } from './component/TableList'

import NavbarLocal from '../Navbar/Navbar';



const OperatorList = () => {
  

  let [operators, setOperator] = useState(null);
  const history = useHistory();

    useEffect(() => {
        // console.log("get Table list from DB $$$$$");
        Service.fetchData('getAllUsers').then(res => {
          console.log(res);
          setOperator(res);
        });
      }, []);
   
    const changeRouteToEdit = (id) => {
      console.log("change route");
      console.log(id);
      history.push('/operatorEdit'+'/'+id);
    };

    const handlecreatePressed = () => {
      console.log("change route");
      history.push('/operatorEdit'+'/');
    };
  
    return (
      <div>
           <NavbarLocal /> 
        <div className='bg-light p-2 m-1 rounded '>
          <button type="button" className="btn btn-secondary" onClick={handlecreatePressed}>Create New Operator</button>
            <table className='table table-striped table-bordered'>
              <thead  className='thead-dark'>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email Address</th>
                </tr>
              </thead>
              <tbody>
                { operators && operators.map(data => <TableList key={data.userId} operator={data} onClickHandler={changeRouteToEdit}/> ) }
              </tbody>
            </table>
        </div>
      </div>
    );
  };
  
  export default OperatorList;