import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'AzureApplicationInsightsApplicationCustomizerStrings';

import { 
  ApplicationInsights,
  Snippet
} from "@microsoft/applicationinsights-web";

const LOG_SOURCE: string = 'AzureApplicationInsightsApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IAzureApplicationInsightsApplicationCustomizerProperties {
  aikey: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class AzureApplicationInsightsApplicationCustomizer
  extends BaseApplicationCustomizer<IAzureApplicationInsightsApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    if (!this.properties.aikey) {
      console.log('No instrumentationKey specified for Azure Application Insights');
      return;
    }

    const appInsights = new ApplicationInsights(<Snippet>{
      config: {
        instrumentationKey: this.properties.aikey,
        disableAjaxTracking: true,
        disableFetchTracking: false,
        enableCorsCorrelation: true,
        maxBatchInterval: 0,
        namePrefix: 'voitanos-global'
      }
    });

    // load app insights
    appInsights.loadAppInsights();

    // set to currently logged in user
    appInsights.setAuthenticatedUserContext(this.context.pageContext.user.email);

    // track page view
    appInsights.trackPageView();

    // track event
    appInsights.trackEvent(
      { 
        name: 'spfx_appcustomizer_loaded', 
        properties: {
          site_id: this.context.pageContext.site.id,
          web_id: this.context.pageContext.web.id,
          web_title: this.context.pageContext.web.title,
          web_desc: this.context.pageContext.web.description
        }
      }
    );

    return Promise.resolve();
  }
}
