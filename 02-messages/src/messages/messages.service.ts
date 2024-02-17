import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {

    constructor(private messagesRepo: MessagesRepository) { console.log("Instantiated.")}

    findAll() {
        return this.messagesRepo.findAll();
    }

    findOne(id: string) {
        return this.messagesRepo.findOne(id);
    }

    add(content: string) {
        return this.messagesRepo.add(content);
    }
}