import mongoose, { set } from "mongoose";
import slugify from "slugify";
import User from "./usersModel.js";
import { format } from "date-fns";

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Tour must have name"],
      unique: true,
      trim: true,
      minLength: [10, "Name must have 10 charecters!"],
      maxLength: [40, "Name must have 40 charecters!"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A Tour must have duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A Tour must have max Group Size"],
    },
    difficulty: {
      type: String,
      required: true,
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty can be easy medium or difficult!",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      set: (val) => Math.round(val * 10) / 10,
      min: [1, "rating as low as 1 is possilble!"],
      max: [5, "must be between 1 and 5!"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A Tour must have price"],
    },
    discountedPrice: {
      type: Number,
      validate: {
        validator: function (val) {
          //This only points to when doc is created not updated so care :D
          return val < this.price;
        },
        message: "Discounted Price should be less then original price!",
      },
    },
    summary: {
      type: String,
      required: [true, "A Tour must have summary"],
    },
    description: {
      type: String,
      required: [true, "A Tour must have description"],
    },
    imageCover: {
      type: String,
      required: [true, "A Tour must have image Cover"],
    },
    images: [String],
    createdAt: {
      type: Date,
      // default: Date.now(),
      select: false,
    },
    startDates: [Date],
    startLocation: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      description: String,
      address: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: "Point",
          enum: ["Point"],
        },
        coordinates: [Number],
        description: String,
        address: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.index({ price: 1, rating: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: "2dsphere" });

tourSchema.virtual("Week-Days").get(function () {
  const duration = this.duration / 7;
  const array = String(duration)
    .split("")
    .filter((i) => i !== ".");
  let week = Number(array[0]);
  let day = Number(array[1]);
  if (day === 7) {
    week++;
    day = 0;
  }
  return { week, day };
});

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

tourSchema.virtual("durationHours").get(function () {
  return this.duration * 24;
});

tourSchema.virtual("formatedDate").get(function () {
  return format(this.startDates[0], "MMMM yyyy");
});

tourSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "tour",
});

//Document Middleware this only runs before save() and create not update
tourSchema.pre("save", function (next) {
  if (this.createdAt) {
    next();
  }
  this.createdAt = new Date();
  next();
});

//Query Middleware
//it is helping in giving tours with coming start Dates!
// tourSchema.pre(/^find/, function (next) {
//   this.start = new Date();
//   this.find({ startDates: { $elemMatch: { $gte: new Date() } } });
//   next();
// });

// tourSchema.post(/^find/, function (doc, next) {
//   console.log(`the time taken is : ${new Date() - this.start}ms!`);
//   next();
// });

tourSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangeTime",
  });
  next();
});

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre("save", async function (next) {
//   const guidesPromises = this.guides.map(async (el) => await User.findById(el));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// tourSchema.post("save", function (doc, next) {
//   console.log(doc);
//   next();
// });

//This aggregate middle ware helps in remove entry with slug The Test Tour :D
// tourSchema.pre("aggregate", function (next) {
//   this.pipeline().unshift({
//     $match: { slug: { $ne: undefined } },
//   });
//   next();
// });

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;
