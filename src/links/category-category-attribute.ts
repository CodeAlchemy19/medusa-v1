// src/links/automotive-links.ts
import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import AutomotiveModule from "../modules/automotive";

// Link Product to Category Attribute
export default defineLink(ProductModule.linkable.productCategory, {
  linkable: AutomotiveModule.linkable.categoryAttribute,
  isList: true,
  deleteCascade: true,
});
