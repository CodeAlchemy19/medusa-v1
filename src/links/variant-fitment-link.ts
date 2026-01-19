import { defineLink } from "@medusajs/framework/utils";
import ProductModule from "@medusajs/medusa/product";
import AutomotiveModule from "../modules/automotive";

export default defineLink(
  ProductModule.linkable.productVariant,
  {
    linkable: AutomotiveModule.linkable.fitment,
    isList: true,
    deleteCascade: true,
  }
);
