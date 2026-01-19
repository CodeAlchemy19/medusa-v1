// src/scripts/seed-categories.ts
import { ExecArgs } from "@medusajs/framework/types"
import { createProductCategoriesWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function seedCategories({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  // 1. Create root categories
  const rootCategoriesInput = [
    { name: "Brake System", handle: "brake-system" },
    { name: "Filters", handle: "filters" },
    { name: "Suspension", handle: "suspension" },
    { name: "Steering", handle: "steering" },
    { name: "Wipers and washers", handle: "wipers-and-washers" },
  ]

  const { result: roots } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: rootCategoriesInput,
    },
  })

  const byHandle = Object.fromEntries(roots.map((c) => [c.handle, c]))

  // 2. Create children with parent_category_id
  const childrenInput = [
    // Brake System
    { name: "Brake discs", handle: "brake-discs", parent_category_id: byHandle["brake-system"].id },
    { name: "Brake pads", handle: "brake-pads", parent_category_id: byHandle["brake-system"].id },
    { name: "Brake calipers", handle: "brake-calipers", parent_category_id: byHandle["brake-system"].id },
    { name: "Brake system accessories", handle: "brake-system-accessories", parent_category_id: byHandle["brake-system"].id },
    { name: "Brake pad wear indicators", handle: "brake-pad-wear-indicators", parent_category_id: byHandle["brake-system"].id },
    { name: "Brake calipers parts", handle: "brake-calipers-parts", parent_category_id: byHandle["brake-system"].id },
    { name: "Handbrake parts", handle: "handbrake-parts", parent_category_id: byHandle["brake-system"].id },

    // Filters
    { name: "Oil filters", handle: "oil-filters", parent_category_id: byHandle["filters"].id },
    { name: "Air filters", handle: "air-filters", parent_category_id: byHandle["filters"].id },
    { name: "Cabi air filters", handle: "cabi-air-filters", parent_category_id: byHandle["filters"].id },
    { name: "Fuel filters", handle: "fuel-filters", parent_category_id: byHandle["filters"].id },
    { name: "Filter sets", handle: "filter-sets", parent_category_id: byHandle["filters"].id },
    { name: "Hydraulic filters", handle: "hydraulic-filters", parent_category_id: byHandle["filters"].id },
    { name: "Cooland fitlers", handle: "cooland-fitlers", parent_category_id: byHandle["filters"].id },
    { name: "Power steering filters", handle: "power-steering-filters", parent_category_id: byHandle["filters"].id },

    // Suspension
    { name: "Shock absorbers", handle: "shock-absorbers", parent_category_id: byHandle["suspension"].id },
    { name: "Coil springs", handle: "coil-springs", parent_category_id: byHandle["suspension"].id },
    { name: "Strut bearings & mounts", handle: "strut-bearings-mounts", parent_category_id: byHandle["suspension"].id },
    { name: "Strut boots", handle: "strut-boots", parent_category_id: byHandle["suspension"].id },
    { name: "Wheel bearings", handle: "wheel-bearings", parent_category_id: byHandle["suspension"].id },
    { name: "Wheel hubs", handle: "wheel-hubs", parent_category_id: byHandle["suspension"].id },
    { name: "Control arms", handle: "control-arms", parent_category_id: byHandle["suspension"].id },
    { name: "Wheel Nuts, Bolts & Struds", handle: "wheel-nuts-bolts-struds", parent_category_id: byHandle["suspension"].id },
    { name: "Pitman arms", handle: "pitman-arms", parent_category_id: byHandle["suspension"].id },
    { name: "Sway bar links", handle: "sway-bar-links", parent_category_id: byHandle["suspension"].id },
    { name: "Stabilizers", handle: "stabilizers", parent_category_id: byHandle["suspension"].id },
    { name: "Spring caps", handle: "spring-caps", parent_category_id: byHandle["suspension"].id },
    { name: "Ball Joints", handle: "ball-joints", parent_category_id: byHandle["suspension"].id },

    // Steering
    { name: "Tie Rod Ends", handle: "tie-rod-ends", parent_category_id: byHandle["steering"].id },
    { name: "Tie rod assemblies", handle: "tie-rod-assemblies", parent_category_id: byHandle["steering"].id },
    { name: "Streering racks", handle: "streering-racks", parent_category_id: byHandle["steering"].id },
    { name: "Power steering pumps", handle: "power-steering-pumps", parent_category_id: byHandle["steering"].id },
    { name: "Steering rack bellows", handle: "steering-rack-bellows", parent_category_id: byHandle["steering"].id },
    { name: "Steering arms", handle: "steering-arms", parent_category_id: byHandle["steering"].id },
    { name: "Steering hoses", handle: "steering-hoses", parent_category_id: byHandle["steering"].id },
    { name: "Steering colums", handle: "steering-colums", parent_category_id: byHandle["steering"].id },
    { name: "Steering dampers", handle: "steering-dampers", parent_category_id: byHandle["steering"].id },
    { name: "Power steering tanks / reservoirs", handle: "power-steering-tanks-reservoirs", parent_category_id: byHandle["steering"].id },
    { name: "Steering locks", handle: "steering-locks", parent_category_id: byHandle["steering"].id },
    { name: "Steering rack mountings", handle: "steering-rack-mountings", parent_category_id: byHandle["steering"].id },

    // Wipers and washers
    { name: "Wiper blades", handle: "wiper-blades", parent_category_id: byHandle["wipers-and-washers"].id },
    { name: "Wiper motors", handle: "wiper-motors", parent_category_id: byHandle["wipers-and-washers"].id },
    { name: "Windscreen washer pumps", handle: "windscreen-washer-pumps", parent_category_id: byHandle["wipers-and-washers"].id },
    { name: "Wiper linkage assemblies", handle: "wiper-linkage-assemblies", parent_category_id: byHandle["wipers-and-washers"].id },
    { name: "Headlight washer pumps and nozzles", handle: "headlight-washer-pumps-nozzles", parent_category_id: byHandle["wipers-and-washers"].id },
    { name: "Wiper arms", handle: "wiper-arms", parent_category_id: byHandle["wipers-and-washers"].id },
    { name: "Windscreen washer fluid nozzles", handle: "windscreen-washer-fluid-nozzles", parent_category_id: byHandle["wipers-and-washers"].id },
    { name: "Washer fluid tanks", handle: "washer-fluid-tanks", parent_category_id: byHandle["wipers-and-washers"].id },
  ]

  const { result: children } = await createProductCategoriesWorkflow(container).run({
    input: {
      product_categories: childrenInput,
    },
  })

  logger.info(
    `Seeded ${roots.length} root categories and ${children.length} child categories.`
  )
}