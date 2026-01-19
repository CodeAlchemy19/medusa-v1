// src/modules/automotive/models/vehicle-engine.ts
import { model } from "@medusajs/framework/utils";
import VehicleGeneration from "./vehicle-generation";

const VehicleEngine = model.define("vehicle_engine", {
  id: model.id().primaryKey(),
  engine_code: model.text(),
  fuel_type: model.text(),
  displacement_cc: model.number(),
  horsepower: model.number(),
  generation: model.belongsTo(() => VehicleGeneration, {
    mappedBy: "engines",
  }),
});

export default VehicleEngine;
