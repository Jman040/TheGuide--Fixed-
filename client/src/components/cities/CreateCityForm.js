import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { createCity } from "../../managers/cityManager";

const CreateCity = () => {
    const [formData, setFormData] = useState({
        name: "",
        country: "",
        averagePrice: 0,
        cityActivityId: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "averagePrice" ? parseFloat(value) : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCity(formData)
            .then(() => {
                // Optionally, you can redirect to the city list or perform other actions after creation.
                // For example, you can use react-router's `useNavigate` hook to navigate.
                // navigate("/cities");
            })
            .catch((error) => {
                console.error("Error creating city:", error);
            });
    };

    return (
        <div>
            <h2>Create a New City</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="country">Country</Label>
                    <Input
                        type="text"
                        name="country"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="averagePrice">Average Price Per Night</Label>
                    <Input
                        type="number"
                        name="averagePrice"
                        id="averagePrice"
                        value={formData.averagePrice}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="cityActivityId">City Activity ID</Label>
                    <Input
                        type="number"
                        name="cityActivityId"
                        id="cityActivityId"
                        value={formData.cityActivityId}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button color="primary" type="submit">
                    Create City
                </Button>
            </Form>
        </div>
    );
};

export default CreateCity;
