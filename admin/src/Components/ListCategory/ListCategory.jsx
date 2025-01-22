import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cross_icon from '../../assets/cross_icon.png'
import edit_icon from '../../assets/edit_icon.png'
import { useNavigate } from "react-router-dom";

const ListCategory = () => {
  const [category, setCategory] = useState([]);
const navigate = useNavigate();
    // Fetch all category
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getallcategory");
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
  
    useEffect(() => {
      fetchCategory();
    }, []);

    const remove_product = async (category) => {
      if (!window.confirm('Are you sure you want to delete this category?')) return;
      try {
        await axios.delete(`http://localhost:5000/category/${category.id}`);
        alert('category deleted successfully');
        fetchCategory(); // Refresh the product list after deletion
      } catch (error) {
        console.error('Error deleting category', error);
      }
    };
    const edit_category = async(id)=>{
      console.log(id)
      navigate(`/addcategory?id=${id}`);

    }
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col-4">Category Name</th>
            <th scope="col-4">Edit</th>
            <th scope="col-4">Delete</th>
          </tr>
        </thead>
        <tbody>
            {category.map((category,index)=>{
                  return<tr key={index} scope="row">
                    <td><p>{category.name}</p></td>
                    <td><img onClick={() => edit_category(category.id)} src={edit_icon} alt="" className="listproduct-remove-icon" /></td>
                    <td><img onClick={() => remove_product(category)} src={cross_icon} alt="" className="listproduct-remove-icon" /></td>
                  </tr>
              })}
          
        </tbody>
      </table>
     
    </div>
  )
}

export default ListCategory
