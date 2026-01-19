import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

export const extractNecessaryVehiclesStep = createStep(
  "extract-necessary-vehicles",
  async (input: { vehicle_engines: any[] }) => {
    console.log(
      "Extracting necessary vehicle data from vehicle engines:",
      input.vehicle_engines,
    );
    const vehicles : any[] = [];
    for (const ve of input.vehicle_engines || []) {
      vehicles.push({
        brand: ve.generation?.model?.brand?.name,
        model: ve.generation?.model?.name,
        generation: `${ve.generation.year_from}-${ve.generation.year_to || "present"}`,
        engine: ve.engine_code,
      });
    }
    console.log("Extracted vehicles:", vehicles);
    return new StepResponse({ vehicles });
  },
);
