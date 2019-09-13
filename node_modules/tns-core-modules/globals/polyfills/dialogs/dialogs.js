Object.defineProperty(exports, "__esModule", { value: true });
require("../../core");
var polyfill_helpers_1 = require("../polyfill-helpers");
global.registerModule("tns-core-modules/ui/dialogs", function () { return require("../../../ui/dialogs"); });
polyfill_helpers_1.installPolyfills("tns-core-modules/ui/dialogs", ["alert", "confirm", "prompt", "login", "action"]);
//# sourceMappingURL=dialogs.js.map