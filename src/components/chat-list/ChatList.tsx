import { ChatMessage } from '../chat-message/ChatMessage';

export const ChatList = () => {
  return (
    <div>
      ChatList
      <ul>
        {Array.from({ length: 10 }, (_, index) => (
          <li key={index}>
            <ChatMessage />
          </li>
        ))}
      </ul>
    </div>
  );
};
