export async function navQuery(){
    const siteNavQueryRes = await fetch(import.meta.env.GRAPHQL_URL, {
        method: 'post',
        headers: {
      'Content-Type': 'application/json',
      Authorization: import.meta.env.GRAPHQL_PASSWORD,
    },
        body: JSON.stringify({
            query: `{
                pages {
                  nodes {
                    slug
                    status
                    title
                    uri
                  }
                }
                generalSettings {
                    title
                    url
                    description
                }
            }
            `
        })
    });
    const{ data } = await siteNavQueryRes.json();
    return data;
}

export async function homePagePostsQuery() {
  const response = await fetch(import.meta.env.GRAPHQL_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: import.meta.env.GRAPHQL_PASSWORD,
    },
    body: JSON.stringify({
      query: `{
                posts {
                  nodes {
                    date
                    uri
                    title
                    commentCount
                    excerpt
                    categories {
                      nodes {
                        name
                        uri
                      }
                    }
                    featuredImage {
                      node {
                        srcSet
                        sourceUrl
                        altText
                        caption
                        description
                        mediaDetails {
                          height
                          width
                        }
                      }
                    }
                  }
                }
              }
            `,
    }),
  })
  const { data } = await response.json()
  return data
}

export async function getNodeByURI(uri) {
  const response = await fetch(import.meta.env.GRAPHQL_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: import.meta.env.GRAPHQL_PASSWORD,
    },
    body: JSON.stringify({
      query: `query GetNodeByURI($uri: String!) {
                nodeByUri(uri: $uri) {
                  __typename
                  isContentNode
                  isTermNode
                  ... on Post {
                    id
                    title
                    date
                    uri
                    excerpt
                    content
                    categories {
                      nodes {
                        name
                        uri
                      }
                    }
                    featuredImage {
                      node {
                        srcSet
                        sourceUrl
                        altText
                        caption
                        description
                        mediaDetails {
                          height
                          width
                        }
                      }
                    }
                  }
                  ... on Page {
                    id
                    title
                    uri
                    date
                    content
                  }
                  ... on Category {
                    id
                    name
                    posts {
                      nodes {
                        date
                        title
                        excerpt
                        uri
                        categories {
                          nodes {
                            name
                            uri
                          }
                        }
                        featuredImage {
                          node {
                            srcSet
                            sourceUrl
                            altText
                            caption
                            description
                            mediaDetails {
                              height
                              width
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
      variables: {
        uri: uri,
      },
    }),
  })
  const { data } = await response.json()
  return data
}

export async function getAllUris(){
  const response = await fetch(import.meta.env.GRAPHQL_URL, {
      method: 'post',
      headers: {
      'Content-Type': 'application/json',
      Authorization: import.meta.env.GRAPHQL_PASSWORD,
    },
      body: JSON.stringify({
          query: `query GetAllUris {
            terms {
              nodes {
                uri
              }
            }
            posts(first: 100) {
              nodes {
                uri
              }
            }
            pages(first: 100) {
              nodes {
                uri
              }
            }
          }
          `
      })
  });
  const{ data } = await response.json();
  const uris = Object.values(data)
    .reduce(function(acc, currentValue){
      return acc.concat(currentValue.nodes)
    }, [])
    .filter(node => node.uri !== null)
    .map(node => {
      let trimmedURI = node.uri.substring(1);
      trimmedURI = trimmedURI.substring(0, trimmedURI.length - 1)
      return {params: {
        uri: trimmedURI
      }}
    })

  return uris;

}
