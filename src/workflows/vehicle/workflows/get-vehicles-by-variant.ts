// src/workflows/get-as-by-variant-id.ts
import {
  createWorkflow,
  WorkflowResponse,
  transform,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { getVehiclesByVehicleEngines } from "../steps/get-vehicles-by-vehicle-engines";
import { extractNecessaryVehiclesStep } from "../steps/extract-necessary-vehicles";
import VariantFitmentLink from "../../../links/variant-fitment-link";

export const getVehiclesByVariantWorkflow = createWorkflow(
  "get-vehicles-by-variant-id",
  (input: { variant_id: string }) => {
    // 1) query link table: variant ↔ fitment, and include fitment + vehicle_engine
    const { data: linkRows } = useQueryGraphStep({
      entity: VariantFitmentLink.entryPoint,
      fields: [
        "*",
        "fitment.*",
        "fitment.vehicle_engine.*", // traverse fitment → vehicle_engine relationm
      ],
      filters: {
        product_variant_id: input.variant_id,
      },
    });

    // 3) getting vehicles_engine_ids
    const vehicles_engine_ids = transform({ linkRows }, ({ linkRows }) => {
      if (!linkRows?.length) {
        return [];
      }

      return linkRows
        .map((row: any) => row.fitment?.vehicle_engine.id)
        .filter(Boolean);
    });

    // 4) getting vehicles by vehicle_engine_ids via custom step
    const vehicle_engines = getVehiclesByVehicleEngines({
      vehicle_engine_ids: vehicles_engine_ids,
    });

    const necessaryVehicleData = extractNecessaryVehiclesStep({
      vehicle_engines: vehicle_engines,
    });

    return new WorkflowResponse({ vehicles: necessaryVehicleData.vehicles });
  },
);
