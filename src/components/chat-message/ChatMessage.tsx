import type { HtmlHTMLAttributes } from 'react';
import type { MessageType } from '@/mock';

interface ChatMessageProps extends HtmlHTMLAttributes<HTMLDivElement> {
  message: MessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const date = new Date(message.createdAt)
    .toLocaleString('en-EN', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(/, /g, ' ');

  return (
    <div>
      <div className="flex gap-2 items-baseline">
        <p className="font-bold text-xl">{message.author.nick}</p>
        <time className="flex w-full line-clamp-1 text-start break-all text-xxs font-light md:text-xs opacity-60 lowercase">
          {date}
        </time>
      </div>

      <p>{message.message}</p>
    </div>
  );
};
