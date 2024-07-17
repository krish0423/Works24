import { useState } from 'react';
import axios from 'axios';

function CustomerForm() {
    const [customer, setCustomer] = useState({
        name: "",
        companyName: "",
        work: "",
        email: "",
        mobile: "",
        address: "",
        visitingCard: null
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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
        Object.keys(customer).forEach(key => {
            formData.append(key, customer[key]);
        });

        axios.post('http://localhost:3000/customers/add', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(result => {
                if (result.data.success) {
                    setSuccessMessage(result.data.message);
                    setError("");
                    setCustomer({
                        name: "",
                        companyName: "",
                        work: "",
                        email: "",
                        mobile: "",
                        address: "",
                        visitingCard: null
                    });
                } else {
                    setError(result.data.message);
                    setSuccessMessage("");
                }
            })
            .catch(err => {
                console.error('Error adding customer:', err);
                setError("An error occurred while adding the customer.");
                setSuccessMessage("");
            });
    };

    return (
        <div>
            <h2>Add Customer</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={customer.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={customer.companyName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="work"
                    placeholder="Work"
                    value={customer.work}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={customer.email}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={customer.mobile}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={customer.address}
                    onChange={handleInputChange}
                />
                <input
                    type="file"
                    name="visitingCard"
                    onChange={handleFileChange}
                />
                <button type="submit">Add Customer</button>
                {error && <div>{error}</div>}
                {successMessage && <div>{successMessage}</div>}
            </form>
        </div>
    );
}


export default CustomerForm;