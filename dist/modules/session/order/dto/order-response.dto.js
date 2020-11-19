"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRO = exports.OrderRO = void 0;
const openapi = require("@nestjs/swagger");
class OrderRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { order: { required: true, type: () => require("../order.entity").OrderEntity } };
    }
}
exports.OrderRO = OrderRO;
class OrdersRO {
    static _OPENAPI_METADATA_FACTORY() {
        return { orders: { required: true, type: () => [require("../order.entity").OrderEntity] }, count: { required: true, type: () => Number } };
    }
}
exports.OrdersRO = OrdersRO;
//# sourceMappingURL=order-response.dto.js.map