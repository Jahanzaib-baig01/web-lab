const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const User = require("../models/User");
router.use(bodyParser.urlencoded({ extended: true }));
// Update data route
router.post('/profile/:id',async (req, res) => {
    console.log(req.params.id);
    // console.log(req.params.email)
    const updateduser = await User.findOneAndUpdate( 
      {_id : req.params.id},
      {email : req.body.email},
      { new: true }
    );

    if (!updateduser) {
      req.setFlash("danger", "Email is not Updated! Try Again..");
      return res.redirect("/profile");
    }
    else{
      req.setFlash("success", "Update Email Successfully!");
      return res.redirect("/");
    }
});

module.exports = router;
