import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const PurchaseForm = ({ onSubmit, name, email, setName, setEmail, }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name || !email) {
        console.error("Name and email are required");
        return;
      }

      await onSubmit({ name, email });

      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

      </Form.Group>
    </Form>
  );
};

export default PurchaseForm;
