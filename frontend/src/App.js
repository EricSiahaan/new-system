// import { ToastContainer } from 'react-toastify';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import DriverList from "./components/driver/DriverList";
// import AddEditDriver from "./components/driver/addEditDriver";
// // import EditDriver from "./components/driver/EditDriver";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<DriverList />} />
//         <Route path="add" element={<AddEditDriver />} />
//         <Route path="/update/:id" element={<AddEditDriver />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// import GlobalStyle from "./styles/global";
// import styled from "styled-components";
// import Form from "./components/Form.js";
// import Grid from "./components/Grid.js";
// import { useEffect, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const Container = styled.div`
//   width: 100%;
//   max-width: 800px;
//   margin-top: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
// `;


// const Title = styled.h2``;

// function App() {
//   const [drivers, setDrivers] = useState([]);
//   const [onEdit, setOnEdit] = useState(null);

//   const getDrivers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/v1/driver/");
//       setDrivers(res.data.sort((a, b) => (a.fullName > b.fullName ? 1 : -1)));
//     } catch (error) {
//       toast.error(error);
//     }
//   };

//   useEffect(() => {
//     getDrivers();
//   }, [setDrivers]);

//   return (
//     <>
//       <Container>
//         <Title>Daftar Driver</Title>
//         <Form onEdit={onEdit} setOnEdit={setOnEdit} getDrivers={getDrivers} />
//         <Grid setOnEdit={setOnEdit} drivers={drivers} setDrivers={setDrivers} />
//       </Container>
//       <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
//       <GlobalStyle />
//     </>
//   );
// }

import React from 'react'
import AppRouter from './components/AppRouter'




function App(props) {
  return (

    <AppRouter />

  )
}

export default App;

