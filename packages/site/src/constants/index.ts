export * from './golden-layout.constants';

export enum MicroFrontendMode {
  Iframe = 'Iframe',
  InjectWholeAppHtml = 'InjectWholeAppHtml',
  LazyImport = 'LazyImport',
  RemoteComponent = 'RemoteComponent',
}

export const DEFAULT_SETTINGS = {
  isIframe: false,
  isShadow: false,
  mode: MicroFrontendMode.RemoteComponent,
  showHints: true,
  showSettings: false,
};
