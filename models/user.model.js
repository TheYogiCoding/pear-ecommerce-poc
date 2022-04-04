const db = require("../data/database");

const bcrypt = require("bcryptjs");
const e = require("express");

class User {
  constructor(email, password, fullname, street, eircode, county) {
    this.email = email;
    this.password = password;
    this.fullname = fullname;
    this.address = {
      street: street,
      eircode: eircode,
      county: county,
    };
  }

  getUserWithSameEmail() {
    //If find a user in the DB that has the exact email address
    //we have a match

    //Returns a promise - yields it so no need to async and await
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();

    if (existingUser) {
      return true;
    } else {
      return false;
    }
  }

  hasCorrectPassword(hashedPassword) {
    //Checks for the unhashed password
    return bcrypt.compare(this.password, hashedPassword);
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
