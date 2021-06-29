import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass, plainToClassFromExist } from 'class-transformer';
import { Repository } from 'typeorm';
import { SessionEntity } from '../session/session.entity';
import { SessionService } from '../session/session.service';
import { OrderCreateDto } from './dto/order-create.dto';
import { OrderRO, OrdersRO } from './dto/order-response.dto';
import { OrderUpdateDto } from './dto/order-update.dto';
import { OrderExceptionMSG } from './order-exception.msg';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderEntity)
        private readonly _orderRepository: Repository<OrderEntity>,
        private readonly _controlService: SessionService,
    ) { }

    async findAll(): Promise<OrdersRO> {
        const qb = this._orderRepository.createQueryBuilder('orders');
        const orders: OrderEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { orders, count };
    }

    async findAllByControlid(controlId: number): Promise<OrdersRO> {
        const qb = this._orderRepository.createQueryBuilder('orders')
            .leftJoinAndSelect('orders.session', 'session')
            .where('session.id = :controlId', { controlId });
        const orders: OrderEntity[] = await qb.getMany();
        const count: number = await qb.getCount();
        return { orders, count };
    }

    async insertOne(orderCreateDto: OrderCreateDto): Promise<OrderRO> {
        const orderEntity: OrderEntity = plainToClass(OrderEntity, orderCreateDto);
        const foundControl: SessionEntity = (await this._controlService.findOneById(orderCreateDto.session)).session;
        orderEntity.session = foundControl;
        const savedOrder: OrderEntity = await this._orderRepository.save(orderEntity);
        return { order: savedOrder };
    }

    async updateOne(orderUpdateDto: OrderUpdateDto): Promise<OrderRO> {
        let foundOrder: OrderEntity = await this._orderRepository.createQueryBuilder('orders')
            .where('orders.id = :id', { id: orderUpdateDto.id })
            .getOne();
        if (!foundOrder) {
            throw new NotFoundException(OrderExceptionMSG.NOT_FOUND);
        }
        foundOrder = plainToClassFromExist(foundOrder, orderUpdateDto);
        const foundControl: SessionEntity = (await this._controlService.findOneById(orderUpdateDto.session)).session;
        foundOrder.session = foundControl;
        const savedOrder: OrderEntity = await this._orderRepository.save(foundControl);
        return { order: savedOrder };

    }

}
