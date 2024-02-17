import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AddMessageDto } from './Dtos/add-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    messagesService: MessagesService;

    constructor() {
        // wrong technique. temporary
        this.messagesService = new MessagesService();
    }

    @Get()
    async getMessages() {
        const messages = await this.messagesService.findAll();
        return JSON.stringify(messages);
    }

    @Post()
    async addMessage(@Body() body: AddMessageDto) {
        const message = await this.messagesService.add(body.content);
        return JSON.stringify(message);
    }

    @Get('/:id')
    getSingleMessage(@Param('id') id: string) {
        console.log(id);
        
        return id;
    }
}
