import { Component, OnInit } from '@angular/core';
import restaurantData from 'src/assets/bot.json';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isChatVisible: boolean = false;
  message: string = '';
  userInput = '';  
  messages: Message[] = [];
  restaurantInfo: any;

  ngOnInit() {
    this.restaurantInfo = restaurantData;
  }

  toggleChatVisibility(): void {
    this.isChatVisible = !this.isChatVisible;
  }

  sendMessage(): void {
    const userMessage = this.userInput.trim();
    if (userMessage) {

      this.messages.push({ text: userMessage, sender: 'user' });

      const botResponse = this.getBotResponse(userMessage);

      this.messages.push({ text: botResponse, sender: 'bot' });

      this.userInput = '';
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage(); 
    }
  }

  getBotResponse(userMessage: string): string {
    const msg = userMessage.toLowerCase();

    if (msg.includes('menu') || msg.includes('available food')) {
      if (this.restaurantInfo.menu && this.restaurantInfo.menu.length > 0) {
        return this.restaurantInfo.menu
          .map((item: any) => `${item.name} - ₹${item.price}`)
          .join('\n');
      }
      return "Sorry, I couldn't fetch the menu at the moment.";
    }

    if (msg.includes('timing') || msg.includes('open')) {
      return `We are open from ${this.restaurantInfo.openingHours}.`;
    }

    if (msg.includes('location') || msg.includes('where')) {
      return `We are located at ${this.restaurantInfo.location}.`;
    }

    if (msg.includes('reviews') || msg.includes('feedback')) {
      if (this.restaurantInfo.reviews && this.restaurantInfo.reviews.length > 0) {
        return this.restaurantInfo.reviews
          .map((review: any) => `${review.user}: ${review.rating} stars - "${review.comment}"`)
          .join('\n');
      }
      return "No reviews available at the moment.";
    }

    if (msg.includes('offer') || msg.includes('discount')) {
      if (this.restaurantInfo.specialOffer) {
        return `Special Offer: ${this.restaurantInfo.specialOffer.description} (Validity: ${this.restaurantInfo.specialOffer.validity})`;
      }
      return "Sorry, no special offers at the moment.";
    }

    return 'Sorry, I did not understand that.';
  }
  sendPredefinedMessage(predefinedMessage: string): void {
    this.userInput = predefinedMessage;
    this.sendMessage();
  }
}
