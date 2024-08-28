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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    // success_url: `${req.protocol}://${req.get("host")}/api/v1/tours/?tour=${
    //   req.params.tourId
    // }&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get("host")}/tours`,
    cancel_url: `${req.protocol}://${req.get("host")}/tours/${
      req.params.tourId
    }`,
    customer_email: `${req.user.email}`,
    client_reference_id: `${req.params.tourId}`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `https://tt-pro.onrender.com/img/tours/${tour.imageCover}`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });

  res.status(200).json({
    status: "success",
    session,
  });
});

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
//   res.redirect(`${req.protocol}://${req.get("host")}/tours`);
// });

export const createBookingCheckout = catchAsync(async (session, next) => {
  const user = await User.findOne({ email: session.customer_email }).select(
    "id"
  );
  const tour = session.client_reference_id;
  const price = session.line_items[0].price_data.unit_amount / 100;

  if (!tour || !user || !price) {
    return next(new ErrorHandler("Missing data", 400));
  }

  await Booking.create({
    tour: tour,
    user: user,
    price: price,
  });
});

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

export const webhookCheckout = (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);

  const signature = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      STRIPE_WEBHOOK_KEY
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error ${err.message} `);
  }
  if (event.type === "checkout.session.completed") {
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({
    recieved: "true",
  });
};

export const createBooking = createOne(Booking);
export const updateBooking = updateOne(Booking);
export const getBooking = getOne(Booking);
export const getAllBookings = getAll(Booking);
export const deleteBooking = deleteOne(Booking);
