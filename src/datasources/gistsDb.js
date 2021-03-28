const { DataSource } = require("apollo-datasource");

// Defines the local postgresql database as a data source
class GistsDB extends DataSource {
  constructor(client) {
    super();
    this.database = client.database;
  }

  // Query DB for favorited gist by ID
  async getFavoritedGistsById(id) {
    return this.database.models.favoritedGists
      .findAll({
        where: {
          id: id,
        },
      })
      .then((gists) => {
        return gists.length > 0 ? true : false;
      });
  }

  // Query to add a new gist ID as a favorite
  async favoriteGist(id) {
    return this.database.models.favoritedGists
      .create({ id: id })
      .then(() => {
        return {
          id: id,
          favorited: true,
        };
      })
      .catch((err) => {
        return {
          id: id,
          favorited: false,
        };
      });
  }

  // Query to remove a favorited gist
  async unfavoriteGist(id) {
    return this.database.models.favoritedGists
      .findAll({
        where: {
          id: id,
        },
      })
      .then((gists) => {
        gists.forEach((gist) => gist.destroy());
      })
      .then(() => {
        return {
          id: id,
          favorited: false,
        };
      })
      .catch((err) => {
        return {
          id: id,
          favorited: true,
        };
      });
  }

  // Query to get entire list of favorited gist ids
  async getFavoritedGists() {
    return this.database.models.favoritedGists
      .findAll()
      .then((gists) => (gists.length > 0 ? gists.map((gist) => gist.id) : []));
  }
}

module.exports = GistsDB;
