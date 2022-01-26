import { Module } from '@nestjs/common';
import { WebSockectHandler } from './socket';

@Module({
  providers: [WebSockectHandler],
})
export class WebSocketModule {}
