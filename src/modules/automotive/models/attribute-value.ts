import { model } from "@medusajs/framework/utils";
import Attribute from "./attribute";

const AttributeValue = model.define("attribute_value", {
  id: model.id().primaryKey(),
  attribute: model.belongsTo(() => Attribute, { mappedBy: "values" }),
  value_number: model.number().nullable(),
  value_text: model.text().nullable(),
});

export default AttributeValue;
