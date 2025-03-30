import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "./OtherLinks";
import { useNavigate } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import Swal from "sweetalert2"; // Import SweetAlert2
 



export default function GetExpenseData({ searchQuery }) { // ✅ Receive searchQuery
  const [Getdata, setGetData] = useState([]);
  const navigate = useNavigate();

  // Fetch Data from API
  useEffect(() => {
    axios.get(API).then((item) => {
      setGetData(item.data);
    });
  }, []);

  // Delete Data with SweetAlert confirmation
  function del(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${API}/${id}`).then(() => {
          axios.get(API).then((item) => {
            setGetData(item.data);
          });
          Swal.fire("Deleted!", "Your expense has been deleted.", "success");
        });
      } else {
        Swal.fire("Cancelled", "Data saved successfully!", "info");
      }
    });
  }

  // Edit Function
  function edit(id, label, value, date) {
    localStorage.setItem("id", id);
    localStorage.setItem("label", label);
    localStorage.setItem("value", value);
    localStorage.setItem("date", date);
    navigate("/editdate");
  }

  // ✅ Apply filtering based on search input
  const filteredData = Getdata.filter((expense) =>
    searchQuery ? expense.label.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );
  

  return (
    <div>
      <h1 className="text-center text-primary m-5">Expense Report</h1>

      <div className="container mt-4">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Label</th>
              <th>Value</th>
              <th>Date</th>
              <th>Edit</th> {/* ✅ Edit Button */}
              <th>Delete</th> {/* ✅ Delete Button */}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.label}</td>
                <td>{i.value} ₹</td>
                <td>{i.date}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => edit(i.id, i.label, i.value, i.date)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => del(i.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PieChart */}
      {filteredData.length > 0 ? (
        <div style={{ height: "300px" }}>
          <PieChart
            series={[
              {
                data: filteredData.map((item, index) => ({
                  id: index,
                  value: Number(item.value) || 0,
                  label: item.label,
                })),
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -45,
                endAngle: 225,
                cx: 150,
                cy: 150,
              },
            ]}
          />
        </div>
      ) : (
        <h3 className="text-center">No data found...</h3>
      )}

      {/* BarChart */}
      {filteredData.length > 0 && (
        <BarChart
          xAxis={[{ scaleType: "band", data: filteredData.map((item) => item.label) }]}
          series={[{ data: filteredData.map((item) => Number(item.value)) }]}
          width={600}
          height={400}
        />
      )}
      
      
    </div>
  );
}
