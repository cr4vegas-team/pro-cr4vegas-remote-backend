import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
export declare class NumberArrayValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): number[];
}
