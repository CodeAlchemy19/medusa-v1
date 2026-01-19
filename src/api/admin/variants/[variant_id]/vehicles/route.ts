import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { getVehiclesByVariantWorkflow } from "../../../../../workflows/vehicle/workflows/get-vehicles-by-variant";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { result } = await getVehiclesByVariantWorkflow(req.scope).run({
    input: {
      variant_id: req.params.variant_id as string,
    },
  });

  res.send({ variant_id: req.params.variant_id, fits: result.vehicles });
}