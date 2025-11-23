import { mockMessages } from '@/mock';
import { ChatMessage } from '@/components';

export const ChatList = () => {
  return (
    <div className="w-full flex flex-col">
      ChatList
      <ul className="flex flex-col h-full w-full overflow-auto gap-2 py-4">
        {mockMessages.map((message) => {
          return (
            <li key={message.id} className="px-4 py-1 hover:bg-zinc-400/10">
              <ChatMessage message={message} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
