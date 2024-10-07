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

  //limiting results as need
  limit() {
    const limit = this.queryString.limit ? this.queryString.limit * 1 : 6; // Default limit to 6 if not specified
    const page = this.queryString.page ? this.queryString.page * 1 : 1; // Default page to 1 if not specified
    // Apply limit
    this.query = this.query.limit(limit);
    // Apply skip
    this.query = this.query.skip((page - 1) * limit); // Skip results based on the current page

    return this;
  }
}
