const express = require("express");
const router = express.Router();
const Partner = require("../models/Partner");

// Create Partner
router.post("/", async (req, res) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json(partner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Partners
router.get("/", async (req, res) => {
  const partners = await Partner.find();
  res.json(partners);
});

// Get Single Partner
router.get("/:id", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "Not Found" });
    res.json(partner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update Partner
router.put("/:id", async (req, res) => {
  try {
    const updatedPartner = await Partner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPartner)
      return res.status(404).json({ message: "Partner not found" });

    res.json(updatedPartner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Partner
router.delete("/:id", async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner)
      return res.status(404).json({ message: "Partner not found" });

    res.json({ message: "Partner deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;