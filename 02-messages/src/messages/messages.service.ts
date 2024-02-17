import { MessagesRepository } from "./messages.repository";

export class MessagesService {
    messagesRepo: MessagesRepository;

    constructor() {
        // Wrong technique. but using this for now...
        this.messagesRepo = new MessagesRepository();
    }

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