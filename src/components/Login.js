import React, { useState } from "react";
import { loginUser, registerUser, logoutUser } from "../services/authService";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    if (isRegistering) {
      await registerUser(email, password);
    } else {
      await loginUser(email, password);
    }
  }
  catch (err) {
    setError("Authentication Failed. Please try again.");
  } 
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "400px", padding: "10px", boxShadow: "0px 4px 10px rgba(34, 213, 237, 0.2)" }}>
        <Card.Body>
          <h3 className="text-center mb-4">{isRegistering ? "Register" : "Login"}</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {isRegistering ? "Register" : "Login"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button variant="link" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Already have an account? Login" : "Need an account? Register"}
            </Button>
          </div>

          <div className="text-center mt-2">
            <Button variant="danger" className="w-100" onClick={logoutUser}>
              Logout
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
