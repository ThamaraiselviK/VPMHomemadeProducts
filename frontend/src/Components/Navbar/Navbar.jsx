import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Navbar.css'
import logo from '../Assets/logo.png'
import signin from '../Assets/signin.png'
import cart from '../Assets/cart.png'

import {useCart} from '../../ContextApis/CartContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menu,setMenu] = useState("home");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [products, setProducts] = useState([]);
  const { totalQuantity } = useCart();

  const filteredProducts = products
  .filter((product) => {
    // Filter by search query (case-insensitive)
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    // console.log(matchesSearch)
    return matchesSearch;
  })
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getallproducts");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <nav className="greenbg">
        <div className="container">
            <div className='row'>
                <div className='col-md-3'><img src={logo} alt="Logo" className="logo-img" /></div>
                <div className="col-md-6">

                    {/* Search Bar */}
                    <div style={{ marginBottom: "20px" }}>
                        <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='productSearchBox'
                        
                        />
                    </div>
                </div>
                <div className='col-md-3 signin'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="row align-items-center">
                                <div className='col-md-6 signin-img'><img src={signin} alt="" /></div>                                
                                <div className="col-md-6 signin-name"><Link to='/login'>Login</Link></div>
                            </div>
                        </div>
                        <div className='col-md-6'>
                        <div className="row align-items-center">
                        <Link to='/cart' className='cartA'>
                            <div className='col-md-6 signin-img'><img src={cart} alt="" />
                                <span className="spanTotal">
                                    {totalQuantity}
                                </span>
                            </div>
                            <div className="col-md-6 signin-name">Cart</div>
    
                        </Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className='navbar'>
                    <div className="nav-menu">
                        <div className='col-md-3'><button onClick={()=>setMenu("home")}><Link to='/'>Home</Link>{menu === "home" ?<hr className='shine'/>:<></>}</button></div>
                        <div className='col-md-3'><button onClick={()=>setMenu("cooking")}><Link to="/cooking"> cooking</Link>{menu === "women" ?<hr className='shine'/>:<></>}</button></div>
                        <div className='col-md-3'><button onClick={()=>setMenu("herbal")}><Link to='/herbal'>herbal</Link>{menu === "men" ?<hr className='shine'/>:<></>}</button></div>
                        <div className='col-md-3'><button onClick={()=>setMenu("stationary")}><Link to='/stationary'>Stationary</Link>{menu === "kid" ?<hr className='shine'/>:<></>}</button></div>
                    </div>
                </div>
            </div>
            
        </div>
       </nav>
    </div>
  )
}

export default Navbar
