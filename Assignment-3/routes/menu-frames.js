const express = require("express");
let router = express.Router();
let Frame = require("../models/Frames");
router.use(express.urlencoded({ extended: true }));
// cart
router.get("/frames/cart", async (req, res) => {
  let cart = req.cookies["cart"];
  if (!cart) cart = [];
  let products = await Frame.find({ _id: { $in: cart } });
  let total = 0;
  for (let index = 0; index < products.length; index++) {
    total += products[index].Price;
  }
  return res.render("cart", {pageTitle: "Frames Cart ", products, total });
});
router.get("/frames/remove-from-cart/:id", (req, res) => {
  let cart = req.cookies["cart"];
  if (!cart) cart = [];
  let index = cart.find((c) => c == req.params.id);
  cart.splice(index, 1);

  res.cookie("cart", cart);
  return res.redirect("back");
});

router.get("/frames/add-to-cart/:id", (req, res) => {
  let cart = req.cookies["cart"];
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  return res.redirect("back");
});

router.get("/frames", async (req, res) => {
    let frames = await Frame.find();
    //   return res.send(masks);
    res.render("Frames/frames", {
      frames,
    });
  });
  router.get("/framesinventory", async (req, res) => {
    let frames = await Frame.find();
    //   return res.send(masks);
    res.render("Frames/framesinventory", {
      frames,
      pageTitle: "Frames From Menu",
    });
  }); 
// For Delete
  router.post("/framesinventory", async (req, res) => {
    console.log("inside frames inventory route")
    console.log(req.body.id);
    const frames = await Frame.findOneAndDelete( 
      {_id : req.body.id}
    );

    if (!frames) {
      req.setFlash("danger", "Frame is not Delete! Try Again..");
      return res.send("error");
    }
    else{
      req.setFlash("success", "Delete Frame Successfully!");
      return res.redirect("/frames");
    }
  });

  router.get('/addframes', (req, res) => {
    // Add your logic for rendering the updateframes page or performing other operations
    res.render("Frames/addframes"); 
  });
//add router
// Define the route handler for posting data
router.post('/addframes', async (req, res) => {
  try {
    // Retrieve the data from the request body
    const { name, details, Price, rating, isPublished } = req.body;

    // Create a new frame object
    const newFrame = new Frame({
      name,
      details,
      Price,
      rating,
      isPublished,
    });

    // Save the frame to the database
    await newFrame.save();
    req.setFlash("success", "Add Frame Successfully!");
      return res.redirect("/frames");
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
//update router
router.get('/updateframes', (req, res) => {
  // Add your logic for rendering the updateframes page or performing other operations
  res.render("Frames/updateframes"); 
});

router.get('/getframeid',async (req, res) => {
  console.log(req.query.id);
  return res.render('Frames/updateframes', {id: req.query.id});
});
router.post('/updateframes',async (req, res) => {
  console.log(req.body.id);
  const updatedframe= await Frame.findOneAndUpdate( 
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

  if (!updatedframe) {
    req.setFlash("danger", "Frame is not Updated! Try Again..");
    return res.redirect("/updateframes");
  }
  else{
    req.setFlash("success", "Update Frame Successfully!");
    return res.redirect("/frames");
  }
});
module.exports = router;