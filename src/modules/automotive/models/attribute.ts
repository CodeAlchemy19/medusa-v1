import { model } from "@medusajs/framework/utils";
import AttributeValue from "./attribute-value";
import CategoryAttribute from "./category-attribute";

// ATTRIBUTES (TECHNICAL SPECS)
const Attribute = model.define("attribute", {
  id: model.id().primaryKey(),
  code: model.text(),
  unit: model.text().nullable(),
  category_attribute: model.hasMany(() => CategoryAttribute, {mappedBy: "attribute"}),
  values: model.hasMany(() => AttributeValue, { mappedBy: "attribute" }),
});

export default Attribute;
