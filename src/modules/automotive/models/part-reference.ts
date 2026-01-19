import { model } from "@medusajs/framework/utils";

// PART REFERENCES
const PartReference = model.define("part_reference", {
  id: model.id().primaryKey(),
  reference_type: model.text(),
  reference_value: model.text(),
  manufacturer: model.text(),
});

export default PartReference;
