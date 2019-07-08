import React, { useState, useEffect }  from 'react'
function Users (props) {
    let item = props.item;
   return <div className="line" key={item.id} >
         <span>
         {item.fullname}
         </span>
         <span>
             {item.phone}
             </span>
         <span>
            {item.email}
             </span>
         <span>
            {item.city}
             </span>
         <span>
             {item.obj}
         </span>
   </div>
     }

     export default Users;