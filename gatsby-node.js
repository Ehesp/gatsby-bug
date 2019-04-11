/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.sourceNodes = ({ actions, getNode, createNodeId, createContentDigest }) => {
  const { createNode, createPage, createParentChildLink, createRedirect } = actions;

  // Parent
  const parentId = createNodeId(`test-parent`);

  createNode({
    id: parentId,
    name: 'Parent',
    type: 'parent',
    internal: {
      type: 'DocumentationPage',
      contentDigest: createContentDigest({ name: 'Parent' }),
    },
  });

  // Children
  const child1Id = createNodeId(`test-child-1`);
  const child2Id = createNodeId(`test-child-2`);

  createNode({
    id: child1Id,
    name: 'Child 1',
    type: 'child',
    internal: {
      type: 'DocumentationPage',
      contentDigest: createContentDigest({ name: 'Child 1' }),
    },
  });

  createNode({
    id: child2Id,
    name: 'Child 2',
    type: 'child',
    internal: {
      type: 'DocumentationPage',
      contentDigest: createContentDigest({ name: 'Child 2' }),
    },
  });

  // // Linking - works here
  // createParentChildLink({
  //   parent: getNode(parentId),
  //   child: getNode(child1Id),
  // });
  //
  // createParentChildLink({
  //   parent: getNode(parentId),
  //   child: getNode(child2Id),
  // });
}

exports.createPages = async ({ graphql, actions, getNode }) => {
  const { createParentChildLink } = actions;

  const query = await graphql(`
    {
      allDocumentationPage {
        edges {
          node {
            id
            name
            type
          }
        }
      }
    }
  `);

  // Fails:
  query.data.allDocumentationPage.edges.forEach((node) => {
    if (node.type === 'child') {
      console.log('Creating link...')
      createParentChildLink({
        parent: getNode(`test-parent`),
        child: node,
      });
    }
  });
};