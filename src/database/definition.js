const { Sequelize, DataTypes } = require("sequelize");

// Database model definition
class Database {
  constructor() {
    // TODO - replace with actual database connection. This is a testing implementation of a local postgres DB connection with a user named 'postgres'
    this.database = new Sequelize("postgresql://localhost/gists?user=postgres");
    // Simple DB table definition for testing purposes to track favorited gist IDs
    this.database.define(
      "favoritedGists",
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
      },
      {
        tableName: "favorited_gists",
      }
    );
    this.connectToDB();
  }

  // Connect to the local postgresql database
  async connectToDB() {
    try {
      await this.database.authenticate();
      await this.database.sync({ force: true });
      console.log("Successfully connected to DB");
    } catch (err) {
      console.error(`Unable to connect to DB ${err}`);
    }
  }
}

module.exports = Database;
