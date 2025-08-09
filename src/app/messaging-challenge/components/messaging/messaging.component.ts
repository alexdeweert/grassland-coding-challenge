import { Component } from '@angular/core';
import { MessagingService } from '../../services/messaging.service';
import { TextMessage } from '../../models/text-message';
import { Message } from '../../models/message';
import { ImageMessage } from '../../models/image-message';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent {
  constructor(public messagingService: MessagingService) { }

  isTextMessage(message: Message): message is TextMessage {
    return message instanceof TextMessage
  }
}
