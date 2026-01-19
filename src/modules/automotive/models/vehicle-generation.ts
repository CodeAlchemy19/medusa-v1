// src/modules/automotive/models/vehicle-generation.ts
import { model } from "@medusajs/framework/utils";
import VehicleModel from "./vehicle-model";
import VehicleEngine from "./vehicle-engine";

const VehicleGeneration = model.define("vehicle_generation", {
  id: model.id().primaryKey(),
  year_from: model.number(),
  year_to: model.number().nullable(),
  model: model.belongsTo(() => VehicleModel, {
    mappedBy: "generations",
  }),
  engines: model.hasMany(() => VehicleEngine, {
    mappedBy: "generation",
  }),
});

export default VehicleGeneration;
