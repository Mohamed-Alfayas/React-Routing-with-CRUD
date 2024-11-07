import React, { useState } from 'react'
import { addFormData,editFormData } from './Redux/Reducers/ChildReducer/FormReducer';
import { useDispatch } from 'react-redux';
import LoadMore from './Component/LoadMorePagination.jsx/LoadMore';
import { useNavigate } from 'react-router-dom';

const FormState = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });
    const [isEdit,setIsEdit]= useState(false);

   
 const [tableData,settableData] =useState([]);
 

    const datachange = (e) => {
        const { name, value } = e.target
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
        console.log("value", value);

    }

    const handleClick = () => {

        if (isEdit) {
            const editedData = tableData.map((val) => val.id === data.id ? data:val)
            settableData(editedData)
            dispatch(editFormData(editedData))
            
        }else{ 
            const newData = {
                ...data,
                id:tableData.length > 0 ? tableData[tableData.length-1].id +1:0
            }
            let payloadData = [...tableData,newData]
            settableData(payloadData)
            dispatch(addFormData(payloadData))
        }

     
        setData({
            name:"",
            email:"",
            phoneNumber:""
        })
        setIsEdit(false);
    }
    
    
const handleEdit = (obj) => {
    setIsEdit(true)
    setData({
            id:obj.id,
            name:obj.name,
            email: obj.email,
            phoneNumber:obj.phoneNumber
    })

}

const handleDelete = (id) =>{
  const filteredData = tableData.filter((val) => val.id !== id);
  settableData(filteredData);
}

const handleNextPage = (page) =>{
    if(page === 1){
    navigate('/next-page')
    }else{
        navigate('/api-method') 
    }
}

    return (
        <div>
       

            <form method='post' action='javascript:void(0)'>
                <label htmlFor="name">Name:</label>
                <input type="text" value={data.name} name='name' onChange={datachange} />
                <label htmlFor="email">Email:</label>
                <input type="text" value={data.email} name='email' onChange={datachange} />
                <label htmlFor="number">Phone Number:</label>
                <input type="number" value={data.phoneNumber} name='phoneNumber' onChange={datachange} />
                <button onClick={handleClick}>{isEdit ? 'Update' : 'Submit'}</button>

            </form>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((obj, index) => (
                            <tr key={index}>
                                <td>{obj.name}</td>
                                <td>{obj.email}</td>
                                <td>{obj.phoneNumber}</td>
                                <td> <button onClick={() => handleEdit(obj)}>Edit</button></td>
                                <td><button onClick={() => handleDelete(obj.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => handleNextPage(1)}>Next Page</button>
                <button onClick={() => handleNextPage(2)}>Api Method</button>
            </div>
        </div>
    )
}

export default FormState