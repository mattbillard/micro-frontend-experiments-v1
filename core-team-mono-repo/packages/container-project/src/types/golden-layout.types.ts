// TODO: placeholders until GoldenLayout gets types

export interface IGlConfigContent {
  activeItemIndex: number;
  componentName: string;
  componentState: IGlComponentState;
  content: IGlConfigContent[];
  isClosable: boolean;
  reorderEnabled: boolean;
  title: string;
  type: string;
}

export type GlConfig = {
  content: IGlConfigContent[];
  contentItems: IGlConfigContent[];
  isInitialised: boolean;
  root: any;
  destroy: () => void;
  toConfig: () => GlConfig;
  updateSize: (width: number, height: number) => void;
};

export interface IGlComponentProps {
  glContainer: any;
  glEventHub: any;
}

export interface IGlComponentState {
  childUrl: string;
}

export interface IGlTab {
  element: HTMLElement;
}
