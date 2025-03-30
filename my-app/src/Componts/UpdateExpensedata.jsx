import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API } from './OtherLinks';
import { useNavigate } from 'react-router-dom';

export default function UpdateExpensedata() {
  const [id,setid]=useState(0)
  const [Ulable,setLable]=useState('')
  const [Number,setNumber]=useState();
  const [Date,setDate]=useState();

  const navi = useNavigate()

  function handleSubmit(e){
    e.preventDefault();
    if(Ulable===''){
      alert('Name Value Required')
    }
    else if(Number<0||Number<0||Number===0){
      alert('Provide Expense Value')
    }
    else if(Date===''){
      alert('Eneter corrcet date')
    }
    else{
      axios.put(`${API}/${id}`,{label:Ulable,value:Number,date:Date})
      setNumber('')
      setDate('')
      setLable('')
      navi('/reportdata')
      localStorage.clear()
    }

  }


useEffect(()=>{
  setid(localStorage.getItem('id'))
  setLable(localStorage.getItem('label'))
  setNumber(localStorage.getItem('value'))
  setDate(localStorage.getItem('date'))
},[])


  return (
    <div className="container mt-4">
         <h1 className='text-center text-primary m-5'> Update Expense  </h1>

    <center>
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm w-75" autoComplete='off'>
    
    <div className="m-3">
      <label className="form-label">Name</label>
      <input
        type="text"
        name="name"
        className="form-control form-control-lg w-75"
        value={Ulable}
        onChange={(e)=>setLable(e.target.value)}
        required
      />
    </div>
    <div className="m-3">
      <label className="form-label">Number</label>
      <input
        type="number"
        name="number"
        className="form-control form-control-lg w-75"
        value={Number}
        onChange={(e)=>setNumber(e.target.value)}
        required
      />
    </div>
    <div className="m-3">
      <label className="form-label">Date</label>
      <input
        type="date"
        name="date"
        className="form-control form-control-lg w-75"
        value={Date}
        onChange={(e)=>setDate(e.target.value)}
        required
      />
    </div>
 <center> <input type="submit" value={'Update Expens'} className='btn btn-primary w-50 m-3'/></center>
  </form>
    </center>
  </div>
  )
}
