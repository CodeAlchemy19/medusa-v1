import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { createFitmentsWorkflow } from "../../../../workflows/fitment/workflows/create-fitments";
import { skip } from "node:test";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { variant_id, vehicle_engine_ids, position, criteria } = req.body as {
    variant_id: string;
    vehicle_engine_ids: string[];
    position?: string;
    criteria?: Record<string, any> | null;
  };

  const { result } = await createFitmentsWorkflow(req.scope).run({
    input: {
      fitments: vehicle_engine_ids.map((engine_id) => ({
        variant_id,
        vehicle_engine_id: engine_id,
        position,
        criteria,
      })),
      variant_id,
    },
  });

  if (!result.linksCreated || result.linksCreated.length === 0) {
    res.send({ status: "failed" });
  } else {
    res.send({
      status: "success",
      created: result.linksCreated.length,
      skipped: vehicle_engine_ids.length - result.linksCreated.length,
    });
  }
}
