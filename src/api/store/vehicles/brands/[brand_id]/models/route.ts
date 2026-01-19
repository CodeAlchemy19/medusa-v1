import { MedusaResponse, MedusaRequest } from "@medusajs/framework";
import { AUTOMOTIVE_MODULE } from "../../../../../../modules/automotive";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const { brand_id } = req.params;
  const automotiveService = req.scope.resolve(AUTOMOTIVE_MODULE);
  const data = await automotiveService.retrieveVehicleBrand(brand_id, {
    relations: ["models"],
  });
  res.send(data);
}