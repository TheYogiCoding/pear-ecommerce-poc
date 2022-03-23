const db = require("../data/database");

const bcrypt = require("bcryptjs");

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

  async signUp() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }
}

module.exports = User;
