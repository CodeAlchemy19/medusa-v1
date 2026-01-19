// src/workflows/get-variants-by-a-id.ts
import {
  createWorkflow,
  WorkflowResponse,
  transform,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { getFitmentsByVehicleStep } from "../steps/get-fitments-by-vehicle";
import VariantFitmentLink from "../../../links/variant-fitment-link";

type Input = {
  vehicle_engine_id: string;
};

export const getVariantsByVehicleWorkflow = createWorkflow(
  "get-variants-by-vehicle",
  function (input: Input) {
    // 1) get fitments records via custom step
    const fitments = getFitmentsByVehicleStep(input);

    const fitmentIds = transform({ fitments }, ({ fitments }) => {
      return fitments.map((fitment: any) => fitment.id);
    });

    // 2) query link table to get variants
    const { data: linkRows } = useQueryGraphStep({
      entity: VariantFitmentLink.entryPoint,
      fields: ["product_variant.product.*"],
      filters: {
        fitment_id: fitmentIds,
      },
    });

    // 3) map variants using transform
    const variants = transform({ linkRows }, ({ linkRows }) => {
      if (!linkRows?.length) {
        return [];
      }

      return linkRows.map((row: any) => row.product_variant).filter(Boolean);
    });

    return new WorkflowResponse({ variants });
  },
);
