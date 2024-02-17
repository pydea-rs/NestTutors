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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicService = void 0;
const common_1 = require("@nestjs/common");
const endorphin_service_1 = require("../endorphin/endorphin.service");
const energy_service_1 = require("../energy/energy.service");
let MusicService = class MusicService {
    constructor(endorphinService, energyService) {
        this.endorphinService = endorphinService;
        this.energyService = energyService;
    }
    listen(minutes) {
        if (this.energyService.level <= 0)
            throw new common_1.ForbiddenException('Cannot do any more work. This human has fallen sleep!');
        this.energyService.consume(minutes / 20);
        this.endorphinService.produce(minutes / 4);
        return this.status;
    }
    get energyLevel() {
        return this.energyService.level;
    }
    get endorphinLevel() {
        return this.endorphinService.level;
    }
    get status() {
        return { endorphins: this.endorphinLevel, energy: this.energyLevel };
    }
};
exports.MusicService = MusicService;
exports.MusicService = MusicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [endorphin_service_1.EndorphinService, energy_service_1.EnergyService])
], MusicService);
//# sourceMappingURL=music.service.js.map