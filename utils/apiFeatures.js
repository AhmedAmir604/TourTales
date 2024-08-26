export class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //filtering excluded tags and before less than, less than equal $ is used
    const reqQ = { ...this.queryString };
    const excludedTags = ["limit", "page", "sort", "fields"];
    excludedTags.forEach((e) => {
      delete reqQ[e];
    });
    const tourStr = JSON.stringify(reqQ).replace(
      /\b(lt|lte|gt|gte)\b/g,
      (m) => `$${m}`
    );
    this.query = this.query.find(JSON.parse(tourStr));
    return this;
  }

  sort() {
    //sorting on demand
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort.split(",").join(" "));
    } else {
      this.query = this.query.sort("ratingsAverage");
    }
    return this;
  }

  fields() {
    //field limiting
    if (this.queryString.fields) {
      this.query = this.query.select(
        this.queryString.fields.split(",").join(" ")
      );
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  limit() {
    //limiting results as need
    if (this.queryString.limit) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 1;
      const skip = (page - 1) * 3;
      this.query = this.query.skip(skip).limit(limit);
    }
    return this;
  }
}
