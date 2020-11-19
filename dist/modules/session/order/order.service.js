"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const session_service_1 = require("../session/session.service");
const order_exception_msg_1 = require("./order-exception.msg");
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const order_entity_1 = require("./order.entity");
const typeorm_2 = require("@nestjs/typeorm");
let OrderService = class OrderService {
    constructor(_orderRepository, _controlService) {
        this._orderRepository = _orderRepository;
        this._controlService = _controlService;
    }
    async findAll() {
        const qb = this._orderRepository.createQueryBuilder('orders');
        const orders = await qb.getMany();
        const count = await qb.getCount();
        return { orders, count };
    }
    async findAllByControlid(controlId) {
        const qb = this._orderRepository.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.session', 'session')
            .where('session.id = :controlId', { controlId });
        const orders = await qb.getMany();
        const count = await qb.getCount();
        return { orders, count };
    }
    async insertOne(orderCreateDto) {
        const orderEntity = class_transformer_1.plainToClass(order_entity_1.OrderEntity, orderCreateDto);
        const foundControl = (await this._controlService.findOneById(orderCreateDto.session)).session;
        orderEntity.session = foundControl;
        const savedOrder = await this._orderRepository.save(orderEntity);
        return { order: savedOrder };
    }
    async updateOne(orderUpdateDto) {
        let foundOrder = await this._orderRepository.createQueryBuilder('orders')
            .where('orders.id = :id', { id: orderUpdateDto.id })
            .getOne();
        if (!foundOrder) {
            throw new common_1.NotFoundException(order_exception_msg_1.OrderExceptionMSG.NOT_FOUND);
        }
        foundOrder = class_transformer_1.plainToClassFromExist(foundOrder, orderUpdateDto);
        const foundControl = (await this._controlService.findOneById(orderUpdateDto.session)).session;
        foundOrder.session = foundControl;
        const savedOrder = await this._orderRepository.save(foundControl);
        return { order: savedOrder };
    }
    async deactivate(id) {
        const foundOrder = await this._orderRepository.createQueryBuilder('orders')
            .where('orders.id = :id', { id })
            .getOne();
        if (!foundOrder) {
            throw new common_1.NotFoundException(order_exception_msg_1.OrderExceptionMSG.NOT_FOUND);
        }
        const updateResult = await this._orderRepository.update(id, { active: 0 });
        return updateResult.affected > 0;
    }
    async activate(id) {
        const foundOrder = await this._orderRepository.createQueryBuilder('orders')
            .where('orders.id = :id', { id })
            .getOne();
        if (!foundOrder) {
            throw new common_1.NotFoundException(order_exception_msg_1.OrderExceptionMSG.NOT_FOUND);
        }
        const updateResult = await this._orderRepository.update(id, { active: 1 });
        return updateResult.affected > 0;
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        session_service_1.SessionService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map