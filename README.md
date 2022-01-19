[![CI/CD](https://github.com/geocortex/workflow-activities-maximo/workflows/CI/CD/badge.svg)](https://github.com/geocortex/workflow-activities-maximo/actions)
[![npm](https://img.shields.io/npm/v/@geocortex/workflow-activities-maximo)](https://www.npmjs.com/package/@geocortex/workflow-activities-maximo)

This project contains activities for interacting with the **Maximo REST API** in a [VertiGIS Studio Workflow](https://www.vertigisstudio.com/products/geocortex-workflow/).

## Requirements

### VertiGIS Studio Workflow Versions

The Maximo activities are designed to work with VertiGIS Studio Workflow versions `5.20` and above.

### Maximo Versions

The Maximo activities are designed to work with Maximo versions `7.6.0.2` and above.

### Cross-Origin Resource Sharing (CORS)

Typically the web application running your workflow will be on a different domain than the Maximo REST API. In order for the Maximo activities to be able to communicate with the Maximo REST API your Maximo deployment must support [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS). There are multiple ways to enable this:

-   **Option 1:** Enable CORS on the Maximo web server.
    1. Log in to Maximo as an administrator
    1. Open the **System Properties** via the **System Configuration** > **Platform Configuration** > **System Properties** menu
    1. Optionally filter the properties to show only those starting with `mxe.oslc.aclallow`
    1. Set the `mxe.oslc.aclalloworigin` property to match the base URL of the web application that will use the Maximo activities. For example, one of:
        - `https://apps.vertigisstudio.com`
        - `https://acme.apps.vertigisstudio.com`
        - `https://www.my-server.com`
    1. Set the `mxe.oslc.aclallowheaders` property to `accept,content-type,maxauth,patchtype,properties,x-method-override,x-public-uri`
    1. Set the `mxe.oslc.aclallowmethods` property to `GET,POST,PUT,DELETE,OPTIONS`
-   **Option 2:** Use a proxy that enables CORS by adding the necessary CORS headers.
    -   The following `web.config` provides an example of how to create such a proxy in **IIS** using [Application Request Routing](https://www.iis.net/downloads/microsoft/application-request-routing) and [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite).
        -   Note: this sample is intentionally very permissive so that it will work for most deployments. You should follow CORS best practices and restrict the allowed origins and headers to only those required for your deployment.

```xml
<?xml version="1.0"?>
<configuration>
    <system.webServer>
        <httpProtocol>
            <customHeaders>
                <add name="Access-Control-Allow-Origin" value="*" />
                <add name="Access-Control-Allow-Headers" value="*" />
                <add name="Access-Control-Allow-Methods" value="GET, HEAD, OPTIONS, POST, DELETE" />
            </customHeaders>
        </httpProtocol>
        <rewrite>
            <rules>
                <remove name="Proxy" />
                <rule name="Proxy" patternSyntax="Wildcard" stopProcessing="true">
                    <match url="*" ignoreCase="false" />
                    <action type="Rewrite" url="https://acme.emaximo.com/maximo/{R:0}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

## Usage

To use the Maximo activities in [VertiGIS Studio Workflow Designer](https://apps.vertigisstudio.com/workflow/designer/) you need to register an activity pack and then add the activities to a workflow.

### Register the Maximo activity pack

1. Sign in to ArcGIS Online or Portal for ArcGIS
1. Go to **My Content**
1. Select **Add Item > An application**
    - Type: `Web Mapping`
    - Purpose: `Ready To Use`
    - API: `JavaScript`
    - URL: The URL to this activity pack manifest
        - Use https://unpkg.com/@geocortex/workflow-activities-maximo/activitypack.json for the latest version
        - Use https://unpkg.com/@geocortex/workflow-activities-maximo@0.4.0/activitypack.json for a specific version
    - Title: Your desired title
    - Tags: Must include `geocortex-workflow-activity-pack`
1. Reload [VertiGIS Studio Workflow Designer](https://apps.vertigisstudio.com/workflow/designer/)
1. The Maximo activities will now appear in the activity toolbox in an `Maximo` category

### Use the Maximo activities in a workflow

1. Establish a connection to the Maximo service
    1. To connect to the Maximo service as a user:
        1. Add the `Create Maximo Service` activity to a workflow
        1. Set the `URL` input to the root URL of your Maximo server. For example, `https://acme.emaximo.com/maximo`.
        1. Set the `Username` and `Password` inputs or the `API Key` input
    - **IMPORTANT:** secrets and passwords are credentials that should not be hard coded into workflows. These values should be acquired by the workflow at runtime from the end user or from another secure system.
1. Use the Maximo service
    1. Add one of the other Maximo activities to the workflow. For example, `Get Maximo Assets`.
    1. Set the `Service` input of the activity to be the output of the `Create Maximo Service` activity
        - Typically this would use an expression like `=$mxService1.service`
    1. Supply any additional inputs to the activity
    1. Supply the `result` output of the activity to the inputs of other activities in the workflow
1. Run the workflow

## Development

This project was bootstrapped with the [VertiGIS Studio Workflow SDK](https://github.com/geocortex/vertigis-workflow-sdk). Before you can use your activity pack in the [VertiGIS Studio Workflow Designer](https://apps.vertigisstudio.com/workflow/designer/), you will need to [register the activity pack](https://developers.geocortex.com/docs/workflow/sdk-web-overview#register-the-activity-pack).

## Available Scripts

Inside the newly created project, you can run some built-in commands:

### `npm run generate`

Interactively generate a new activity or form element.

### `npm start`

Runs the project in development mode. Your activity pack will be available at [http://localhost:5000/main.js](http://localhost:5000/main.js). The HTTPS certificate of the development server is a self-signed certificate that web browsers will warn about. To work around this open [`https://localhost:5000/main.js`](https://localhost:5000/main.js) in a web browser and allow the invalid certificate as an exception. For creating a locally-trusted HTTPS certificate see the [Configuring a HTTPS Certificate](https://developers.geocortex.com/docs/workflow/sdk-web-overview/#configuring-a-https-certificate) section on the [VertiGIS Studio Developer Center](https://developers.geocortex.com/docs/workflow/overview/).

### `npm run lint`

Runs linter to perform static analysis.

### `npm run build`

Builds the activity pack for production to the `build` folder. It optimizes the build for the best performance.

Your custom activity pack is now ready to be deployed!

See the [section about deployment](https://developers.geocortex.com/docs/workflow/sdk-web-overview/#deployment) in the [VertiGIS Studio Developer Center](https://developers.geocortex.com/docs/workflow/overview/) for more information.

## Documentation

Find [further documentation on the SDK](https://developers.geocortex.com/docs/workflow/sdk-web-overview/) on the [VertiGIS Studio Developer Center](https://developers.geocortex.com/docs/workflow/overview/)
