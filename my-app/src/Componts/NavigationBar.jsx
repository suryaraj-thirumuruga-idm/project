import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "./Context/Context";

export default function NavigationBar({ setSearchQuery }) {
  const {show ,setShow} = useContext(context)
  //  Receive prop
  const navigate = useNavigate();

  function addData() {
    navigate("/newdata");
  }

  function report() {
    navigate("/reportdata");
  }
  function Signout(){
    navigate("/")
    setShow(false)
  }
  return show ? (
    <div className="m-5">
      <div className="butTag d-flex justify-content-evenly m-5">
        <button className="btn btn-primary" onClick={addData}>
          ADD Expense
        </button>
        <button className="btn btn-success" onClick={report}>
          Expense Report
        </button>

        {/* Ensure input updates searchQuery */}
        <input
          type="text"
          placeholder="Search"
          className="form-control w-25"
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} // No error now
        />
        <button className="btn btn-danger" type="button" onClick={Signout} >
             SignOUT
      </button>
      </div>
      
    </div>
  ) : null;
}
