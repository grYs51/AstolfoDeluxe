import { Module } from '@nestjs/common';
import WebSockectHandler from './socket';

@Module({
  providers: [WebSockectHandler],
  exports: [WebSockectHandler],
})
export default class WebSocketModule {}
