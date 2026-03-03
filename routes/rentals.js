import express from "express";
const router = express.Router();
import { Rental, validateRental } from "../models/rental.js";
import { Movie } from "../models/movie.js";
import { Customer } from "../models/customer.js";
import auth from "../middleware/auth.js";

router.get("/", auth, async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  await rental.save();

  movie.numberInStock--;
  await movie.save();

  res.send(rental);
});

router.post("/:id/return", auth, async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send("Rental not found.");

  if (rental.dateReturned)
    return res.status(400).send("Rental already returned.");

  rental.dateReturned = new Date();

  const rentalDays = Math.ceil(
    (Date.now() - rental.dateOut.getTime()) / 86400000,
  );

  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;

  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    { $inc: { numberInStock: 1 } },
  );

  res.send(rental);
});

router.get("/:id", auth, async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental)
    return res.status(404).send("The rental with the given ID was not found.");

  res.send(rental);
});
export default router;
