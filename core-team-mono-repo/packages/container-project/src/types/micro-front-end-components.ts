import { IAppDefinition } from '../types';

export interface IMicroFrontEndComponent {
  appDefinition: IAppDefinition;
  childUrl: string;
  setTitle: (title: string) => void;
  setUrl: (url: string) => void;
}
