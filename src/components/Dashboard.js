import React, { useEffect, useState } from "react";
import { listenToInventory } from "../services/inventoryService";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {Card,Container,Row,Col} from "react-bootstrap";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalItems: 0,
    expiredItems: 0,
    expiringSoon: 0,
  });

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch user-specific inventory
  useEffect(() => {
    if (user) {
      const unsubscribe = listenToInventory(setItems);
      return () => unsubscribe();
    }
  }, [user]);

  // Calculate stats
  useEffect(() => {
    const today = new Date();
    const totalItems = items.length;
    const expiredItems = items.filter((item) => new Date(item.expiryDate) < today).length;
    const expiringSoon = items.filter((item) => {
      const expiryDate = new Date(item.expiryDate);
      const daysLeft = (expiryDate - today) / (1000 * 60 * 60 * 24);
      return daysLeft > 0 && daysLeft <= 3;
    }).length;

    setStats({ totalItems, expiredItems, expiringSoon });
  }, [items]);

  return (
    <div>
      <h2>Inventory Dashboard</h2>

      {user ? (
        <Container className="mt-5 text-center">
      <Row className="justify-content-center mt-4">
        <Col md={4}>
          <Card className="text-center p-3">
            <h5>Total Items</h5>
            <h3>{stats.totalItems}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3 text-danger">
            <h5>Expired Items</h5>
            <h3>{stats.expiredItems}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3 text-warning">
            <h5>Expiring Soon</h5>
            <h3>{stats.expiringSoon}</h3>
          </Card>
        </Col>
      </Row>
    </Container>
      ) : (
        <p className="mt-4">Please log in to view your dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
