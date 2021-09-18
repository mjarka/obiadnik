import React from "react";
import { useQuery, gql } from "@apollo/client";

const EXCHANGE_RATES = gql`
  query {
    recipes(where: { isSelected: true }) {
      name
      id
      productsQuantity {
        isTaken
        value
        id
        product {
          name
          unit {
            name
          }
          category {
            name
          }
        }
      }
    }
  }
`;

export default function Apollotest() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.recipes.map((recipe) => (
        <p>{recipe.id}</p>
      ))}
    </div>
  );
}
