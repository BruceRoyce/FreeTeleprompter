export interface TeleprompterSettings {
  fontSize: number; // in rem, from 5 to 15
  lineHeight?: number;
  isAutoScrollSelected: boolean;
  isShowingPlacemarker: boolean;
  scrollSpeed: number; // 0 to 100, slow to fast
  fontColor: string; // hex color
  bgColor: string; // hex color
  instructionsColor: string; // hex color
  flipMode: 'none' | 'horizontal' | 'vertical' | 'both';
}

export interface TeleprompterProject {
  text: string;
  settings: TeleprompterSettings;
}

export type Page = 'setup' | 'prompter' | 'editor';

