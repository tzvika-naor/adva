const express = require('express');
const router = express.Router();
const SmartphoneController = require('../controllers/smartphone');

router.get("", SmartphoneController.getSmartphones); //all Smartphone
router.get("/:id", SmartphoneController.getSmartphone); // single Smartphone
router.get("/count/smartphonesCount", SmartphoneController.getSmartphonesCount);
router.post("", SmartphoneController.createSmartphone); // add a new Smartphone to the database
router.post("/searchquery", SmartphoneController.searchQuery); //all Smartphone
router.put("/:id", SmartphoneController.updateSmartphone); //update an existing Smartphone
router.delete("/:id", SmartphoneController.deleteSmartphone);
router.post("/searchByProcessor", SmartphoneController.searchByProcessor); //all Smartphone



module.exports = router;