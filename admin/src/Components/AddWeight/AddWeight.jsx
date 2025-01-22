import React, {  useState,useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from "react-router-dom";

const AddWeight = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [weight, setWeight] = useState({ name: "" }); // State for the input fields

  const queryParams = new URLSearchParams(location.search);
  const listId = queryParams.get("id"); // "react"
  useEffect(() => {
    const fetchWeight = async () => {
      try {
        const response = await axios.get("http://localhost:5000/weight/"+listId);
        setWeight(response.data);
      } catch (error) {
        console.error("Error fetching weight:", error);
      }
    };
    if(listId!=null){
      fetchWeight();

    }

      }, []);


      const handleSubmit = (e) => {
        e.preventDefault();
        if(listId==null){
            axios.post('http://localhost:5000/AddWeight', weight)
            .then(response => {
              console.log('Item added:', response.data);
              setWeight({ name: "" }); // Reset form for adding
              navigate('/listweight')

            })
            .catch(err => {
              console.error('Error adding item:', err);
            });
        }
        else{

          axios.put('http://localhost:5000/weight/'+listId, weight)
            .then(response => {
              console.log('updated:', response.data);
              setWeight({ name: "" }); // Reset form for adding
              navigate('/listweight')
            })
            .catch(err => {
              console.error('Error updating item:', err);
            });
        }
    };
  return (
    <form onSubmit={handleSubmit}>    
        {listId==null
          ? <div className="page-header"><h2>Add New Weight</h2></div>
          : <div className="page-header"><h2>Update Weight</h2></div>}
      <div className="row">
        <div className="form-floating mb-3">
          <input
            type="text" className="form-control"
            placeholder="Add Weight Name"
            value={weight.name || ""}
            onChange={(e) => setWeight({ ...weight, name: e.target.value })} 
            required
          />
          <label htmlFor="floatingInput">Weight Name</label>
        </div>
      </div>
      <button className='submit-button' type="submit">{listId==null? "Add" : "update" }</button>
  </form>

  )
}

export default AddWeight
