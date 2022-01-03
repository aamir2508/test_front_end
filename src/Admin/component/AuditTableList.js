import React, { useEffect }  from 'react';

import * as Service from '../../utils/Service/Service';

export const AuditTableList = ({ operator }) => {

  return (
    <tr>
      <td>{operator.userId}</td>
      <td>{operator.userName}</td>
      <td>{operator.emailAddress}</td>
    </tr>
  );
};


export default AuditTableList;
