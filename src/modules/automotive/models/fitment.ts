import { model } from "@medusajs/framework/utils";
import VehicleEngine from "./vehicle-engine";

// FITMENT / COMPATIBILITY
const Fitment = model.define("fitment", {
  id: model.id().primaryKey(),
  vehicle_engine: model.belongsTo(() => VehicleEngine),
  position: model.text(),
  criteria: model.json().nullable(),
});

export default Fitment;
