import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { createFitmentsWorkflow } from "../../../workflows/fitment/workflows/create-fitments";
import { AUTOMOTIVE_MODULE } from "../../../modules/automotive";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { variant_id, vehicle_engine_id, position, criteria } = req.body as {
    variant_id: string;
    vehicle_engine_id: string;
    position?: string;
    criteria?: Record<string, any> | null;
  };

  const { result } = await createFitmentsWorkflow(req.scope).run({
    input: {
      fitments: [
        {
          variant_id,
          vehicle_engine_id,
          position,
          criteria,
        },
      ],
      variant_id,
    },
  });

  if (!result.linksCreated || result.linksCreated.length === 0) {
    res.send({ status: "failed" });
  } else {
    res.send({
      status: "success",
      fitment: { ...result.fitments[0], variant_id },
    });
  }
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse){
    const { fitment_ids } = req.body as {
        fitment_ids: string[];
    };

    const automotiveService = req.scope.resolve(AUTOMOTIVE_MODULE);

    await automotiveService.deleteFitments(fitment_ids);

    res.status(200).send({ status: "success", deleted: fitment_ids.length });
}