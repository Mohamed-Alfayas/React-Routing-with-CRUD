
import React, { useEffect, useState } from 'react';
import axios from "axios";
function App() {  

  const [data, setData] = useState([])

  const fetchProducts = async () =>{
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    console.log("Response = ",response.data);  
    setData(response.data)  
  }

  useEffect(() =>{
    fetchProducts()
  },[]);

  const handleDelete = (id) =>{
    let filteredData = data.filter(d => d.id !== id);
    setData(filteredData)
  }

  return (
    <div className="App">
      
      <ul>
      {data?.length && (
        data.map(d =>(
          <React.Fragment key={d.id}>
            <li>{d.title}</li>
            <li><button onClick={() =>handleDelete(d.id)}>Delete List</button></li>
          </React.Fragment>
        ))
      )}
      </ul>
    </div>
  );
}
export default App;