// src/links/automotive-links.ts
import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import AutomotiveModule from "../modules/automotive";

// Link Attribute Values to ProductVariant
export default defineLink(
  ProductModule.linkable.productVariant,
  {
    linkable: AutomotiveModule.linkable.attributeValue,
    isList: true,
  }
);
