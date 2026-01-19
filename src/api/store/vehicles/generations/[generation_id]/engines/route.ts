import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { AUTOMOTIVE_MODULE } from "../../../../../../modules/automotive";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    const { generation_id } = req.params;
    const automotiveService = req.scope.resolve(AUTOMOTIVE_MODULE);
    const data = await automotiveService.retrieveVehicleGeneration(generation_id, {
        relations: ["engines"],
    });
    res.send(data);
}