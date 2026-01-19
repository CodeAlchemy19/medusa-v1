// src/links/automotive-links.ts
import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import AutomotiveModule from "../modules/automotive";

// Link Product to Brand (Manufacturer)
export default defineLink(AutomotiveModule.linkable.brand, {
  linkable: ProductModule.linkable.product,
  isList: true,
});
