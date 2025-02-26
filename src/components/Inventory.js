import React, { useEffect, useState } from "react";
import { addItem, deleteItem, listenToInventory } from "../services/inventoryService";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {Container,Form,Button,Table,Alert} from "react-bootstrap";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "", expiryDate: "" });
  const [user, setUser] = useState(null);
  const [notifications,setNotifications]=useState([]);

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

  //check for expiry notification
  useEffect(()=>{
    const today=new Date();
    const upcomingExpiryItems=items.filter((item)=>{
      const expiryDate=new Date(item.expiryDate);
      const daysLeft=(expiryDate-today)/(1000*60*60*24);
      return daysLeft>0 && daysLeft<=3; //item expiring in 3 days 
    });
    setNotifications(upcomingExpiryItems);

  },[items]);

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.quantity || !newItem.expiryDate) return;
    await addItem(newItem);
    setNewItem({ name: "", quantity: "", expiryDate: "" });
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
  };

  return (
    <div>
      <h2>Inventory Management</h2>

      {user ? (
         <Container className="mt-4">
         <h2>Manage Your Inventory</h2>
   
         {/* Expiry Notifications */}
         {notifications.length > 0 && (
           <Alert variant="warning">
             <strong>⚠ Warning:</strong> These items are expiring soon:
             <ul>
               {notifications.map((item) => (
                 <li key={item.id}>{item.name} - Expires on {item.expiryDate}</li>
               ))}
             </ul>
           </Alert>
         )}
   
         {/* Add New Item */}
         <Form className="mb-4">
           <Form.Group>
             <Form.Label>Item Name</Form.Label>
             <Form.Control type="text" placeholder="Enter name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
           </Form.Group>
           <Form.Group>
             <Form.Label>Quantity</Form.Label>
             <Form.Control type="number" placeholder="Enter quantity" value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })} />
           </Form.Group>
           <Form.Group>
             <Form.Label>Expiry Date</Form.Label>
             <Form.Control type="date" value={newItem.expiryDate} onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })} />
           </Form.Group>
           <Button variant="primary" className="mt-2" onClick={handleAddItem}>
             Add Item
           </Button>
         </Form>
   
         {/* Inventory List */}
         <Table striped bordered hover>
           <thead>
             <tr>
               <th>Item</th>
               <th>Quantity</th>
               <th>Expiry Date</th>
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {items.map((item) => {
               const isExpired = new Date(item.expiryDate).getTime() < new Date().getTime();

               return (
                <tr key={item.id} className={isExpired ? "table-danger" : ""}>

                   <td>{item.name}</td>
                   <td>{item.quantity}</td>
                   <td>{item.expiryDate}</td>
                   <td>
                     <Button variant="danger" onClick={() => handleDeleteItem(item.id)}>
                       Delete
                     </Button>
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </Table>
       </Container>
      ) : (
        <p>Please log in to access your inventory.</p>
      )}
    </div>
  );
};

export default Inventory;
