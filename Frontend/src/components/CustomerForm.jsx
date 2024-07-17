import { useState } from 'react';
import axios from 'axios';
import './style.css'; // Custom CSS file for additional styling

function CustomerForm() {
    const [customer, setCustomer] = useState({
        name: '',
        companyName: '',
        work: '',
        email: '',
        mobile: '',
        address: '',
        visitingCard: null,
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleFileChange = (e) => {
        setCustomer({ ...customer, visitingCard: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(customer).forEach((key) => {
            formData.append(key, customer[key]);
        });

        axios
            .post('http://localhost:3000/customers/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((result) => {
                if (result.data.success) {
                    setSuccessMessage(result.data.message);
                    setError('');
                    setCustomer({
                        name: '',
                        companyName: '',
                        work: '',
                        email: '',
                        mobile: '',
                        address: '',
                        visitingCard: null,
                    });
                } else {
                    setError(result.data.message);
                    setSuccessMessage('');
                }
            })
            .catch((err) => {
                console.error('Error adding customer:', err);
                setError('An error occurred while adding the customer.', err);
                setSuccessMessage('');
            });
    };

    return (
        <div className="container mt-5 p-1 rounded ">
            <div className="row justify-content-center " style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px' }}>
                <div className="col-md-6">
                    <div className="card p-4">
                        <h2 className="mb-4">Add Customer</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Name"
                                    value={customer.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="companyName"
                                    className="form-control"
                                    placeholder="Company Name"
                                    value={customer.companyName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="work"
                                    className="form-control"
                                    placeholder="Work"
                                    value={customer.work}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={customer.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="mobile"
                                    className="form-control"
                                    placeholder="Mobile Number"
                                    value={customer.mobile}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    placeholder="Address"
                                    value={customer.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    name="visitingCard"
                                    className="form-control"
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button type="submit" className="w-100 button-74">
                                Add Customer
                            </button>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                            {successMessage && (
                                <div className="alert alert-success mt-3">{successMessage}</div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerForm;
