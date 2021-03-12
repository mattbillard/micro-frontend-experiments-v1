// TODO: placeholders until GoldenLayout gets types

export interface IGoldenLayoutConfigContent {
  activeItemIndex: number;
  componentName: string;
  componentState: IGoldenLayoutComponentState;
  content: IGoldenLayoutConfigContent[];
  isClosable: boolean;
  reorderEnabled: boolean;
  title: string;
  type: string;
}

export type GoldenLayoutConfig = {
  content: IGoldenLayoutConfigContent[];
  contentItems: IGoldenLayoutConfigContent[];
  isInitialised: boolean;
  root: any;
  destroy: () => void;
  toConfig: () => GoldenLayoutConfig;
  updateSize: (width: number, height: number) => void;
};

export interface IGoldenLayoutComponentProps {
  glContainer: any;
  glEventHub: any;
}

export interface IGoldenLayoutTab {
  element: HTMLElement;
}

export interface IGoldenLayoutComponentState {
  childUrl: string;
}
