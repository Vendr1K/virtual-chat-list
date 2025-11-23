import { ChatContent } from '@/components';

export const ChatView = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 bg-zinc-700">
        <h2>Chat title</h2>
      </div>
      <ChatContent />
      <div className="p-4 bg-zinc-700">Chat editor</div>
    </div>
  );
};
