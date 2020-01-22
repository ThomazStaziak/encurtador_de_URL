const Shorter = require("../models/Shorter");
const differenceInHours = require("date-fns/differenceInHours");

module.exports = {
  async createURL(req, res) {
    const shortURL = Math.random()
      .toString(36)
      .slice(2, 7);

    const response = await Shorter.create({
      shortURL
    });

    return res.status(201).json(response);
  },
  async createCustomURL(req, res) {
    const { URL } = req.body;

    if (URL.length > 5) {
      return res
        .status(400)
        .json({ error: "The URL must to be lower than 4 characters" });
    }

    const URLExists = await Shorter.findOne({ shortURL: URL });

    if (URLExists) {
      return res.status(400).json({ error: "The URL already exists" });
    }

    const response = await Shorter.create({
      shortURL: URL
    });

    return res.status(200).json(response);
  },

  async checkURL(req, res) {
    const URLExists = await Shorter.findOne({ shortURL: req.params.url });

    if (!URLExists) {
      return res.status(404).json({ error: "The URL doesn`t exists" });
    }

    const URLTimeOfCreation = URLExists.createdAt;

    const difference = differenceInHours(new Date(), URLTimeOfCreation);

    if (difference > 10) {
      return res.status(400).json({ error: "Your URL is expired" });
    }

    return res.redirect("https://github.com/ThomazStaziak");
  }
};
