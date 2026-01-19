// src/workflows/create-fitments/index.ts
import {
  createWorkflow,
  createHook,
  WorkflowResponse,
  transform,
} from "@medusajs/framework/workflows-sdk";

import { createFitmentsStep } from "../steps/create-fitments";
import { createLinks } from "../steps/create-links";
import { create } from "domain";

type CreateFitmentInput = {
  variant_id: string;
  vehicle_engine_id: string;
  position?: string;
  criteria?: Record<string, any> | null;
};

export type CreateFitmentsWorkflowInput = {
  fitments: CreateFitmentInput[];
  variant_id: string;
};

export const createFitmentsWorkflow = createWorkflow(
  "create-fitments-workflow",
  (input: CreateFitmentsWorkflowInput) => {

    const createdFitments = createFitmentsStep(input);

    const linksCreated = createLinks({
      fitments: createdFitments,
      variant_id: input.variant_id
    });

    return new WorkflowResponse({ fitments: createdFitments, linksCreated });
  },
);
