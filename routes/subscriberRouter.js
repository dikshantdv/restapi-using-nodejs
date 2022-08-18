const express = require("express");
const Subscriber = require("../models/subscriberModel");

const router = express.Router();

const getSubscriber = async (req, res, next) => {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) res.send(404).json({ message: "Subscriber not found" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subscriber = subscriber;
  next();
};

router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getSubscriber, (req, res) => {
  res.status(200).json({ name: res.subscriber.name });
});

router.post("/", async (req, res) => {
  try {
    const subscriber = new Subscriber({
      name: req.body.name,
      subscriberToChannel: req.body.subscriberToChannel,
    });
    const newSubscriber = await subscriber.save();
    res.status(201).json({ subscriber: newSubscriber });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name) res.subscriber.name = req.body.name;
  if (req.body.subscriberToChannel)
    res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.status(200).json({ updatedSubscriber });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.status(201).json({ message: "Deleted subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
