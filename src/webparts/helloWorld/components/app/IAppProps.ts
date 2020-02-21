import { SPHttpClient } from '@microsoft/sp-http'

export interface IAppProps {
    spHttpClient: SPHttpClient,
    currentSiteUrl: string
}