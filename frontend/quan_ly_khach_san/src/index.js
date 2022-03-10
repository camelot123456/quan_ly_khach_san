import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import store from "./redux/store";

import logo from "./logo.svg";
import "./App.css";

import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// import MainLayout from './pages'
import AuthLayout from "./pages/auth/layouts";
import WebLayout from "./pages/web/layouts";
import AdminLayout from "./pages/admin/layouts";
import Login from "./pages/auth/bodys/Login";
import Dashboard from "./pages/admin/bodys/Dashboard";
import RoomTab from './pages/admin/bodys/room-management'
import RoomDetail from "./pages/admin/bodys/room-management/RoomDetail";
import RoomReservation from "./pages/admin/bodys/room-management/RoomReservation";
import TransactionList from "./pages/admin/bodys/transaction-management/TransactionList";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <Router>
          <Suspense
            fallback={
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Edit <code>src/App.js</code> and save to reload.
                  </p>
                  <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn React
                  </a>
                </header>
                <h1>Loading...</h1>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<App />}>

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
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
