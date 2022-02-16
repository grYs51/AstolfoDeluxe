/* eslint-disable class-methods-use-this */
import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import GuildConfiguration from 'src/utils/typeorm/entities/GuildConfiguration';

const logger = new Logger();
@WebSocketGateway()
export default class WebSockectHandler {
  @WebSocketServer()
  ws: Server;

  @SubscribeMessage('guilds')
  guildsHandler(@MessageBody() data: any) {
    logger.log(data);
  }

  guildPrefixUpdate(config: GuildConfiguration) {
    this.ws.emit('guildPrefixUpdate', config);
  }
}
