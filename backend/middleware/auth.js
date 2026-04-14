const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.header("Authorization");

  if (!header) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  const token = header.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

