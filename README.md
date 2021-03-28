# Gist Web Service

## Description

This is a graphql webservice that uses Apollo Graphql Server to query public GitHub gists. To support unauthenticated access to GitHub, this web services uses a local PostgreSQL database to store favorited gist information.

[GitHub API Reference](https://developer.github.com/v3/gists/)

---

## Database Setup

This web service uses a local PostgreSQL database. Database commands within the package.json file are dependent on installing PostgreSQL and having a generic postgres user.

---

## Getting Started

```bash
# Install dependencies
npm install

### Start postgres server
npm run database:start

### Start graphql server
npm run start
```

The graphql server runs at: [http://localhost:4000/graphl](http://localhost:4000/graphl)

## Additional Scripts

```bash
# Checks formatting
npm run format:check

### Fixes formatting
npm run format:fix
```

---

## Sample Queries

GetGistsByUsername:

```graphql
query getGistsByUsername {
  getGistsByUsername(username:<USERNAME>, pageNum: <NUMBER>, maxResults: <NUMBER>) {
    id
   	html_url
    created_at
    updated_at
    owner
    description
    avatar_url
    files {
      filename
      type
      language
      raw_url
      size
    }
    favorited
  }
}
```

GetGistsById:

```graphql
query getGistsById {
  getGistsById(id:<GIST_ID>) {
    id
   	html_url
    created_at
    updated_at
    owner
    description
    avatar_url
    files {
      filename
      type
      language
      raw_url
      size
    }
    favorited
  }
}
```

GetFavoritedGists:

```graphql
query getFavoritedGists {
  getFavoritedGists {
    id
   	html_url
    created_at
    updated_at
    owner
    description
    avatar_url
    files {
      filename
      type
      language
      raw_url
      size
    }
    favorited
  }
}
```

## Sample Mutations

FavoriteGist:

```graphql
mutation favoriteGist {
  favoriteGist(id:<GIST_ID>) {
    message
    status
  }
}
```

UnfavoriteGist:

```graphql
mutation unfavoriteGist {
  unfavoriteGist(id:<GIST_ID>) {
    message
    status
  }
}
```
