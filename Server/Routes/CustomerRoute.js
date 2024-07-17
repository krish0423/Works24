import express from "express";
import db from "../utils/db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/visiting_cards');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to add a new customer
router.post('/add', upload.single('visitingCard'), async (req, res) => {
    const { name, companyName, work, email, mobile, address } = req.body;
    const visitingCard = req.file ? req.file.filename : null;

    try {
        const result = await db.query(
            "INSERT INTO customers (name, company_name, work, email, mobile, address, visiting_card) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, companyName, work, email, mobile, address, visitingCard]
        );

        res.status(201).json({ success: true, message: "Customer added successfully", customer: result.rows[0] });
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Route to fetch all customers
router.get('/', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM customers");
        res.status(200).json({ success: true, customers: result.rows });
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;