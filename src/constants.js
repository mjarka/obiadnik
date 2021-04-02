export const GRAPHQL_API = "http://localhost:1337/graphql";
export const productsQuery = `query {
  recipes(where: { isSelected: true }){
    name
    productsQuantity {
      isTaken 
      value
      product {
        name
        unit{name}
        category {
          name
        }
      }
    }
  }
}
`;
