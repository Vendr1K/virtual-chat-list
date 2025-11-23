export type MessageType = {
  id: number;
  message: string;
  author: {
    id: number;
    name: string;
    nick: string;
  };
  reactions: {
    id: number;
    icon: string;
    userId: number;
  }[];
  reference: null | number;
  chatId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  referenceMessage: null | ReferenceMessageType;
};

export type ReferenceMessageType = {
  id: number;
  message: string;
  author: {
    id: number;
    name: string;
    nick: string;
  };
  reference: null | number;
  chatId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  referenceMessage: null;
};
