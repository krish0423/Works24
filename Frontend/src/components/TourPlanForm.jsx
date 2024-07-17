import React, { useState } from 'react';
import axios from 'axios';

function TourPlanForm({ employeeId }) {
    const [tourPlan, setTourPlan] = useState({
        employee_id: employeeId,
        from_date: '',
        from_location: '',
        to_date: '',
        to_location: '',
        name: '',
        state: '',
        city: '',
        approx_distance: '',
        description: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTourPlan({ ...tourPlan, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/tourplan/add', tourPlan)
            .then(result => {
                console.log("This is the result we got: ", result)
                if (result.data.success) {
                    setSuccessMessage('Tour plan added successfully.');
                    setError('');
                    setTourPlan({
                        employee_id: employeeId,
                        from_date: '',
                        from_location: '',
                        to_date: '',
                        to_location: '',
                        name: '',
                        state: '',
                        city: '',
                        approx_distance: '',
                        description: ''
                    });
                } else {
                    setError(result.data.error);
                    setSuccessMessage('');
                }
            })
            .catch(err => {
                console.error('Error adding tour plan:', err);
                setError('An error occurred while adding the tour plan.');
                setSuccessMessage('');
            });
    };

    return (
        <div>
            <h2>Tour Plan</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="from_date"
                    value={tourPlan.from_date}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="from_location"
                    placeholder="From Location"
                    value={tourPlan.from_location}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="date"
                    name="to_date"
                    value={tourPlan.to_date}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="to_location"
                    placeholder="To Location"
                    value={tourPlan.to_location}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={tourPlan.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={tourPlan.state}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={tourPlan.city}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="approx_distance"
                    placeholder="Approximate Distance"
                    value={tourPlan.approx_distance}
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={tourPlan.description}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Tour Plan</button>
                {error && <div>{error}</div>}
                {successMessage && <div>{successMessage}</div>}
            </form>
        </div>
    );
}

export default TourPlanForm;

