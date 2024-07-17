import express from 'express';
import db from '../utils/db.js';

const router = express.Router();

// Route to add a new call report
// router.post('/add', async (req, res) => {
//     console.log("This is we got from req.body in callreport", req.body)
//     const { employee_id, date, current_location, live_photo, remark, next_follow_up_date } = req.body;


//     try {
//         const result = await db.query(
//             'INSERT INTO call_reports (employee_id, date, current_location, live_photo, remark, next_follow_up_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
//             [employee_id, date, current_location, live_photo, remark, next_follow_up_date]
//         );

//         res.status(201).json({ success: true, callReport: result.rows[0] });
//     } catch (error) {
//         console.error('Error adding call report:', error);
//         res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
// });


router.post('/add', async (req, res) => {
    console.log("This is we got from req.body in callreport", req.body);
    
    const { employee_id, date, current_location, live_photo, remark, next_follow_up_date } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO call_reports (employee_id, date, current_location, live_photo, remark, next_follow_up_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [employee_id, date, current_location, live_photo, remark, next_follow_up_date]
        );

        res.status(201).json({ success: true, callReport: result.rows[0] });
    } catch (error) {
        console.error('Error adding call report:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/employee/:employeeId', async (req, res) => {
    const { employeeId } = req.params;

    try {
        const result = await db.query(
            'SELECT * FROM call_reports WHERE employee_id = $1 ORDER BY date DESC',
            [employeeId]
        );

        res.status(200).json({ success: true, callReports: result.rows });
    } catch (error) {
        console.error('Error fetching call reports:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export default router;
