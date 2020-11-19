"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionsRO = exports.ActionRO = void 0;
const openapi = require("@nestjs/swagger");
class ActionRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { action: { required: true, type: () => require("../action.entity").ActionEntity } };
    }
}
exports.ActionRO = ActionRO;
class ActionsRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { actions: { required: true, type: () => [require("../action.entity").ActionEntity] }, count: { required: true, type: () => Number } };
    }
}
exports.ActionsRO = ActionsRO;
//# sourceMappingURL=action-response.dto.js.map