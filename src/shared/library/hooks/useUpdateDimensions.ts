import { useCallback, RefObject } from 'react';
import { isMobile, isDesktop } from 'react-device-detect';

interface UseUpdateDimensionsOptions {
  minHeight?: number;
  bottomOffset?: number;
  mobileItemsPerRow?: number;
  tabletItemsPerRow?: number;
  breakpoints?: {
    xl?: number;
    lg?: number;
    md?: number;
  };
  itemsPerBreakpoint?: {
    xl?: number;
    lg?: number;
    md?: number;
    sm?: number;
  };
}

export const useUpdateDimensions = <T extends HTMLElement>(
  containerRef: RefObject<T>,
  setContainerHeight: (height: number) => void,
  setItemsPerRow: (count: number) => void,
  options: UseUpdateDimensionsOptions = {}
) => {
  const {
    minHeight = 600,
    bottomOffset = 40,
    mobileItemsPerRow = 2,
    tabletItemsPerRow = 4,
    breakpoints = { xl: 1920, lg: 1440, md: 1200 },
    itemsPerBreakpoint = { xl: 6, lg: 5, md: 4, sm: 3 }
  } = options;

  return useCallback(() => {
    if (containerRef.current) {
      const windowHeight = window.innerHeight;
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const availableHeight = windowHeight - containerTop - bottomOffset;
      setContainerHeight(Math.max(minHeight, availableHeight));
      
      const containerWidth = containerRef.current.clientWidth;
      switch (true) {
        case isMobile:
          setItemsPerRow(mobileItemsPerRow);
          break;
        case isDesktop:
          switch (true) {
            case containerWidth >= (breakpoints.xl ?? 1920):
              setItemsPerRow(itemsPerBreakpoint.xl ?? 6);
              break;
            case containerWidth >= (breakpoints.lg ?? 1440):
              setItemsPerRow(itemsPerBreakpoint.lg ?? 5);
              break;
            case containerWidth >= (breakpoints.md ?? 1200):
              setItemsPerRow(itemsPerBreakpoint.md ?? 4);
              break;
            default:
              setItemsPerRow(itemsPerBreakpoint.sm ?? 3);
              break;
          }
          break;
        default:
          setItemsPerRow(tabletItemsPerRow);
          break;
      }
    }
  }, [containerRef, setContainerHeight, setItemsPerRow, minHeight, bottomOffset, mobileItemsPerRow, tabletItemsPerRow, breakpoints, itemsPerBreakpoint]);
};