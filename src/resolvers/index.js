// Retrieves github gist information by user and stitches together with local database favorited information
const getGistsByUsername = async (
  dataSources,
  { username, pageNum, maxResults }
) => {
  const gists = await dataSources.gistsApi.getGistsByUsername({
    username: username,
    pageNum: pageNum,
    maxResults: maxResults,
  });
  return gists.map(async (gist) => {
    const isFavorited = await dataSources.gistsDb.getFavoritedGistsById(
      gist.id
    );
    return {
      ...gist,
      favorited: isFavorited,
    };
  });
};

// Retrieves github gist information by ID and stitches together with local database favorited information
const getGistsById = async (dataSources, { id }) => {
  const gist = await dataSources.gistsApi.getGistsById({ id: id });
  const isFavorited = await dataSources.gistsDb.getFavoritedGistsById(gist.id);
  return {
    ...gist,
    favorited: isFavorited,
  };
};

// Retrieves list of favorited gist IDs and queries github to retrieve information
// TODO - This is not very scalable because it retrieves the entire list of IDs from the db and makes an individual request for each gist.
// Pagination and caching should be implemented in the future. Alternatively more information could be stored in the local DB and then github is only queried for additional details if necessary.
const getFavoriteGists = async (dataSources) => {
  const favoritedGists = await dataSources.gistsDb.getFavoritedGists();
  return favoritedGists.map(async (id) => {
    const gist = await dataSources.gistsApi.getGistsById({ id: id });
    return {
      ...gist,
      favorited: true,
    };
  });
};

// Defining query and mutation resolvers
const resolvers = {
  Query: {
    getGistsByUsername: (_, args, { dataSources }) =>
      getGistsByUsername(dataSources, args),
    getGistsById: (_, args, { dataSources }) => getGistsById(dataSources, args),
    getFavoritedGists: (_, __, { dataSources }) =>
      getFavoriteGists(dataSources),
  },
  Mutation: {
    favoriteGist: (_, args, { dataSources }) =>
      dataSources.gistsDb.favoriteGist(args.id),
    unfavoriteGist: (_, args, { dataSources }) =>
      dataSources.gistsDb.unfavoriteGist(args.id),
  },
};

module.exports = resolvers;
