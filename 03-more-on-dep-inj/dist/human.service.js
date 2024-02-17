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
exports.HumanService = void 0;
const common_1 = require("@nestjs/common");
const exercise_service_1 = require("./exercise/exercise.service");
const music_service_1 = require("./music/music.service");
let HumanService = class HumanService {
    constructor(exerciseService, musicService) {
        this.exerciseService = exerciseService;
        this.musicService = musicService;
    }
    get status() {
        const { energy, endorphins } = this.musicService.status;
        const happinessStates = ['Suicidal', 'Despressed', 'Sad', 'Neutral', 'Hopeful', 'Happy As Fuck!'];
        const happinessStatus = endorphins < 600 ? happinessStates[Math.floor(endorphins / 100)] : happinessStates[happinessStates.length - 1];
        const staminaStates = ['Sleep', 'Exhausted AF', 'Just Exhausted', 'Tired', 'Nearly Tired', 'Neutral', 'Good', 'Great', 'Energetic', 'Superman', 'Superman Plus'];
        const staminaStatus = energy >= 10 ? staminaStates[Math.ceil(energy / 100)] : energy > 0 ? staminaStates[1] : staminaStates[0];
        return { ...this.musicService.status, staminaStatus: `This man is ${staminaStatus}.`, happinessStatus: `This man is ${happinessStatus} now.` };
    }
    listenMusic(minutes) {
        return this.musicService.listen(minutes);
    }
    doExercise(minutes) {
        return this.exerciseService.do(minutes);
    }
};
exports.HumanService = HumanService;
exports.HumanService = HumanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exercise_service_1.ExerciseService,
        music_service_1.MusicService])
], HumanService);
//# sourceMappingURL=human.service.js.map