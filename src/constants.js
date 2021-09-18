import { gql } from "@apollo/client";

export const GRAPHQL_API = "http://localhost:1337/graphql";
export const productsQuery = gql`
  query {
    recipes(where: { isSelected: true }) {
      name
      id
      productsQuantity {
        isTaken
        value
        id
        product {
          id
          name
          unit {
            id
            name
          }
          category {
            id
            name
          }
        }
      }
    }
  }
`;
export const checkboxUpdate = `  mutation ($recipeId:ID!,$productId:ID!, $isTaken:Boolean!) {
  updateRecipe(
    input: {
      where: {  id:$recipeId}
      data: {productsQuantity: {id: $productId, isTaken:$isTaken}}
    }
  ) {
  recipe{
    id
    isSelected
    productsQuantity {
      isTaken   
      id
    }
  }
}
}
`;
export const recipes = gql`
  query {
    products {
      name
      id
      unit {
        id
        name
      }
    }
    recipes {
      id
      name
      Recipe
      productsQuantity {
        product {
          name
          id
          unit {
            name
            id
          }
        }
        id
        value
      }
    }
  }
`;
export const calendar = gql`
  query {
    recipes {
      id
      name
      isSelected
    }
  }
`;
export const updateCalendar = gql`
  mutation ($recipeId: ID!, $isSelected: Boolean!) {
    updateRecipe(
      input: { where: { id: $recipeId }, data: { isSelected: $isSelected } }
    ) {
      recipe {
        id
        name
        isSelected
      }
    }
  }
`;
export const products = gql`
  query {
    products {
      name
      id
      unit {
        name
        id
      }
      category {
        name
        id
      }
    }
    units {
      name
      id
    }
    categories {
      name
      id
    }
  }
`;
export const createProduct = gql`
  mutation ($name: String!, $unit: ID!, $category: ID!) {
    createProduct(
      input: { data: { name: $name, unit: $unit, category: $category } }
    ) {
      product {
        name
        id
        unit {
          name
          id
        }
        category {
          id
          name
        }
      }
    }
  }
`;
export const createCategory = gql`
  mutation ($categoryName: String!) {
    createCategory(input: { data: { name: $categoryName } }) {
      category {
        id
        name
      }
    }
  }
`;
export const createRecipe = gql`
  mutation (
    $recipeName: String!
    $recipeDescription: String!
    $productIds: [ComponentProductsProductsQuantityInput!]
  ) {
    createRecipe(
      input: {
        data: {
          Recipe: $recipeDescription
          name: $recipeName
          productsQuantity: $productIds
        }
      }
    ) {
      recipe {
        id
        Recipe
        name
        productsQuantity {
          id
          product {
            id
          }
          value
        }
      }
    }
  }
`;
export const updateRecipe = gql`
  mutation (
    $recipeId: ID!
    $recipeName: String!
    $recipeDescription: String!
    $productIds: [editComponentProductsProductsQuantityInput!]
  ) {
    updateRecipe(
      input: {
        where: { id: $recipeId }
        data: {
          Recipe: $recipeDescription
          name: $recipeName
          productsQuantity: $productIds
        }
      }
    ) {
      recipe {
        id
        Recipe
        name
        productsQuantity {
          id
          product {
            id
          }
          value
        }
      }
    }
  }
`;
export const deleteRecipe = gql`
  mutation ($recipeId: ID!) {
    deleteRecipe(input: { where: { id: $recipeId } }) {
      recipe {
        id
        name
        Recipe
      }
    }
  }
`;
export const deleteProduct = gql`
  mutation ($productId: ID!) {
    deleteProduct(input: { where: { id: $productId } }) {
      product {
        id
        name
      }
    }
  }
`;
export const updateCheckbox = gql`
  mutation (
    $recipeId: ID!
    $productIds: [editComponentProductsProductsQuantityInput!]
  ) {
    updateRecipe(
      input: {
        where: { id: $recipeId }
        data: { productsQuantity: $productIds }
      }
    ) {
      recipe {
        id
        Recipe
        name
        productsQuantity {
          id
          isTaken
          product {
            id
          }
          value
        }
      }
    }
  }
`;
