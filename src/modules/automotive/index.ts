import { Module } from "@medusajs/framework/utils";
import AutomotiveModuleService from "./service";

export const AUTOMOTIVE_MODULE = "automotive";

const AutomotiveModule = Module(AUTOMOTIVE_MODULE, {
  service: AutomotiveModuleService,
});

export default AutomotiveModule;
