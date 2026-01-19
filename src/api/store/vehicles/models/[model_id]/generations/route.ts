import { MedusaResponse, MedusaRequest } from "@medusajs/framework";
import { AUTOMOTIVE_MODULE } from "../../../../../../modules/automotive";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { model_id } = req.params;
  const automotiveService = req.scope.resolve(AUTOMOTIVE_MODULE);
  const data = await automotiveService.retrieveVehicleModel(model_id, {
    relations: ["generations"],
  });
  res.send(data);
}