import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    'form_data': []
}

const FormReducer = createSlice({
    name:'FormReducer',
    initialState: initialState,
    reducers : {
        addFormData : (state,action) => {
              console.log("datas",action.payload);
            return {
                ...state,
                form_data :[...state.form_data, action.payload]
            }
        },
        editFormData : (state,action) => {
            console.log("edit",action.payload);
            return{
                ...state,
                form_data : [...state.form_data].map(obj => obj.id === action.payload.id ? action.payload :obj)
            }
        }
    }
});

export const {setFormdata,addFormData,editFormData} = FormReducer.actions;
export default FormReducer.reducer;