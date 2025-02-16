import React,{useState,useEffect} from "react";

function UserList(){
    const [users,setUsers]=useState([]); //state to store API data 
    const [loading ,setLoading]=useState(true);//loading state
    const [error,setError]=useState(null);
      
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response)=>{
            if(!response.ok){
                throw new Error("Failed to fetch users");
            }
            return response.json();//Convert Response to json
        })
        
        .then((data)=>{
            setUsers(data); //set data in the state
            setLoading(false);//Turn off loading

    })
    .catch((error)=>{
        setError(error.message);
        setLoading(false);
    
         } );

    },[]);

    if(loading){
        return <h3> Loading users....</h3>;//show loading message
    }
    if(error){
        return <h3 style={{color:"red"}}>Error:{error}</h3>
    }

    return(
        <div className="mt-4">
            <h3>User List</h3>
             <ul className="list-group">
                {users.length>0 ? (
                 users.map((user)=>(
                    <li key={user.id}
                    className="list-group-item">
                        {user.name}-{user.email}
                         </li>
                ))
            ):(
                <p>No users found</p> // show message no users available
            )
            }
                
                 </ul>
        </div>
    );


}
export default UserList;