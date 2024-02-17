"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const human_module_1 = require("./human.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(human_module_1.HumanModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(4000);
}
bootstrap();
//# sourceMappingURL=main.js.map