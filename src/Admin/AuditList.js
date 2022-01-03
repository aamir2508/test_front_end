import React, { useEffect, useState } from 'react';
import * as Service from '../utils/Service/Service';
import { useHistory } from 'react-router-dom';


import './Operator.css';
import { AuditTableList } from './component/AuditTableList'
 
import NavbarLocal from '../Navbar/Navbar';



const AuditList = () => {
  

//   let [operators, setOperator] = useState(null);
  const history = useHistory();

    useEffect(() => {
        console.log("get Table list from DB $$$$$");
        // Service.fetchData('getAuditReport').then(res => {
        //   console.log(res);
        // });
      }, []);
   
  
    return (
      <div>
          AAAAAAAAAAAAAhhhhhh
           {/* <NavbarLocal /> 
        <div className='bg-light p-2 m-1 rounded '>
            <table className='table table-striped table-bordered'>
              <thead  className='thead-dark'>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email Address</th>
                </tr>
              </thead>
              <tbody>
                { operators && operators.map(data => <AuditTableList key={data.userId} operator={data} onClickHandler={changeRouteToEdit}/> ) }
              </tbody>
            </table>
        </div> */}
      </div>
    );
  };
  
  export default AuditList;