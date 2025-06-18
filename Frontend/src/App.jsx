import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import CarDetails from './Pages/CarDetails/CarDetails';
import PostCar from './Pages/PostCar/PostCar';
import BookCar from './Pages/BookCar/BookCar';
import MyBookings from './Pages/MyBookings/MyBookings';
import Locations from "./Pages/Locations/Locations"
import Booking from "./Pages/Booking/Booking"

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/post-car" element={<PostCar />} />
          <Route path="/booking/:carId" element={<BookCar />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/booking" element={<Booking />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;