import { catchAsync } from "./errorController.js";
import ErrorHandler from "../utils/appError.js";
import { Stripe } from "stripe";
import Tour from "../models/tourModel.js";
import Booking from "../models/bookingModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./factoryFunctions.js";
import User from "../models/usersModel.js";

export const getCheckoutSession = catchAsync(async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const tour = await Tour.findById(req.params.tourId);
  const { date } = req.query;

  let url;
  process.env.NODE_ENV === "development"
    ? (url = "localhost:5173")
    : (url = req.get("host"));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${req.protocol}://${url}/tours?booking=success`,
    // success_url: `${req.protocol}://${req.get("host")}/api/v1/tours?user=${
    //   req.user.id
    // }&tour=${tour.id}&price=${tour.price}`,
    // locally without webhooks we created booking by redirecting to above url with details url then using middleware on homepage to listen for this if we succeed then create booking (it is listend by /tours becasue of the query and it classifies as sort) and then redirect to home
    cancel_url: `${req.protocol}://${url}/tours/${req.params.tourId}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    metadata: {
      date: date,
    },
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get("host")}/tours/${tour.imageCover}`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });

  //This query method needs a fix :(
  // const TourDetails = await Tour.findOneAndUpdate(
  //   { _id: req.params.tourId, "startDates.Date": startDate },
  //   { $inc: { "startDates.$.participants": 1 } },
  //   { runValidators: true, new: true }
  // ).select("startDates");
  // const startDate = new Date(`2021-03-11T10:00:00.000Z`);

  res.status(200).json({
    status: "success",
    session,
  });
});

//Old method where we use query string to create a booking
// export const createBookingCheckout = catchAsync(async (req, res, next) => {
//   const { tour, user, price } = req.query;
//   if (!tour || !user || !price) {
//     return next();
//   }

//   const booking = await Booking.create({
//     tour: tour,
//     user: user,
//     price: price,
//   });
//   // res.redirect(`${req.protocol}://localhost:5173/tours`);
//   res.redirect(`${req.protocol}://${req.get("host")}/tours?booking=success`);
// });

export const createBookingCheckout = async (session, next) => {
  try {
    const startDate = new Date(session.metadata.date);
    const user = await User.findOne({ email: session.customer_email }).select(
      "id"
    );
    const tour = await Tour.findById(session.client_reference_id);
    const price = session.amount_total / 100;

    if (!tour || !user || !price) {
      throw new ErrorHandler("Missing data", 400);
    }

    // Create the booking
    const booking = await Booking.create({
      tour: session.client_reference_id,
      user: user.id,
      price,
    });

    // Increment participant count for the correct start date
    // console.log("IT starts here!");
    // console.log(tour.startDates[0].Date.getTime());
    // console.log(startDate.getTime());
    // console.log(tour.startDates[0].Date);
    // console.log(startDate);
    // console.log(tour.maxGroupSize);

    tour.startDates.forEach((el) => {
      if (el.Date.getTime() === startDate.getTime()) {
        console.log(el.participants);
        el.participants += 1;
        console.log(el.participants);
      }
    });

    // Save the updated tour document
    await tour.save({ validateBeforeSave: false });

    console.log("Booking created and participants updated.");
  } catch (err) {
    console.error("Error creating booking:", err);
  }
};
export const webhookCheckout = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);
  const signature = req.headers["stripe-signature"];
  let event;
  let key;

  process.env.NODE_ENV === "development"
    ? (key =
        "whsec_0b949bafceeec75a8959cc0f5b45af2b3de70d11c1b2bf50a31b8351d1920cc2")
    : (key = process.env.STRIPE_WEBHOOK_KEY);

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, key);

    if (event.type === "checkout.session.completed") {
      // Immediately acknowledge the event to Stripe
      res.status(200).json({ received: true });

      // Then, asynchronously handle the booking creation in the background
      await createBookingCheckout(event.data.object, next);
      console.log("X");
    } else {
      res.status(200).json({ received: true });
    }
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

export const getBookings = catchAsync(async (req, res, next) => {
  //This is my method with gpt help
  const bookings = await Booking.getBookingsForUser(req.user.id);
  //Natours method :)
  // const bookings = await Booking.find({ user: req.user.id });
  // const tourIds = bookings.map((el) => el.tour);
  // const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).json({
    count: bookings.length,
    status: "success",
    bookings,
  });
});

//I will implement it on my own later! :D
// export const updateMyTour = catchAsync(async (req, res, next) => {});

// export const deleteMyTour = catchAsync(async (req, res, next) => {
//   const booking = await Booking.deleteOne({ tour: req.params.tourId });

//   res.status(202).json({
//     status: "success",
//     data: null,
//   });
// });

export const createBooking = createOne(Booking);
export const updateBooking = updateOne(Booking);
export const getBooking = getOne(Booking);
export const getAllBookings = getAll(Booking);
export const deleteBooking = deleteOne(Booking);
