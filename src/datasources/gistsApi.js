const { RESTDataSource } = require("apollo-datasource-rest");

// Defines the github API as a rest data source
class GistsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.github.com";
  }

  // Returns only the desired gist information and reformats the files object
  gistDetailsReducer(gist) {
    return {
      id: gist.id,
      created_at: gist.created_at,
      updated_at: gist.updated_at,
      html_url: gist.html_url,
      description: gist.description,
      owner: gist.owner.login,
      avatar_url: gist.owner.avatar_url,
      files: Object.keys(gist.files).map((filename) => gist.files[filename]),
    };
  }

  // Queries github API for gists by username
  async getGistsByUsername({ username, pageNum, maxResults }) {
    if (!username) {
      throw new Error("Invalid username");
    } else if (!pageNum || pageNum < 1) {
      throw new Error("Invalid pageNum");
    } else if (!maxResults || maxResults < 1 || maxResults > 10) {
      throw new Error("Invalid maxResults");
    }
    const response = await this.get(
      `users/${username}/gists?page=${pageNum}&per_page=${maxResults}`
    );
    return Array.isArray(response)
      ? response.map((gist) => this.gistDetailsReducer(gist))
      : [];
  }

  // Queries github API for gists by id
  async getGistsById({ id }) {
    if (!id) {
      throw new Error("Invalid id");
    }
    const response = await this.get(`gists/${id}`);
    return response ? this.gistDetailsReducer(response) : {};
  }
}

module.exports = GistsAPI;
