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
                </Route>

                <Route path="" element={<WebLayout />}></Route>
                <Route path="home" element={<WebLayout />}></Route>

                <Route path="admin" element={<AdminLayout />}>
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
