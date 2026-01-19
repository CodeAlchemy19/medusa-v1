// src/workflows/steps/get-fitments-by-vehicle.ts
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { AUTOMOTIVE_MODULE } from "../../../modules/automotive";

export type StepInput = {
  vehicle_engine_id: string;
};

export const getFitmentsByVehicleStep = createStep(
  "get-fitments-by-vehicle",
  async (input: StepInput, { container }) => {
    const automotiveService = container.resolve(AUTOMOTIVE_MODULE);
    const fitments = await automotiveService.listFitmentsByVehicle(
      input.vehicle_engine_id,
    );
    return new StepResponse(fitments);
  },
);
