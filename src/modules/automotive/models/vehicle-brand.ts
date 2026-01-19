import { model } from "@medusajs/framework/utils";
import VehicleModel from "./vehicle-model";

// VEHICLE HIERARCHY
const VehicleBrand = model.define("vehicle_brand", {
  id: model.id().primaryKey(),
  name: model.text(),
  models: model.hasMany(() => VehicleModel, { mappedBy: "brand" }),
});

export default VehicleBrand;
