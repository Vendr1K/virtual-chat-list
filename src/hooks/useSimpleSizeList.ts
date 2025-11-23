import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

const OVERSCAN_ITEMS = 3;
const SCROLL_DELAY = 200;

interface useSimpleSizeListProps {
  itemsCount: number;
  listHeight: number;
  itemHeight: number;
  scrollingDelay?: number;
  overscan?: number;
  getScrollElement: () => HTMLDivElement | null;
  withScrollingSkeleton?: boolean;
}

export const useSimpleSizeList = ({
  getScrollElement,
  itemHeight,
  itemsCount,
  listHeight,
  overscan = OVERSCAN_ITEMS,
  withScrollingSkeleton = false,
  scrollingDelay = SCROLL_DELAY,
}: useSimpleSizeListProps) => {
  const totalHeight = itemsCount * itemHeight;

  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const { virtualItems, startIndex, endIndex } = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + listHeight;

    let startIndex = Math.floor(rangeStart / itemHeight);
    let endIndex = Math.ceil(rangeEnd / itemHeight);

    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min(itemsCount - 1, endIndex + overscan);

    const virtualItems = [];

    for (let index = startIndex; index <= endIndex; index++) {
      virtualItems.push({
        index,
        offsetTop: index * itemHeight,
      });
    }

    return { virtualItems, startIndex, endIndex };
  }, [scrollTop, listHeight, itemsCount]);

  useLayoutEffect(() => {
    const scrollElement = getScrollElement();
    if (!scrollElement) return;

    const handleScroll = () => {
      setScrollTop(scrollElement.scrollTop);
    };

    handleScroll();

    scrollElement.addEventListener('scroll', handleScroll);
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [getScrollElement]);

  useEffect(() => {
    if (!withScrollingSkeleton) return setIsScrolling(false);

    const scrollElement = getScrollElement();
    if (!scrollElement) return;

    let timeoutId: number | null = 0;

    const handleScroll = () => {
      setIsScrolling(true);

      if (typeof timeoutId === 'number') {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, scrollingDelay);
    };

    scrollElement.addEventListener('scroll', handleScroll);

    return () => {
      if (typeof timeoutId === 'number') {
        clearTimeout(timeoutId);
      }
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [getScrollElement]);

  return {
    virtualItems,
    startIndex,
    totalHeight,
    endIndex,
    isScrolling,
    scrollTop,
  };
};
