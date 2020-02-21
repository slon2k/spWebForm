import { SPHttpClient } from '@microsoft/sp-http'

export interface IHelloWorldProps {
  description: string;
  quantity: number;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string
}
