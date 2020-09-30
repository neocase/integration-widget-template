/**
 * This file contains the callbacks that you can modify to test the display of your widget
 */
import { HostMock } from '@talentsoft-opensource/widget-display-tool/src/contracts/host-mock-contract'
import { HttpResponse, RequestOptions } from '@talentsoft-opensource/integration-widget-contract'
import { Status } from '../app/components/Search/Status';
import * as en from '../resources/en-gb.json';
import * as fr from '../resources/fr-fr.json';
import * as def from '../resources/default.json';

export const hostmock: HostMock = {
    /**
     * This flag controls the requestExternalResource behavior:
     * - proxyMode: true => makes a real http request
     * - proxyMode: false => calls the mocked version defined in this file
     */
    proxyMode: false,

    /**
     * This setting controls the type of security headers
     * used to authenticate a request:
     * - securityMode: directconnect => (deprecated) adds the login and a token with the direct connect format
     * - securityMode: jwtsharedsecret => adds a token in the jwt format
     */
    securityMode: "jwtsharedsecret",

    /**
     * If proxyMode == true, when a direct connect request is made this secretkey will be used.
     * It should be identical to the one configured in the remote service that will be accessed.
     */
    secretKey: "5ysec",

    /**
     * If proxyMode == true, when a direct connect request is made this login will be used
     */
    login: "mylogin",

    getPreloadedResources: (language: string) => {
        switch (language) {
            case 'en-gb':
                return en['labels'];
                break;
            case 'fr-fr':
                return fr['labels'];
                break;
            default:
                return def['labels'];
        }
    },

    /**
     * If proxyMode == false, this method is called instead of sending a request
     */
    requestExternalResource: (options: RequestOptions) => {
        const data = [
            {
                name: "My expense report",
                amount: 100,
                date: "12/12/2018",
                description: "my expense for food",
                status: Status.Validated
            },
            {
                name: "My expense report 2",
                amount: 20,
                date: "02/02/2018",
                description: "my expense for food 2 zeoeijfozi fiozjf iozejfi de zejfio jzeiofjzeo ifjzeoi ziojfo zjiofeiofjzeiof oizjfioze jofiz oifzejiof",
                status: Status.Validated
            },
            {
                name: "My expense report 3",
                amount: 30,
                date: "03/03/2018",
                description: "my expense for food during event",
                status: Status.InProgress
            },
            {
                name: "My expense report 4",
                amount: 444,
                date: "04/04/2019",
                description: "my expense for driver in Paris",
                status: Status.InProgress
            },
            {
                name: "My expense report 4",
                amount: 444,
                date: "04/04/2019",
                description: "my expense for driver in Paris",
                status: Status.InProgress
            },
            {
                name: "My expense report 4",
                amount: 444,
                date: "04/04/2019",
                description: "my expense for driver in Paris",
                status: Status.Canceled
            },
            {
                name: "My expense report 4",
                amount: 444,
                date: "04/04/2019",
                description: "my expense for driver in Paris",
                status: Status.Canceled
            },
            {
                name: "My expense report 4",
                amount: 444,
                date: "04/04/2019",
                description: "my expense for driver in Paris",
                status: Status.Canceled
            },
        ];
    
        return new Promise<HttpResponse>((resolve, reject) => {
            const response: HttpResponse = {
                body: JSON.stringify(data),
                status: 200,
                headers: {}
            };
            resolve(response);
        });
    },

    /**
     * This object is passed to the *params* prop in the widget.
     * It may contain any property you need for the widget.
     * In production, those properties are defined for each 
     * client but you may provide default values.
     */
    configuration: {  
        domain:"https://www.exemple.com",
        apikey:"AZERTY",      
    },
    /**
     * This function is called to generate the autoconnect url when using
     * openUrlinNewTab or openUrlinCurrentTab
     */
    getAutoConnectUrl(url: string): string {
        return url;
    }
}
