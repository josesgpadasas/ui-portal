import { createContext, useContext } from "react";

export type TemplatePreviewSize = "frame" | "modal";

const TemplatePreviewSizeContext = createContext<TemplatePreviewSize>("frame");

export function TemplatePreviewSizeProvider({
  size,
  children,
}: {
  size: TemplatePreviewSize;
  children: React.ReactNode;
}) {
  return <TemplatePreviewSizeContext.Provider value={size}>{children}</TemplatePreviewSizeContext.Provider>;
}

export function useTemplatePreviewSize() {
  return useContext(TemplatePreviewSizeContext);
}

export function templateMainHeight(size: TemplatePreviewSize) {
  return size === "modal" ? "h-[min(78vh,860px)]" : "h-[400px]";
}

export function templateGisHeight(size: TemplatePreviewSize) {
  return size === "modal" ? "h-[min(78vh,860px)]" : "h-[420px]";
}

export function templateAuthMinHeight(size: TemplatePreviewSize) {
  return size === "modal" ? "min-h-[min(78vh,860px)]" : "min-h-[360px]";
}

export function templateEmptyHeight(size: TemplatePreviewSize) {
  return size === "modal" ? "h-[min(60vh,640px)]" : "h-[320px]";
}
