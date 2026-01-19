// src/workflows/steps/get-fitments-by-vehicle.ts
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { AUTOMOTIVE_MODULE } from "../../../modules/automotive";
import { CreateFitmentsWorkflowInput } from "../workflows/create-fitments";
import AutomotiveModuleService from "../../../modules/automotive/service";

export type StepInput = {
  vehicle_engine_id: string;
};

// Step: create one or more fitments via your module service
export const createFitmentsStep = createStep(
  "create-fitments",
  async (input: CreateFitmentsWorkflowInput, { container }) => {
    const automotiveService: AutomotiveModuleService =
      container.resolve(AUTOMOTIVE_MODULE);

    const created = await automotiveService.createFitments(input.fitments);
    // first arg: forward to next steps; second arg: input to compensation
    return new StepResponse( created, created);
  },
  // optional compensation: delete created fitments if something later fails
  async (createdFitments, { container }) => {
    if (!createdFitments?.length) {
      return [];
    }
    const automotiveService: AutomotiveModuleService =
      container.resolve(AUTOMOTIVE_MODULE);
    // assuming your service exposes a delete method; if not, omit this
    await automotiveService.deleteFitments(createdFitments.map((f) => f.id));
  },
);
