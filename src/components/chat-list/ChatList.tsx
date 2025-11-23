import { mockMessages, mockMessagesSimpleHeigh } from '@/mock';
import { ChatMessage } from '@/components';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

// virtualization settings
const ITEM_HEIGHT = 90;
const LIST_SIMPLE_HEIGHT = 600;
const SCROLLING_DELAY = 200;
const OVERSCAN = 3;

export const ChatList = () => {
  const [listItems, setListItems] = useState(mockMessagesSimpleHeigh);

  // virtualization states
  const totalListHeight = listItems.length * ITEM_HEIGHT;

  // TODO: dynamic list height calculation before rendering
  // let listHeight = scrollElementRef.current?.clientHeight;

  const [withScrollingSkeleton, setWithScrollingSkeleton] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollElementRef = useRef<HTMLDivElement>(null);

  const virtualItems = useMemo(() => {
    if (LIST_SIMPLE_HEIGHT === undefined) return [];

    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + LIST_SIMPLE_HEIGHT;

    let startIndex = Math.floor(rangeStart / ITEM_HEIGHT);
    let endIndex = Math.ceil(rangeEnd / ITEM_HEIGHT);

    startIndex = Math.max(0, startIndex - OVERSCAN);
    endIndex = Math.min(listItems.length - 1, endIndex + OVERSCAN);

    const virtualItems = [];

    for (let index = startIndex; index <= endIndex; index++) {
      virtualItems.push({
        index,
        offsetTop: index * ITEM_HEIGHT,
      });
    }

    return virtualItems;
  }, [scrollTop, LIST_SIMPLE_HEIGHT]);

  useLayoutEffect(() => {
    const scrollElement = scrollElementRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      setScrollTop(scrollElement.scrollTop);
    };

    handleScroll();

    scrollElement.addEventListener('scroll', handleScroll);
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollElement = scrollElementRef.current;
    if (!scrollElement) return;

    let timeoutId: number | null = 0;

    const handleScroll = () => {
      setIsScrolling(true);

      if (typeof timeoutId === 'number') {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, SCROLLING_DELAY);
    };

    scrollElement.addEventListener('scroll', handleScroll);

    return () => {
      if (typeof timeoutId === 'number') {
        clearTimeout(timeoutId);
      }
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
        <div style={{ height: totalListHeight }} className="w-full">
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
