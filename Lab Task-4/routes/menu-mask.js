const express = require("express");
let router = express.Router();
let Mask = require("../models/Masks");


router.get("/masks/cart", async (req, res) => {
  let cart = req.cookies["cart"];
  if (!cart) cart = [];
  let products = await Mask.find({ _id: { $in: cart } });
  let total = 0;
  for (let index = 0; index < products.length; index++) {
    total += products[index].Price;
  }
  return res.render("cart", {pageTitle: "Masks Cart ", products, total });
});
router.get("/masks/remove-from-cart/:id", (req, res) => {
  let cart = req.cookies["cart"];
  if (!cart) cart = [];
  let index = cart.find((c) => c == req.params.id);
  cart.splice(index, 1);

  res.cookie("cart", cart);
  return res.redirect("back");
});
router.get("/masks/add-to-cart/:id", (req, res) => {
  let cart = req.cookies["cart"];
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  return res.redirect("back");
});


router.get("/masks", async (req, res) => {
    let masks = await Mask.find();
    //   return res.send(masks);
    res.render("Masks/masks", {
      masks,
      pageTitle: "Masks From Menu",
    });
  });

  router.get("/masksinventory", async (req, res) => {
    let masks = await Mask.find();
    //   return res.send(masks);
    res.render("Masks/masksinventory", {
      masks,
    });
  });
  // For Delete
  router.post("/masksinventory", async (req, res) => {
    console.log("inside masks inventory route")
    console.log(req.body.id);
    const masks = await Mask.findOneAndDelete( 
      {_id : req.body.id}
    );

    if (!masks) {
      req.setFlash("danger", "Mask is not Delete! Try Again..");
      return res.send("error");
    }
    else{
      req.setFlash("success", "Delete Mask Successfully!");
      return res.redirect("/masks");
    }
  });
  router.get('/addmasks', (req, res) => {
    // Add your logic for rendering the updateframes page or performing other operations
    res.render("Masks/addmasks"); 
  });

// Define the route handler for posting data
router.post('/addmasks', async (req, res) => {
  try {
    // Retrieve the data from the request body
    const { name, details, Price, rating, isPublished } = req.body;

    // Create a new frame object
    const newMask = new Mask({
      name,
      details,
      Price,
      rating,
      isPublished,
    });

    // Save the frame to the database
    await newMask.save();
    req.setFlash("success", "Add Mask Successfully!");
      return res.redirect("/masks");
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

//update router
router.get('/updatemasks', (req, res) => {
  // Add your logic for rendering the updateframes page or performing other operations
  res.render("Masks/updatemasks"); 
});

router.get('/getmaskid',async (req, res) => {
  console.log(req.query.id);
  return res.render('Masks/updatemasks', {id: req.query.id});
});
router.post('/updatemasks',async (req, res) => {
  console.log(req.body.id);
  const updatedmask= await Mask.findOneAndUpdate( 
    { _id: req.body.id },
    {
      name: req.body.name,
      details: req.body.details,
      Price: req.body.Price,
      rating: req.body.rating,
      isPublished: req.body.isPublished
    },
    { new: true }
  );

  if (!updatedmask) {
    req.setFlash("danger", "Mask is not Updated! Try Again..");
    return res.redirect("/updatemasks");
  }
  else{
    req.setFlash("success", "Update Mask Successfully!");
    return res.redirect("/masks");
  }
});
  module.exports = router;