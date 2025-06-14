const Car = require('../models/Car');

exports.getAllCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};

exports.getCarById = async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).json({ message: 'Car not found' });
  res.json(car);
};

exports.createCar = async (req, res) => {
  const newCar = new Car(req.body);
  const savedCar = await newCar.save();
  res.status(201).json(savedCar);
};

exports.updateCar = async (req, res) => {
  const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedCar);
};

exports.deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: 'Car deleted' });
};
