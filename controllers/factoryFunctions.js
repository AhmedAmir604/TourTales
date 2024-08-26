import { catchAsync } from "./errorController.js";
import ErrorHandler from "../utils/appError.js";
import { APIFeatures } from "../utils/apiFeatures.js";

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new ErrorHandler("Cannot find a document with such ID", 404));
    }
    res.status(204).json({
      status: "Deleted Successfully :D",
      data: null,
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new ErrorHandler("Cannot find a document with such ID", 404));
    }
    res.status(202).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });

export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (!query)
      return next(new ErrorHandler("Cannot find a document with such ID", 404));
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;
    if (!doc) {
      return next(new ErrorHandler("Cannot find a document with such ID", 404));
    }
    res.status(200).json({
      status: "Found",
      data: {
        doc,
      },
    });
  });

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const query = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .fields()
      .limit();
    const doc = await query.query;
    res.status(200).json({
      status: "successfull",
      requestTime: req.Time,
      count: doc.length,
      data: {
        doc,
      },
    });
  });

export const getAllReviews = (Model) =>
  catchAsync(async (req, res, next) => {
    const { tourId } = req.params;
    const reviews = await Model.find({ tour: tourId });

    res.status(200).json({
      status: "success",
      count: reviews.length,
      data: {
        reviews,
      },
    });
  });
