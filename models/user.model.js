const db = require("../data/database");

class User {
  constructor(email, password, fullname, street, eircode, county) {
    (this.email = email),
      (this.password = password),
      (this.fullname = fullname),
      (this.address = {
        street: street,
        eircode: eircode,
        county: county,
      });
  }

  signUp() {
    db.getDb().collection("users").insertOne({
      email: this.email,
      password: this.password,
      name: this.name,
      address: this.address,
    });
  }
}
