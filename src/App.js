// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "./redux/store";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "./components/Header";
// import Counter from "./components/Counter";
// import UserForm from "./components/UserForm";
// import UserList from "./components/UserList";
// import Login from "./components/Login";

// function Home() {
//   return (
//     <div className="container mt-5">
//       <h1 className="text-primary">Welcome to My Frontend App</h1>
//       <p>This is a simple React project with Bootstrap styling.</p>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <Router>
//           <Header title="My React App" />
//           <div className="container mt-5">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/counter" element={<Counter />} />
//               <Route path="/form" element={<UserForm />} />
//               <Route path="/users" element={<UserList />} />
//               <Route path="/login" element={<Login />} />
//             </Routes>
//           </div>
//         </Router>
//       </PersistGate>
//     </Provider>
//   );
// }

// export default App;

import React from "react";
import Login from "./components/Login";
import Inventory from "./components/Inventory";
import Dashboard from"./components/Dashboard";

const App=()=>{
  return (
    <div>
    <h1>Smart Inventory Management</h1>
    <Login />
    <Dashboard/>
    <Inventory />
    </div>
  );
};
export default App;