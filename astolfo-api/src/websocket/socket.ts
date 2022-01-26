import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway()
export class WebSockectHandler {

  @SubscribeMessage('guilds')
  guildsHandler(@MessageBody() data: any) {
    console.log(data)
  }
}