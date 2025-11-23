import { mockMessages, mockMessagesSimpleHeigh } from '@/mock';
import { ChatMessage } from '@/components';
import { useCallback, useRef, useState } from 'react';
import { useSimpleSizeList } from '@/hooks';

// virtualization settings
const ITEM_HEIGHT = 90;
const LIST_SIMPLE_HEIGHT = 600;

export const ChatList = () => {
  const [listItems, setListItems] = useState(mockMessagesSimpleHeigh);
  const [withScrollingSkeleton, setWithScrollingSkeleton] = useState(true);

  const scrollElementRef = useRef<HTMLDivElement>(null);

  const { virtualItems, totalHeight, isScrolling } = useSimpleSizeList({
    itemHeight: ITEM_HEIGHT,
    getScrollElement: useCallback(() => scrollElementRef.current, []),
    itemsCount: listItems.length,
    listHeight: LIST_SIMPLE_HEIGHT,
    withScrollingSkeleton: withScrollingSkeleton,
  });

  return (
    <div className="w-full flex flex-col">
      <div className="flex gap-2 items-center justify-center py-2">
        <button
          className=" px-2 bg-amber-300/20 rounded-md hover:bg-amber-300/30 active:bg-amber-300/40 w-fit transition-colors cursor-pointer"
          onClick={() => setListItems((items) => items.slice().reverse())}
        >
          ReverseList
        </button>
        <button
          className="px-2 bg-amber-300/20 rounded-md hover:bg-amber-300/30 active:bg-amber-300/40 w-fit transition-colors cursor-pointer"
          onClick={() => setWithScrollingSkeleton((prev) => !prev)}
        >
          ScrollingSkeleton: {withScrollingSkeleton ? 'ON' : 'OFF'}
        </button>
      </div>
      <div
        ref={scrollElementRef}
        id="scroller-list"
        style={{ height: LIST_SIMPLE_HEIGHT }}
        className="overflow-auto gap-2 py-4 relative"
      >
        <div style={{ height: totalHeight }} className="w-full">
          {virtualItems.map((virtualItem) => {
            const message = listItems[virtualItem.index];

            return (
              <div
                key={message.id}
                style={{
                  height: ITEM_HEIGHT,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: `translateY(${virtualItem.offsetTop}px)`,
                }}
                className="px-4 py-1 hover:bg-zinc-400/10 w-full"
              >
                {isScrolling && withScrollingSkeleton ? (
                  <p>...scrolling skeleton</p>
                ) : (
                  <>
                    <p>{virtualItem.index} virtual index</p>
                    <ChatMessage message={message} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
