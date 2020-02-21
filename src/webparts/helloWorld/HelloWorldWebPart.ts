import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "HelloWorldWebPartStrings";
import HelloWorld from "./components/HelloWorld";
import App from "./components/app/App";
import { IHelloWorldProps } from "./components/IHelloWorldProps";
import { IAppProps } from "./components/app/IAppProps";
import { sp } from "@pnp/sp";

export interface IHelloWorldWebPartProps {
  description: string;
  quantity: number;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<
  IHelloWorldWebPartProps
> {
  public async onInit(): Promise<void> {
    await super.onInit();
    sp.setup({
      spfxContext: this.context
    });
  }

  public render(): void {
    const element: React.ReactElement<IAppProps> = React.createElement(App, {
      spHttpClient: this.context.spHttpClient,
      currentSiteUrl: this.context.pageContext.web.absoluteUrl
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneSlider("quantity", {
                  min: 10,
                  max: 100
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
