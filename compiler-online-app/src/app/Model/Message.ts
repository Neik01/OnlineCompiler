export class WebsocketMessage {

    content: string;
    roomId: string;
    userId: string;
  
    constructor(content: string, roomId: string, userId: string) {
      this.content = content;
      this.roomId = roomId;
      this.userId = userId;
    }

   
}

interface ServerResponse {
  content: string;
  roomId: string;
  userId: string;
}
