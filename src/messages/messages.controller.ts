import { Controller, Post, Param, Body, Patch, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageStatus } from './enums/message-status.enum';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send messages for a campaign' })
  @ApiResponse({ status: 200, description: 'Messages have been sent successfully.' })
  @ApiResponse({ status: 404, description: 'Campaign not found.' })
  sendMessages(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.sendMessagesForCampaign(createMessageDto);
  }
  @Patch(':id/status/:status')
  @ApiOperation({ summary: 'Update the status of a message' })
  @ApiResponse({ status: 200, description: 'The message status has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Message not found.' })
  updateMessageStatus(@Param('id') id: string, @Param('status') status: MessageStatus) {
    return this.messagesService.updateMessageStatus(+id, status);
  }

  @Get('campaign/:campaignId')
  @ApiOperation({ summary: 'Get messages of a campaign' })
  @ApiResponse({ status: 200, description: 'Return messages of the campaign.' })
  @ApiResponse({ status: 404, description: 'Campaign not found.' })
  findMessagesByCampaign(@Param('campaignId') campaignId: string) {
    return this.messagesService.findMessagesByCampaign(+campaignId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all messages' })
  @ApiResponse({ status: 200, description: 'Return all messages.' })
  findAll() {
    return this.messagesService.findAll();
  }

}
