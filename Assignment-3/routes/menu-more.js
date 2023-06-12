const express = require("express");
let router = express.Router();
let Moreproducts = require("../models/Moreproducts");

router.get("/moreproducts/cart", async (req, res) => {
  let cart = req.cookies["cart"];
  if (!cart) cart = [];
  let products = await Moreproducts.find({ _id: { $in: cart } });
  let total = 0;
  for (let index = 0; index < products.length; index++) {
    total += products[index].Price;
  }
  return res.render("cart", {pageTitle: "Products Cart ", products, total });
});
router.get("/moreproducts/remove-from-cart/:id", (req, res) => {
  let cart = req.cookies["cart"];
  if (!cart) cart = [];
  let index = cart.find((c) => c == req.params.id);
  cart.splice(index, 1);

  res.cookie("cart", cart);
  return res.redirect("back");
});
router.get("/moreproducts/add-to-cart/:id", (req, res) => {
  let cart = req.cookies["cart"];
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  return res.redirect("back");
});

router.get("/moreproducts", async (req, res) => {
    let moreproducts = await Moreproducts.find();
    //   return res.send(masks);
    res.render("Products/moreproducts", {
    moreproducts,

    });
  });

  router.get("/productsinventory", async (req, res) => {
    let moreproducts = await Moreproducts.find();
    //   return res.send(masks);
    res.render("Products/productsinventory", {
      moreproducts,
      pageTitle: "Products Inventory",
    });
  });
  // For Delete
  router.post("/productsinventory", async (req, res) => {
    console.log("inside masks inventory route")
    console.log(req.body.id);
    const moreproducts = await Moreproducts.findOneAndDelete( 
      {_id : req.body.id}
    );

    if (!moreproducts) {
      req.setFlash("danger", "Product is not Delete! Try Again..");
      return res.send("error");
    }
    else{
      req.setFlash("success", "Delete Product Successfully!");
      return res.redirect("/moreproducts");
    }
  });
  router.get('/addproducts', (req, res) => {
    // Add your logic for rendering the updateframes page or performing other operations
    res.render("Products/addproducts"); 
  });

// Define the route handler for posting data
router.post('/addproducts', async (req, res) => {
  try {
    // Retrieve the data from the request body
    const { name, details, Price, rating, isPublished,image } = req.body;

    // Create a new frame object
    const newproduct = new Moreproducts({
      name,
      details,
      Price,
      rating,
      isPublished,
      image,
    });

    // Save the frame to the database
    await newproduct.save();
    req.setFlash("success", "Add Product Successfully!");
      return res.redirect("/moreproducts");
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//update router
router.get('/updateproducts', (req, res) => {
  // Add your logic for rendering the updateframes page or performing other operations
  res.render("Poducts/updateproducts"); 
});

router.get('/getproductid',async (req, res) => {
  console.log(req.query.id);
  return res.render('Products/updateproducts', {id: req.query.id});
});
router.post('/updateproducts',async (req, res) => {
  console.log(req.body.id);
  const product= await Moreproducts.findOneAndUpdate( 
    { _id: req.body.id },
    {
      name: req.body.name,
      details: req.body.details,
      Price: req.body.Price,
      rating: req.body.rating,
      isPublished: req.body.isPublished,
      image:req.body.image
    },
    { new: true }
  );

  if (!product) {
    req.setFlash("danger", "Product is not Updated! Try Again..");
    return res.redirect("/updatemasks");
  }
  else{
    req.setFlash("success", "Update Product Successfully!");
    return res.redirect("/moreproducts");
  }
});
  module.exports = router;