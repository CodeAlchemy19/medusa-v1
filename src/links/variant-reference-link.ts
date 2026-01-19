// src/links/automotive-links.ts
import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import AutomotiveModule from "../modules/automotive";

// Link Part References to ProductVariant
export default defineLink(
  ProductModule.linkable.productVariant,
  {
    linkable: AutomotiveModule.linkable.partReference,
    isList: true,
  }
);
