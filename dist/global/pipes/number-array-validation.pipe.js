"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberArrayValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class NumberArrayValidationPipe {
    transform(value, metadata) {
        try {
            const stringsArray = value.split(',');
            const numbersArray = [];
            stringsArray.forEach(numberString => {
                const number = parseInt(numberString, 10);
                if (isNaN(number)) {
                    throw new common_1.BadRequestException('Incorrect number array');
                }
                numbersArray.push(number);
            });
            return numbersArray;
        }
        catch (TypeError) {
            throw new common_1.BadRequestException();
        }
    }
}
exports.NumberArrayValidationPipe = NumberArrayValidationPipe;
//# sourceMappingURL=number-array-validation.pipe.js.map