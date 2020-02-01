import gql from 'graphql-tag';

export const GET_PRODUCT_BY_SKU = gql`
query getProductBySku($sku: String!){
  products(first:50, query: $sku){
    edges {
      node {
        id
        title
        tags
        productType
        variants(first:1){
          edges{
            node{
              sku
            }
          }
        }
        images(first:1){
          edges{
            node{
              transformedSrc(maxWidth:200)
            }
          }
        }
        totalInventory
      }
    }
  }
}
`;

export const GET_PRODUCT_BY_ID = gql`
query getProductId($id: ID!){
  product(id: $id){
    id
    title
    tags
    productType
    variants(first:1){
      edges{
        node{
          sku
        }
      }
    }
    images(first:1){
      edges{
        node{
          transformedSrc(maxWidth:200)
        }
      }
    }
    totalInventory
  }
}
`;