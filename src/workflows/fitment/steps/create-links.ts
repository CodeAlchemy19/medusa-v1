// src/workflows/hooks/create-fitment.ts
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";
import { LinkDefinition } from "@medusajs/framework/types";
import { AUTOMOTIVE_MODULE } from "../../../modules/automotive";

type StepInput = {
  fitments: any[];
  variant_id: string;
};

export const createLinks = createStep(
  "create-links",
  async (input: StepInput, { container }) => {
    const { fitments, variant_id } = input;
    if (!variant_id) {
      return new StepResponse([], []);
    }

    const query = container.resolve("query");
    // if the variant doesn't exist, an error is thrown.

    const { data: variants } = await query.graph({
      entity: "product_variant",
      fields: ["*"],
      filters: {
        id: variant_id,
      },
    })

    if (variants.length === 0) {
      throw new Error(
        `Product variant with id ${variant_id} does not exist.`
      );
    }
    // TODO link variant to fitments

    const link = container.resolve("link");
    const logger = container.resolve("logger");

    const links: LinkDefinition[] = [];

    const fitmentArray = Array.isArray(fitments) ? fitments : [fitments];
    for (const fitment of fitmentArray) {
      links.push({
        [Modules.PRODUCT]: {
          product_variant_id: variant_id,
        },
        [AUTOMOTIVE_MODULE]: {
          fitment_id: fitment.id,
        },
      });
    }

    await link.create(links);

    return new StepResponse(links, links);
  },
  async (links: LinkDefinition[], { container }) => {
    if (!links?.length) {
      return;
    }

    const link = container.resolve("link");

    await link.dismiss(links);
  }
);
