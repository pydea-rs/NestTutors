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
exports.HumanController = void 0;
const common_1 = require("@nestjs/common");
const human_service_1 = require("./human.service");
const minutes_dto_1 = require("./dtos/minutes.dto");
let HumanController = class HumanController {
    constructor(humanService) {
        this.humanService = humanService;
    }
    getStatus() {
        return this.humanService.status;
    }
    listenMusic(body) {
        return this.humanService.listenMusic(body.minutes);
    }
    doExercise(body) {
        return this.humanService.doExercise(body.minutes);
    }
};
exports.HumanController = HumanController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HumanController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('/music'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [minutes_dto_1.MinutesDto]),
    __metadata("design:returntype", void 0)
], HumanController.prototype, "listenMusic", null);
__decorate([
    (0, common_1.Post)('/exercise'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [minutes_dto_1.MinutesDto]),
    __metadata("design:returntype", void 0)
], HumanController.prototype, "doExercise", null);
exports.HumanController = HumanController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [human_service_1.HumanService])
], HumanController);
//# sourceMappingURL=human.controller.js.map