const File = `
  type File {
    filename: String
    type: String
    language: String
    raw_url: String
    size: String
  }
`;

const GistDetails = `
  type GistDetails {
    id: ID
    created_at: String
    updated_at: String
    html_url: String
    description: String
    owner: String
    avatar_url: String
    files: [File]
    favorited: Boolean
  }
`;

const Query = `
  type Query {
    getGistsByUsername(username: String, pageNum: Int, maxResults: Int): [GistDetails]
    getGistsById(id: ID): GistDetails
    getFavoritedGists: [GistDetails]
  }
`;

const Mutation = `
  type Mutation {
    favoriteGist(id: ID): GistDetails
    unfavoriteGist(id: ID): GistDetails
  }
`;

const typeDefs = `
  ${File}
  ${GistDetails}
  ${Query}
  ${Mutation}
`;

module.exports = typeDefs;
