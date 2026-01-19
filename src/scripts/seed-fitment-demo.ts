// src/scripts/seed-automotive-fitment.ts
import { ExecArgs } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { createFitmentsWorkflow } from "../workflows/fitment/workflows/create-fitments";
import { getVariantsByVehicleWorkflow } from "../workflows/variant/workflows/get-variants-by-vehicle";
import { AUTOMOTIVE_MODULE } from "../modules/automotive";

export default async function seedAutomotiveFitment({ container }: ExecArgs) {

  const automotiveModuleService = container.resolve(AUTOMOTIVE_MODULE);

  // Resolve Medusa commerce modules
  const productModule = container.resolve(Modules.PRODUCT);
  const regionModule = container.resolve(Modules.REGION);
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL);

  // initial state? if not, return.
  let products = await productModule.listProducts(
    {
      handle: "front-brake-pads",
    },
    {
      relations: ["variants"],
    }
  );
  if (products.length) {
    console.log(
      "⚠️ The Product with same handle already exists",
      products.length
    );
    return;
  }

  // Brand
  const suzuki = await automotiveModuleService.createVehicleBrands([
    {
      name: "Suzuki",
    },
  ]);

  console.log("✅ Brand created", suzuki);
  // Model
  const swift = await automotiveModuleService.createVehicleModels([
    {
      name: "Swift",
      brand: suzuki[0].id,
    },
  ]);
  console.log("✅ Swift created", swift);
  // Generation
  const swiftGen = await automotiveModuleService.createVehicleGenerations([
    {
      model_id: swift[0].id,
      year_from: 2017,
      year_to: 2020,
    },
  ]);

  // Engine / vehicle type
  const swiftEngine1 = await automotiveModuleService.createVehicleEngines([
    {
      generation_id: swiftGen[0].id,
      engine_code: "K12M",
      fuel_type: "Petrol",
      displacement_cc: 1197,
      horsepower: 82,
    },
  ]);

  console.log("✅ Swift engine 1", swiftEngine1);
  // Engine / vehicle type
  const swiftEngine2 = await automotiveModuleService.createVehicleEngines([
    {
      generation_id: swiftGen[0].id,
      engine_code: "K14M-1",
      fuel_type: "Hybrid",
      displacement_cc: 1197,
      horsepower: 90,
    },
  ]);
  console.log("✅ Swift engine 2", swiftEngine2);
  console.log("✅ Vehicle data seeded successfully");

  const [region] = await regionModule.listRegions();
  const [defaultChannel] = await salesChannelModule.listSalesChannels();

  // Create product + variant

  products = await productModule.createProducts({
    title: "Front Brake Pads",
    handle: "front-brake-pads",
    status: "published",
    variants: [
      {
        title: "Standard Set",
        sku: "BP-SUZ-SWIFT-STD",
        manage_inventory: false,
        prices: [
          {
            amount: 4500,
            currency_code: region?.currency_code,
          },
        ],
        sales_channel_ids: [defaultChannel?.id],
      },
      {
        title: "Premium Set",
        sku: "BP-SUZ-SWIFT-PRE",
        manage_inventory: false,
        prices: [
          {
            amount: 5500,
            currency_code: region?.currency_code,
          },
        ],
        sales_channel_ids: [defaultChannel?.id],
      },
    ],
  });

  let variant1, variant2;
  if (Array.isArray(products)) {
    variant1 = products[0]?.variants[0];
    variant2 = products[0]?.variants[1];
  } else {
    variant1 = products?.variants[0];
    variant2 = products?.variants[1];
  }
  console.log(
    "✅ Fitment demo data seeded successfully before workflow",
    products,
    "variant1:",
    variant1,
    "variant2:",
    variant2
  );

  // Create fitment between variant and vehicle engine
  await createFitmentsWorkflow(container).run({
    input: {
      fitments: [
        {
          variant_id: variant1?.id,
          vehicle_engine_id: swiftEngine1[0].id,
          position: "front",
          criteria: {
            axle: "front",
            notes: "Fits OEM calipers only",
          },
        },
      ],
      additional_data: { variant_id: variant1?.id },
    },
  });
  console.log("✅ Fitment1 seeded successfully");

  if (variant2) {
    await createFitmentsWorkflow(container).run({
      input: {
        fitments: [
          {
            variant_id: variant2?.id,
            vehicle_engine_id: swiftEngine2[0].id,
            position: "back",
            criteria: {
              axle: "back",
              notes: "Fits OEM calipers only",
            },
          },
        ],
        additional_data: { variant_id: variant2.id },
      },
    });
    console.log("✅ Fitment2 seeded successfully");
  }

  console.log("✅ Fitment demo data seeded successfully");
}
