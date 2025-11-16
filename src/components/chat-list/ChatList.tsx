import { ChatMessage } from '@/components';

export const ChatList = () => {
  return (
    <div className="w-full flex flex-col">
      ChatList
      <ul className="flex flex-col h-full w-full overflow-auto">
        {Array.from({ length: 100 }, (_, index) => (
          <li key={index}>
            <ChatMessage>message {index}</ChatMessage>
          </li>
        ))}
      </ul>
    </div>
  );
};
