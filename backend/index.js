const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');
const bcrypt = require('bcrypt');


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const db = mysql.createConnection({
    host: 'localhost', 
    port: 3308,
    user: 'root',      
    password: '',      
    database: 'vpmserver' 
  });
  
  db.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database!");
  });
  
//category
app.post('/AddCategory', (req, res) => {
    const val = req.body;
    var sql= "INSERT INTO category (name) VALUES (?)";
    db.query(sql,[val.name] , (err, rows, fields) => {
        if (!err){
            res.send("inserted successfully");         
        }
        else
            console.log (err);
    });
});

// API to list all category
app.get('/getallcategory', (req, res) => {
    const query = 'SELECT * FROM category';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching category:', err);
            return res.status(500).json({ error: 'Database error.' });
        }

        res.status(200).json(results);
    });
});
// Fetch a single category by ID
app.get('/category/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM category WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).send(err.message);
      res.json(results[0]);
    });
  });
//Delete a category

app.delete('/category/:id', (req, res) => {
    const { id } = req.params;
          const deleteQuery = 'DELETE FROM category WHERE id = ?';
        db.query(deleteQuery, [id], (deleteErr, result) => {
          if (deleteErr) return res.status(500).json({ error: 'Database query error' });
          res.json({ message: 'category deleted successfully' });
        });
});  
 // Edit a category
  
 app.put('/category/:id',  (req, res) => {

    const { id } = req.params;
    const { name} = req.body;
    console.log(id,name)
    let query = 'UPDATE category SET name = ? ';
    const values = [name];
  
    query += ' WHERE id = ?';
    values.push(id);
  
    db.query(query, values, (err, result) => {
      if (err) return res.status(500).send(err.message);
      res.json({ message: 'category updated successfully' });
    });
  });



// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// API to create a product
app.post('/products', upload.single('image'), (req, res) => {
    const { name, description, old_price,new_price,category,available,weight } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    console.log("File uploaded:", req.file); // Uploaded file information
    console.log("Other form data:", req.body); // Other form fields

    const query = 'INSERT INTO products (name, description, old_price,new_price, image,category,available,weight) VALUES (?,?, ?, ?,?, ?,?,?)';
    db.query(query, [name, description, old_price,new_price, imageUrl,category,available,weight], (err, result) => {
        if (err) {
            console.error('Error inserting product:', err);
            return res.status(500).json({ error: 'Database error.' });
        }

        res.status(201).json({
            message: 'Product created successfully.',
            product: {
                id: result.insertId,
                name,
                description,
                old_price,
                new_price,
                image: imageUrl,
                category,
                available
            }
        });
    });
});

// API to list all products
app.get('/getallproducts', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ error: 'Database error.' });
        }

        res.status(200).json(results);
    });
});
// Fetch a single product by ID
app.get('/product/:id', (req, res) => {
    
    const { id } = req.params;
    const query = 'SELECT * FROM products WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).send(err.message);
      console.log(results[0])
      res.json(results[0]);
    });
  });
  // Edit a category
  
 app.put('/product/:id',  (req, res) => {
    const { name, description, old_price,new_price,category,available,weight } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const { id } = req.params;

    let query = 'UPDATE products SET name = ? ,description= ?, old_price= ?,new_price= ?, image= ?,category= ?,available= ?,weight=?';
    const values = [name, description, old_price,new_price, imageUrl,category,available,weight];
  
    query += ' WHERE id = ?';
    values.push(id);
  
    db.query(query, values, (err, result) => {
      if (err) return res.status(500).send(err.message);
      res.json({ message: 'product updated successfully' });
    });
  });


//Delete a product
app.delete('/product/:id', (req, res) => {
    const { id } = req.params;
  
    // Step 1: Fetch the product to retrieve the image path
    const getImageQuery = 'SELECT image FROM products WHERE id = ?';
    db.query(getImageQuery, [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database query error' });
      if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
  
      const imagePath = `.${results[0].image_path}`; // Local file path for deletion
  
      // Step 2: Delete the image file
      fs.unlink(imagePath, (fsErr) => {
        if (fsErr) console.error('Error deleting file:', fsErr);
  
        // Step 3: Delete the product from the database
        const deleteQuery = 'DELETE FROM products WHERE id = ?';
        db.query(deleteQuery, [id], (deleteErr, result) => {
          if (deleteErr) return res.status(500).json({ error: 'Database query error' });
          res.json({ message: 'Product deleted successfully' });
        });
      });
    });
});  


//weight

app.post('/AddWeight', (req, res) => {
    const val = req.body;
    var sql= "INSERT INTO weight (name) VALUES (?)";
    db.query(sql,[val.name] , (err, rows, fields) => {
        if (!err){
            res.send("inserted successfully");         
        }
        else
            console.log (err);
    });
});

// API to list all weight
app.get('/getallweight', (req, res) => {
    const query = 'SELECT * FROM weight';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching weight:', err);
            return res.status(500).json({ error: 'Database error.' });
        }

        res.status(200).json(results);
    });
});
// Fetch a single weight by ID
app.get('/weight/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM weight WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).send(err.message);
      res.json(results[0]);
    });
  });
//Delete a weight

app.delete('/weight/:id', (req, res) => {
    const { id } = req.params;
          const deleteQuery = 'DELETE FROM weight WHERE id = ?';
        db.query(deleteQuery, [id], (deleteErr, result) => {
          if (deleteErr) return res.status(500).json({ error: 'Database query error' });
          res.json({ message: 'weight deleted successfully' });
        });
});  
 // Edit a weight
  
 app.put('/weight/:id',  (req, res) => {

    const { id } = req.params;
    const { name} = req.body;
    console.log(id,name)
    let query = 'UPDATE weight SET name = ? ';
    const values = [name];
  
    query += ' WHERE id = ?';
    values.push(id);
  
    db.query(query, values, (err, result) => {
      if (err) return res.status(500).send(err.message);
      res.json({ message: 'weight updated successfully' });
    });
  });


// API to get products by category
app.get("/products/category/:categoryName", (req, res) => {
  const categoryName = req.params.categoryName;

  const query = `
    SELECT p.*, c.name AS category_name
    FROM products p
    JOIN category c ON p.category = c.id
    WHERE c.name = ?
  `;

  db.query(query, [categoryName], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.json(results);
    }
  });
});


  
  // Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});