// src/workflows/steps/get-vehicles-by-vehicle-engines.ts
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { AUTOMOTIVE_MODULE } from "../../../modules/automotive";

type StepInput = {
  vehicle_engine_ids: string[];
};

export const getVehiclesByVehicleEngines = createStep(
  "get-vehicles-by-vehicle-engines",
  async (input: StepInput, { container }) => {
    const automotiveService = container.resolve(AUTOMOTIVE_MODULE);
    const vehicles: any[] = [];

    for (const id of input.vehicle_engine_ids || []) {
      const vehicle = await automotiveService.retrieveVehicleEngine(id, {
        relations: ["generation", "generation.model", "generation.model.brand"],
      });
      if (vehicle) {
        vehicles.push(vehicle);
      }
    }

    console.log("Retrieved vehicles by vehicle engine IDs:", vehicles);

    return new StepResponse(vehicles);
  },
);
