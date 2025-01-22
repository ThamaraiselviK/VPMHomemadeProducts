import React,{useState,useEffect} from 'react'
import './AddProduct.css'
import axios from "axios";
import upload_area from '../../assets/upload_area.png'
import { useNavigate,useLocation } from "react-router-dom";
 

const AddProduct = () => {
    const [image,setImage] = useState(null);
    const [imageUpdate,setImageUpdate] = useState(null);
    const [productDetails,setProductDetails] = useState({
        name:'',
        image:'',
        category:"",
        weight:"",
        new_price:'',
        old_price:'',
        description:'',  
        available:''
    })
    const location = useLocation();
    const navigate = useNavigate();
  
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get("id"); // "react"
  
    const imageHandler = (event) =>{
        setImage(event.target.files[0])
    }
    const changeHandler=(e)=>{
        const { name, value } = e.target; 
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value, 
        }));    
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", productDetails.name);
        formData.append("category", category);
        formData.append("weight", weight);
        formData.append("new_price", productDetails.new_price);
        formData.append("old_price", productDetails.old_price);
        formData.append("image", image); // Append the image file
        formData.append("description", productDetails.description);
        formData.append("available", productDetails.available);
        if(productId==null){
          console.log(formData)
            try {
              const response = await axios.post("http://localhost:5000/products",formData,{
                headers: {
                    "Content-Type": "multipart/form-data", // Ensure multipart/form-data header is set
                },
              });
              console.log("Form submitted successfully:", response.data);
              navigate('/listproduct')
              
            } catch (error) {
              console.error("Error fetching category:", error);
            }
          }
          else{
            console.log("else")
            axios.put('http://localhost:5000/product/'+productId, productDetails,imageUpdate)
            .then(response => {
              setProductDetails({name:'',
                image:'',
                category:"",
                new_price:'',
                old_price:'',
                description:'',  
                available:''}); // Reset form for adding
              navigate('/listproduct')
            })
            .catch(err => {
              console.error('Error updating item:', err);
            });
        }
          
      };
      let [categoryData, setCategoryData] = useState([]); 
      let [category, setCategory] = useState(); 
      let [weightData, setWeightData] = useState([]); 
      let [weight, setWeight] = useState(); 

      const fetchCategory = async () => {
        try {
          const response = await axios.get("http://localhost:5000/getallcategory");
          setCategoryData(response.data);
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };
      const fetchWeight = async () => {
        try {
          const response = await axios.get("http://localhost:5000/getallweight");
          setWeightData(response.data);
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };
      
     
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get("http://localhost:5000/product/"+productId);
          console.log(response.data.image)
          setProductDetails(response.data);
          setImageUpdate(response.data.image)
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };
      if(productId!=null){
        fetchProduct();
  
      }
      fetchCategory();
      fetchWeight();
  
     }, []);
  
  
    
    
  return (
    <>
      <form onSubmit={handleSubmit}>
      {productId==null? <h2>Add New Product</h2>: <h2>update Product</h2>}
      <div className="row">
          <div className="form-floating mb-3">
            <input required value={productDetails.name} onChange={changeHandler} type="text" name='name' className="form-control"/>
            <label>Name of the Product</label>
          </div>
        </div>
        <div className="row">
          <div className="form-floating mb-3 col">
            <input required id="oldPriceID" value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' className="form-control" />
            <label>Old Price of Product</label>
          </div>
          <div className="form-floating mb-3 col">
            <input required  value={productDetails.new_price} onChange={changeHandler}type="text" name='new_price' className="form-control" />
            <label>New Price of Product</label>
          </div>
        </div>

        <div className="row">
          <div className="form-floating mb-3">
            <div className="form-floating">
              <select required className="form-select" value={category}   onChange={(e) => setCategory(e.target.value)}>
                <option value=""></option>
                {categoryData.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
                ))}
              </select>
              
              <label >Select Category Type</label>
            </div>
          </div>
        </div>

        <div className="row">
          <p>Product Image</p>
            <label htmlFor="file-input" >
            {productId==null
          ? <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
          : <img src={`http://localhost:5000${imageUpdate}`} alt="" className="listproduct-product-item" />}
                  
              </label>
              <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
        </div>

        <div className="row">
          <div className="form-floating mb-3 col">
          <select required className="form-select" value={weight}   onChange={(e) => setWeight(e.target.value)}>
                <option value=""></option>
                {weightData.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
                ))}
              </select>
              
              <label >Select Weight Type</label>
          </div>
          <div className="form-floating mb-3 col">
            
            <input required value={productDetails.available} onChange={changeHandler} type="text" name='available' className="form-control"/>
            <label>Avalability of the Product</label>
          </div>
        </div>

        <div className="row">
          <div className="form-floating mb-3 col">
            <input required value={productDetails.description} onChange={changeHandler} type="text" name='description' className="form-control"/>
            <label htmlFor="floatingInput">Description of the Product</label>
          </div>
        </div>
        <button type="submit" className='submit-button'>{productId==null
          ? "Add" 
          : "update" }</button>
      </form>

    
    </>
  )
}

export default AddProduct
