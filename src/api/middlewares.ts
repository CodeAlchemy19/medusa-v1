// // src/api/middlewares.ts
// import { defineMiddlewares } from "@medusajs/framework/http"
// import { z } from "zod"

// export default defineMiddlewares({
//   routes: [
//     {
//       // match your custom route that will call createFitmentWorkflow
//       matcher: "/admin/fitments",
//       method: ["POST"],
//       additionalDataValidator: {
//         // define whatever fields you want to allow in additional_data
//         variant_id: z.string().optional(),
//         notes: z.string().optional(),
//         // e.g. a generic object:
//         meta: z.record(z.any()).optional(),
//       },
//     },
//   ],
// })