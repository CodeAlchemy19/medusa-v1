// src/modules/automotive/models/vehicle-model.ts
import { model } from "@medusajs/framework/utils";
import VehicleBrand from "./vehicle-brand";
import VehicleGeneration from "./vehicle-generation";

const VehicleModel = model.define("vehicle_model", {
  id: model.id().primaryKey(),
  name: model.text(),
  brand: model.belongsTo(() => VehicleBrand, {
    mappedBy: "models",
  }),
  generations: model.hasMany(() => VehicleGeneration, {
    mappedBy: "model",
  }),
});

export default VehicleModel;
