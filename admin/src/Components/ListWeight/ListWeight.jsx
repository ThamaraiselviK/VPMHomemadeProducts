import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cross_icon from '../../assets/cross_icon.png'
import edit_icon from '../../assets/edit_icon.png'
import { useNavigate } from "react-router-dom";

const ListWeight = () => {
  const [weight, setWeight] = useState([]);
const navigate = useNavigate();
    // Fetch all weight
    const fetchWeight = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getallweight");
        setWeight(response.data);
      } catch (error) {
        console.error("Error fetching weight:", error);
      }
    };
  
    useEffect(() => {
      fetchWeight();
    }, []);

    const remove_weight = async (weight) => {
      if (!window.confirm('Are you sure you want to delete this weight?')) return;
      try {
        await axios.delete(`http://localhost:5000/weight/${weight.id}`);
        alert('weight deleted successfully');
        fetchWeight(); // Refresh the product list after deletion
      } catch (error) {
        console.error('Error deleting weight', error);
      }
    };
    const edit_weight = async(id)=>{
      console.log(id)
      navigate(`/addweight?id=${id}`);

    }
  return (
     <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col-4">Weight Name</th>
                <th scope="col-4">Edit</th>
                <th scope="col-4">Delete</th>
              </tr>
            </thead>
            <tbody>
                {weight.map((weight,index)=>{
                      return<tr key={index} scope="row">
                        <td><p>{weight.name}</p></td>
                        <td><img onClick={() => edit_weight(weight.id)} src={edit_icon} alt="" className="listproduct-remove-icon" /></td>
                        <td><img onClick={() => remove_weight(weight)} src={cross_icon} alt="" className="listproduct-remove-icon" /></td>
                      </tr>
                  })}
              
            </tbody>
          </table>
         
        </div>
    
  )
}

export default ListWeight
