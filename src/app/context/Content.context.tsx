"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

interface ContentState {
  visible: boolean;
  text: string;
  position: { x: number; y: number } | null;
  targetRect: DOMRect | null;
  placement: string;
  customClass: string;
}

interface ContentContextType {
  content: ContentState;
  showContent: (text: string, targetRect: DOMRect, placement?: string, customClass?: string) => void;
  hideContent: () => void;
  setTooltipHover: (isHovering: boolean) => void;
}

interface ContentProviderProps {
  children: React.ReactNode;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within ContentProvider");
  }
  return context;
};

export const ContentProvider = ({ children }: ContentProviderProps) => {
  const [content, setContent] = useState<ContentState>({
    visible: false,
    text: "",
    position: null,
    targetRect: null,
    placement: "bottom",
    customClass: "",
  });
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [hideTimeout, setHideTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const isOverTooltip = useRef<boolean>(false);
  const isOverTarget = useRef<boolean>(false);

  const showContent = useCallback((text: string, targetRect: DOMRect, placement: string = "bottom", customClass: string = "") => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setContent({
      visible: true,
      text,
      position: { x: 0, y: 0 },
      targetRect,
      placement,
      customClass,
    });
  }, [hideTimeout]);

  const hideContent = useCallback(() => {
    if (!isOverTarget.current && !isOverTooltip.current) {
      setContent((prev) => ({ ...prev, visible: false }));
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
    }
  }, [hoverTimeout]);

  const scheduleHide = useCallback(() => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }
    const timeout = setTimeout(() => {
      if (!isOverTarget.current && !isOverTooltip.current) {
        setContent((prev) => ({ ...prev, visible: false }));
      }
    }, 100);
    setHideTimeout(timeout);
  }, [hideTimeout]);

  const setTooltipHover = useCallback((isHovering: boolean) => {
    isOverTooltip.current = isHovering;
    if (!isHovering) {
      scheduleHide();
    }
  }, [scheduleHide]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[content-data]");
      if (!target) return;
      const text = target.getAttribute("content-data");
      const placement = target.getAttribute("content-placement") || "bottom";
      const customClass = target.getAttribute("content-class") || "";
      if (!text) return;
      isOverTarget.current = true;
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      const timeout = setTimeout(() => {
        const rect = target.getBoundingClientRect();
        showContent(text, rect, placement, customClass);
      }, 500);
      setHoverTimeout(timeout);
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[content-data]");
      if (!target) return;
      isOverTarget.current = false;
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      scheduleHide();
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (hoverTimeout) clearTimeout(hoverTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [showContent, scheduleHide, hoverTimeout, hideTimeout]);

  return (
    <ContentContext.Provider value={{ content, showContent, hideContent, setTooltipHover }}>
      {children}
    </ContentContext.Provider>
  );
};