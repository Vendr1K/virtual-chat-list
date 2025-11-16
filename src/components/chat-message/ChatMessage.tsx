import type { HtmlHTMLAttributes } from 'react';

interface ChatMessageProps extends HtmlHTMLAttributes<HTMLDivElement> {}

export const ChatMessage = ({ children }: ChatMessageProps) => {
  return <div>{children}</div>;
};
