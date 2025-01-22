import React, {  useState,useEffect } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from "react-router-dom";

const AddCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "" }); 
  const queryParams = new URLSearchParams(location.search);
  const listId = queryParams.get("id"); 

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/category/"+listId);
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    if(listId!=null){
      fetchCategory();
    }
  }, []);

      const handleSubmit = (e) => {
        e.preventDefault();
        if(listId==null){
            axios.post('http://localhost:5000/AddCategory', category)
            .then(response => {
              console.log('Item added:', response.data);
              setCategory({ name: "" }); // Reset form for adding
              navigate('/listcategory')

            })
            .catch(err => {
              console.error('Error adding item:', err);
            });
        }
        else{
          axios.put('http://localhost:5000/category/'+listId, category)
            .then(response => {
              console.log('updated:', response.data);
              setCategory({ name: "" }); // Reset form for adding
              navigate('/listcategory')
            })
            .catch(err => {
              console.error('Error updating item:', err);
            });
        }
    };
  return (
    <form onSubmit={handleSubmit}>    
        {listId==null
          ? <div className="page-header"><h2>Add New Category</h2></div>
          : <div className="page-header"><h2>Update Category</h2></div>}
      <div className="row">
        <div className="form-floating mb-3">
          <input
            type="text" className="form-control"
            placeholder="Add Category Name"
            value={category.name || ""}
            onChange={(e) => setCategory({ ...category, name: e.target.value })} 
            required
          />
          <label>Category Name</label>
        </div>
      </div>
      <button className='submit-button' type="submit">{listId==null? "Add" : "update" }</button>
  </form>
  )
}

export default AddCategory
