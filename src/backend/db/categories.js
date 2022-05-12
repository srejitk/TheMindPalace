import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Tech",
    description: "Everything Shiny and Tinkery gets showcased here",
  },
  {
    _id: uuid(),
    categoryName: "Productivity",
    description: "Let's get 0.01% better everyday",
  },
  {
    _id: uuid(),
    categoryName: "Self care",
    description: "Self Preservation is just as important as Self Indulgence",
  },
  {
    _id: uuid(),
    categoryName: "Informative",
    description: "Let's keep those synapses firing shall we",
  },
];
