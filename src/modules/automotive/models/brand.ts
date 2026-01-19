import { model } from "@medusajs/framework/utils";

// BRAND & MANUFACTURER
const Brand = model.define("brand", {
  id: model.id().primaryKey(),
  name: model.text(),
  code: model.text().nullable(),
});

export default Brand;
