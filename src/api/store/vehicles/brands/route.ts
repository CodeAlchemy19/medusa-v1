import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { AUTOMOTIVE_MODULE } from "../../../../modules/automotive";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const automotiveService = req.scope.resolve(AUTOMOTIVE_MODULE);
  const [brands, count] =
    await automotiveService.listAndCountVehicleBrands();
  res.send({ brands, count });
}
