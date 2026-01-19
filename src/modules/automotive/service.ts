// src/modules/automotive/service.ts
import { MedusaService } from "@medusajs/framework/utils";
import { InferTypeOf, DAL } from "@medusajs/framework/types";

import AttributeValue from "./models/attribute-value";
import Attribute from "./models/attribute";
import CategoryAttribute from "./models/category-attribute";
import Brand from "./models/brand";
import Fitment from "./models/fitment";
import PartReference from "./models/part-reference";
import VehicleBrand from "./models/vehicle-brand";
import VehicleEngine from "./models/vehicle-engine";
import VehicleModel from "./models/vehicle-model";
import VehicleGeneration from "./models/vehicle-generation";

type FitmentType = InferTypeOf<typeof Fitment>;

type InjectedDependencies = {
  fitmentRepository: DAL.RepositoryService<FitmentType>;
  link: any;
};

class AutomotiveModuleService extends MedusaService({
  Attribute,
  AttributeValue,
  CategoryAttribute,
  Brand,
  Fitment,
  PartReference,
  VehicleBrand,
  VehicleEngine,
  VehicleModel,
  VehicleGeneration,
}) {
  protected fitmentRepository_: DAL.RepositoryService<FitmentType>;

  constructor({ fitmentRepository }: InjectedDependencies) {
    super(...arguments);
    this.fitmentRepository_ = fitmentRepository;
  }

  // list fitments by vehicle_engine_id (pure intra‑module)
  async listFitmentsByVehicle(
    vehicle_engine_id: string
  ): Promise<FitmentType[]> {
    return await this.fitmentRepository_.find({
      where: { vehicle_engine_id: vehicle_engine_id },
    });
  }
}

export default AutomotiveModuleService;
