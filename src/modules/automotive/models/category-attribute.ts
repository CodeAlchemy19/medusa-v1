import { model } from "@medusajs/framework/utils";
import Attribute from "./attribute";

// ATTRIBUTES (TECHNICAL SPECS)
const CategoryAttribute = model.define("category_attribute", {
  id: model.id().primaryKey(),
  code: model.text(),
  unit: model.text().nullable(),
  attribute: model.belongsTo(() => Attribute, { mappedBy: "category_attribute" }),
});

export default CategoryAttribute;
