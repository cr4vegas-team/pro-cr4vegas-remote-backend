import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";


export class NumberArrayValidationPipe implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        try {
            const stringsArray: string[] = value.split(',');
            const numbersArray: number[] = [];
            stringsArray.forEach(numberString => {
                const number = parseInt(numberString, 10);
                if (isNaN(number)) {
                    throw new BadRequestException('Incorrect number array');
                }
                numbersArray.push(number);
            });
            return numbersArray;
        } catch (TypeError) {
            throw new BadRequestException();
        }
    }

}