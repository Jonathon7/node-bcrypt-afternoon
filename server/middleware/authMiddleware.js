const usersOnly = (req, res, next) => {
  if (!req.session.user) {
    res.status(401).json("Please log in");
  } else {
    next();
  }
};

const adminsOnly = (req, res, next) => {
  if (!req.session.user.isAdmin) {
    return res.status(403).send("You are not an admin");
  }
  next();
};

module.exports = {
  usersOnly,
  adminsOnly
};
