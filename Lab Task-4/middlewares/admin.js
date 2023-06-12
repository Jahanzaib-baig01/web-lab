//
module.exports = function (req, res, next) {
    let roles = req.session.user.role;
    console.log(roles);
    let admin = roles.find((r) => r == "Admin");
    if (admin) next();
    else {
      req.setFlash("danger", "You need to be an admin to access this resource");
      res.redirect("back");
    }
  };