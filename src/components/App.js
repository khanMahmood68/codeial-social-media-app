import { useEffect, useState } from "react";

import { Home, Login, Signup, Settings, UserProfile } from "../pages";

import {Navbar, Loader} from '../components'

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

// Making Private Route

const PrivateRoute = ({ element }) => {
  const auth = useAuth();
  console.log(auth);

  if (!auth.user) {
    return <Navigate to="/login" />;
  } else if (auth.user) {
    return element;
  } else {
    // Handle loading state here, maybe show a loader
    return null;
  }
};

const Page404 = () => {
  return <div>404</div>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="App">
      <Navbar></Navbar>

      <Routes>

        <Route exact path="/" element={<Home posts={[]} />}></Route>

        <Route exact path="/login" element={<Login />}></Route>

        <Route exact path="/register" element={<Signup />}></Route>

        <Route
          exact
          path="/settings"
          element={<PrivateRoute element={<Settings />} />}
        />

        <Route
          exact
          path="/user/:userId"
          element={<PrivateRoute element={<UserProfile />} />}
        ></Route>

        <Route path="*" element={<Page404 />}></Route>
        
      </Routes>
    </div>
  );
}

export default App;
