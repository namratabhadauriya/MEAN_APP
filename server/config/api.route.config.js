const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require('cors');
const mongoAdaptor = require('../mongo-adaptor');

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

router.get('/api/getStocks', (req, res) =>
    mongoAdaptor.find(req, res, { collection: "stock" })
);
router.post('/api/addStocks', (req, res) =>
    mongoAdaptor.insertMany(req, res, { collection: "stock" })
);

module.exports = router;