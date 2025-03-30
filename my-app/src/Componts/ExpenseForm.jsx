import axios from 'axios';
import React, { useContext, useState } from 'react';
import { API } from './OtherLinks';
import Swal from 'sweetalert2';
import { context } from './Context/Context';


export default function ExpenseForm() {

  const [Ulable, setLable] = useState('');
  const [Number, setNumber] = useState('');
  const [Date, setDate] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (Ulable.trim() === '') {
      alert('Name value required');
      return;
    }

    if (!Number || Number <= 0) {
      alert('Provide a valid expense value');
      return;
    }

    if (!Date) {
      alert('Enter a correct date');
      return;
    }
 
    axios
      .post(API, { label: Ulable, value: Number, date: Date },  { headers: { 'Content-Type': 'application/json' }})
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Expense added successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Reset the form fields
        setNumber('');
        setDate('');
        setLable('');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.error('Error adding expense:', error);
      });
  }

  return (

      <div className="container mt-4">
        <h1 className="text-center text-primary m-5">ADD Expense</h1>
  
        <center>
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm w-75" autoComplete="off">
            <div className="m-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg w-75"
                value={Ulable}
                onChange={(e) => setLable(e.target.value)}
                required
              />
            </div>
  
            <div className="m-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                name="number"
                className="form-control form-control-lg w-75"
                value={Number}
                onChange={(e) => setNumber(e.target.value)}
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
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
  
            <center>
              <input type="submit" value="Add Expense" className="btn btn-primary w-50 m-3" />
            </center>
          </form>
        </center>
      </div>

  )
}