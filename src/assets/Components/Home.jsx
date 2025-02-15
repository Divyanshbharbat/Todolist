import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css'
import { Toaster,toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
const Home = () => {
  const [time, setTime] = useState('');
  const [work, setWork] = useState('');
  const [array, setArray] = useState([]);
 
const [check, setcheck] = useState(false)
let navigate=useNavigate()

  // Handle delete request
  const handleDelete = async (_id) => {
    const token = localStorage.getItem("token");

    try {
      // Send a DELETE request for the specific item
      const response = await axios.delete(`http://localhost:7000/deletedata/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        withCredentials: true, // Include cookies if needed
      });
toast.success("Successfully Deleted")
      // After deletion, re-fetch the data
      getData();
    } catch (err) {
      console.log("Error deleting data:", err);
    }
  };

  // Fetch data from the server
  const getData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:7000/getdata", {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        withCredentials: true, // Include cookies if needed
      });
      setname(response.data.username)
      setArray(response.data.data); // Update state with the fetched data
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };
  const [name, setname] = useState('')
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:7000/senddata", { time, work }, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        withCredentials: true, // Include cookies if needed
      });
      toast.success("Successfully Submitted")
setTime("")
setWork("")
      // Re-fetch data after submitting
      getData();
    } catch (err) {
      console.log("Error submitting data:", err);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container-fluid  text-center">

<Toaster/>
        <h1 className='my-5 fs-1'>Welcome <span style={{textDecoration:"underline" ,borderRadius:"50px 50px 5px"}} className='underline bg-info py-2 px-5'>{name}   </span>    <span className='d-flex  justify-content-end fs-3 p-2' ><button  onClick={()=>
          {
            localStorage.setItem("token","");
            toast.success("Successfully Logout")
          navigate("/")
          }
        } className='p-2 bg-info text-dark fw-bold my-5' style={{backgroundColor:"purple",color:"white",border:0,borderRadius:"1vh"}} >Logout</button>  </span> </h1>  

      </div>

      <div className="container-fluid " >
        {array.map((item) => (
          <div key={item._id} className="container-fluid  py-5 px-3 bg-info text-white my-5">
            <div className="row d-flex">
              <div className="col-lg-4 col-sm-12 my-2"><span className='fs-3 text-dark fw-bolder'>{item.time}</span></div>
              <div className="col-lg-4 col-sm-12 my-3 "><textarea name="" style={{ height: "20vh", width: "30vh",border:0 }} value={item.work} id=""></textarea></div>
              <div className="col-lg-4 col-sm-12 my-2  px-5">      <button className='border-0 bg-primary p-2 px-5 fw-bolder text-white' style={{borderRadius:"1vh"}} onClick={() => handleDelete(item._id)}>Delete</button></div>
              {/* Add the delete button */}

            </div>
          </div>
        ))}
      </div>

      <h1 className='fs-1 mx-5'>Create list</h1>
      <form onSubmit={handleSubmit}>
        <div className="container-fluid  my-5 p-5 bg-info" style={{ display: "flex", flexDirection: "column" }}>
          <span className='fs-2 fw-bold my-3'>Choose Time</span>
          <div className="input my-2">
            <input className='py-1 px-5'
              type="time" required={true}
              placeholder="Time"
              onChange={(e) => setTime(e.target.value)}
              value={time}
            />
          </div>
          <span className='fs-2 fw-bold my-2'>Choose Time</span>
          <div className="input my-2">
            <input className='py-1 px-3'
              type="text"
              placeholder="Work" required={true}
              onChange={(e) => setWork(e.target.value)}
              value={work}
            />
          </div>
          <div className="input my-2">
            <button className=' fw-bold border-0 p-3 text-white bg-primary' style={{ borderRadius: "1vh" }} type="submit">Submit</button>
          </div>
        </div>

      </form>
    </>
  );
};

export default Home;
