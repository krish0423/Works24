import express from 'express';
import db from '../utils/db.js';

const router = express.Router();

// Route to add a new tour plan
router.post('/add', async (req, res) => {
    const { employee_id, from_date, from_location, to_date, to_location, name, state, city, approx_distance, description } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO tour_plans (employee_id, from_date, from_location, to_date, to_location, name, state, city, approx_distance, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [employee_id, from_date, from_location, to_date, to_location, name, state, city, approx_distance, description]
        );

        res.status(201).json({ success: true, tourPlan: result.rows[0] });
    } catch (error) {
        console.error('Error adding tour plan:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Route to fetch tour plans for a specific employee
router.get('/employee/:employeeId', async (req, res) => {
    const { employeeId } = req.params;

    try {
        const result = await db.query(
            'SELECT * FROM tour_plans WHERE employee_id = $1 ORDER BY from_date DESC',
            [employeeId]
        );

        res.status(200).json({ success: true, tourPlans: result.rows });
    } catch (error) {
        console.error('Error fetching tour plans:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export default router;
