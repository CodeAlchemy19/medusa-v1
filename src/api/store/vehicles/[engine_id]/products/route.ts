import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { getVariantsByVehicleWorkflow } from "../../../../../workflows/variant/workflows/get-variants-by-vehicle";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { result } = await getVariantsByVehicleWorkflow(req.scope).run({
    input: {
      vehicle_engine_id: req.params.engine_id as string,
    },
  });

  const products = result.variants.map((variant: any) => variant.product).filter(Boolean);
  res.send(products);
}
