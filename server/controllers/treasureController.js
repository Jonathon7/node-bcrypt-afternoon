const dragonTreasure = async (req, res) => {
  const db = req.app.get("db");

  const treasure = await db.get_dragon_treasure(1);
  return res.status(200).json(treasure);
};

const getUserTreasure = async (req, res) => {
  const db = req.app.get("db");

  try {
    const userTreasure = await db.get_user_treasure([req.session.user.id]);
    res.status(200).send(userTreasure);
  } catch (e) {
    res.status(500).json("error");
  }
};

const addUserTreasure = async (req, res) => {
  const { treasureURL } = req.body;
  const { id } = req.session.user;
  const userTreasure = await req.app
    .get("db")
    .add_user_treasure([treasureURL, id]);
  return res.status(200).json(userTreasure);
};

const getAllTreasure = async (req, res) => {
  const allTreasure = await req.app.get("db").get_all_treasure();
  return res.status(200).send(allTreasure);
};

module.exports = {
  dragonTreasure,
  getUserTreasure,
  addUserTreasure,
  getAllTreasure
};
