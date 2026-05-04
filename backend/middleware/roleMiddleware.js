const isAdmin = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ msg: "Access Denied. Admin Only" });
  }
  next();
};

module.exports = isAdmin;