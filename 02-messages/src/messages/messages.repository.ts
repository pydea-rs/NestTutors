import { readFile, writeFile } from "fs/promises";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class MessagesRepository {

    async findAll() {
        const contents = await readFile('messages.json', 'utf-8');
        const messages = JSON.parse(contents);
        return messages;
    }

    async findOne(id: string) {
        const messages = await this.findAll();
        const message = messages[id];
        if(!messages[id])
            throw new NotFoundException("Message not found!");
        return messages[id];
    }

    async add(content: string) {
        const messages = await this.findAll();
        const message = {content}, id = Object.values(messages).length + 1;
        messages[id] = message;
        await writeFile('messages.json', JSON.stringify(messages));
        message['id'] = id;
        return {message };
    }
}