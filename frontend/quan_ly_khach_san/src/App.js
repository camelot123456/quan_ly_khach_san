import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import logo from "./logo.svg";

import AuthLayout from "./pages/auth/layouts";
import WebLayout from "./pages/web/layouts";
import AdminLayout from "./pages/admin/layouts";
import Login from "./pages/auth/bodys/Login";
import Dashboard from "./pages/admin/bodys/statistic-management/Dashboard";
import RoomTab from './pages/admin/bodys/room-management'
import RoomDetail from "./pages/admin/bodys/room-management/RoomDetail";
import RoomReservation from "./pages/admin/bodys/room-management/RoomReservation";
import TransactionList from "./pages/admin/bodys/transaction-management/TransactionList";
import MainLayout from "./pages";
import AccountTab from "./pages/admin/bodys/customer-management";
import InternalTab from "./pages/admin/bodys/internal-management";
import PublicLayout from "./pages/admin/bodys";
import Register from "./pages/auth/bodys/Register";
import Forbiden from "./pages/error/Forbiden";
import Home from "./pages/web/bodys/Home";
import Rooms from "./pages/web/bodys/Rooms";
import Services from "./pages/web/bodys/Services";
import RoomDetailPublic from "./pages/web/bodys/RoomDetailPublic";
import OrderAndHistory from "./pages/web/bodys/OrderAndHistory";

function App() {
  return (
    <>
        <Router>
          <Suspense
            fallback={
              <div className="App">
                <h1>Loading...</h1>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<MainLayout />}>

                <Route  path="auth" element={<AuthLayout />}>
                  <Route index path="login" element={<Login />}></Route>
                  <Route index path="register" element={<Register />}></Route>
                </Route>

                <Route path="" element={<WebLayout />}>
                  <Route path="home" element={<Home />}></Route>
                  <Route path="rooms" element={<Rooms />}></Route>
                  <Route path="cart" element={<OrderAndHistory />}></Route>
                  <Route path="rooms/:idRoomtype" element={<RoomDetailPublic />}></Route>
                  <Route path="services" element={<Services />}></Route>
                </Route>

                <Route path="error/403" element={<Forbiden />}></Route>

                <Route path="admin" element={<AdminLayout />}>
                  <Route path="" element={<PublicLayout />}></Route>
                  <Route path="dashboard" element={<Dashboard />}></Route>
                  <Route path="rooms" element={<RoomTab />}></Route>
                  <Route path="rooms/:idRoom" element={<RoomDetail />}></Route>
                  <Route path="rooms/reservation" element={<RoomReservation />}></Route>
                  <Route path="transactions" element={<TransactionList />}></Route>
                  <Route path="customers" element={<AccountTab />} />
                  <Route path="internals" element={<InternalTab />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </Router>
    </>
  );
}


export default App;
