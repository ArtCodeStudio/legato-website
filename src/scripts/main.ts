import "@ribajs/types";
import { coreModule, Riba } from "@ribajs/core";
import { routerModule } from "@ribajs/router";
// import { extrasModule } from "@ribajs/extras";
import { bs5Module } from "@ribajs/bs5";
import { SliderDemoModule } from "./slider.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(routerModule.init());
// riba.module.register(extrasModule.init());
riba.module.register(bs5Module.init());
riba.module.register(SliderDemoModule.init());


riba.bind(document.body, model);
