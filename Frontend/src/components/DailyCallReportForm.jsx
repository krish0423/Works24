// import React, { useState } from 'react';
// import axios from 'axios';

// function DailyCallReportForm({ employeeId }) {
//     const [callReport, setCallReport] = useState({
//         employee_id: employeeId,
//         date: '',
//         current_location: '',
//         live_photo: '',
//         remark: '',
//         next_follow_up_date: ''
//     });
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCallReport({ ...callReport, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setCallReport({ ...callReport, live_photo: e.target.files[0] });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         Object.keys(callReport).forEach(key => {
//             formData.append(key, callReport[key]);
//         });
//         console.log("This is the formdate we got: ", formData)
//         axios.post('http://localhost:3000/callreport/add', formData, {
//             // headers: { 'Content-Type': 'multipart/form-data' }
//         })
//         // axios.post('http://localhost:3000/tourplan/add', tourPlan)
//             .then(result => {
//                 console.log("This is the data we got from dailycallreport : ", result)
//                 if (result.data.success) {
//                     setSuccessMessage('Call report added successfully.');
//                     setError('');
//                     setCallReport({
//                         employee_id: employeeId,
//                         date: '',
//                         current_location: '',
//                         live_photo: '',
//                         remark: '',
//                         next_follow_up_date: ''
//                     });
//                 } else {
//                     setError(result.data.error);
//                     setSuccessMessage('');
//                 }
//             })
//             .catch(err => {
//                 console.error('Error adding call report:', err);
//                 setError('An error occurred while adding the call report.');
//                 setSuccessMessage('');
//             });
//     };

//     return (
//         <div>
//             <h2>Daily Call Report</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="date"
//                     name="date"
//                     value={callReport.date}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="current_location"
//                     placeholder="Current Location"
//                     value={callReport.current_location}
//                     onChange={handleInputChange}
//                     required
//                 />
//                 <input
//                     type="file"
//                     name="live_photo"
//                     onChange={handleFileChange}
//                     required
//                 />
//                 <textarea
//                     name="remark"
//                     placeholder="Remark/Description"
//                     value={callReport.remark}
//                     onChange={handleInputChange}
//                 />
//                 <input
//                     type="date"
//                     name="next_follow_up_date"
//                     value={callReport.next_follow_up_date}
//                     onChange={handleInputChange}
//                 />
//                 <button type="submit">Add Report</button>
//                 {error && <div>{error}</div>}
//                 {successMessage && <div>{successMessage}</div>}
//             </form>
//         </div>
//     );
// }

// export default DailyCallReportForm;

import React, { useState } from 'react';
import axios from 'axios';

function DailyCallReportForm({ employeeId }) {
    const [callReport, setCallReport] = useState({
        employee_id: employeeId,
        date: '',
        current_location: '',
        live_photo: null,
        remark: '',
        next_follow_up_date: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCallReport({ ...callReport, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCallReport({ ...callReport, live_photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:3000/callreport/add', callReport)
            .then(result => {
                console.log("This is the data we got from dailycallreport : ", result);
                if (result.data.success) {
                    setSuccessMessage('Call report added successfully.');
                    setError('');
                    setCallReport({
                        employee_id: employeeId,
                        date: '',
                        current_location: '',
                        live_photo: null,
                        remark: '',
                        next_follow_up_date: ''
                    });
                } else {
                    setError(result.data.error);
                    setSuccessMessage('');
                }
            })
            .catch(err => {
                console.error('Error adding call report:', err);
                setError('An error occurred while adding the call report.');
                setSuccessMessage('');
            });
    };

    return (
        <div>
            <h2>Daily Call Report</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="date"
                    value={callReport.date}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="current_location"
                    placeholder="Current Location"
                    value={callReport.current_location}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="file"
                    name="live_photo"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                />
                <textarea
                    name="remark"
                    placeholder="Remark/Description"
                    value={callReport.remark}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="next_follow_up_date"
                    value={callReport.next_follow_up_date}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Report</button>
                {error && <div>{error}</div>}
                {successMessage && <div>{successMessage}</div>}
            </form>
        </div>
    );
}

export default DailyCallReportForm;