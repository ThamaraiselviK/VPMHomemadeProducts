import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import Footer from './Components/Footer/Footer';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/cooking' element={<ShopCategory banner="cooking" category="cooking" categoryName="cooking"/>}/>
          <Route path='/herbal' element={<ShopCategory banner="herbal" category="herbal"/>}/>
          <Route path='/stationary' element={<ShopCategory banner="stationary" category="stationary"/>}/>
          <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
