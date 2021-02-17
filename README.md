[![CI/CD](https://github.com/geocortex/workflow-activities-maximo/workflows/CI/CD/badge.svg)](https://github.com/geocortex/workflow-activities-maximo/actions)
[![npm](https://img.shields.io/npm/v/@geocortex/workflow-activities-maximo)](https://www.npmjs.com/package/@geocortex/workflow-activities-maximo)

This project contains activities for interacting with the [Maximo REST API](https://developer.ibm.com/static/site-id/155/maximodev/restguide/Maximo_Nextgen_REST_API.html) in a [Geocortex Workflow](https://www.geocortex.com/products/geocortex-workflow/).

## Requirements

In order for the Maximo activities to be able to communicate with the Maximo REST API your Maximo deployment must support CORS. This can be enabled:

-   By enabling CORS on the Maximo web server.
-   By using a CORS-enabled proxy.

## Usage

To use the Maximo activities in [Geocortex Workflow Designer](https://apps.geocortex.com/workflow/designer/) you need to register an activity pack and then add the activities to a workflow.

### Register the Maximo activity pack

1. Sign in to ArcGIS Online or Portal for ArcGIS
1. Go to **My Content**
1. Select **Add Item > An application**
    - Type: `Web Mapping`
    - Purpose: `Ready To Use`
    - API: `JavaScript`
    - URL: The URL to this activity pack manifest
        - Use https://unpkg.com/@geocortex/workflow-activities-maximo/activitypack.json for the latest version
        - Use https://unpkg.com/@geocortex/workflow-activities-maximo@0.1.0/activitypack.json for a specific version
    - Title: Your desired title
    - Tags: Must include `geocortex-workflow-activity-pack`
1. Reload [Geocortex Workflow Designer](https://apps.geocortex.com/workflow/designer/)
1. The Maximo activities will now appear in the activity toolbox in an `Maximo` category

### Use the Maximo activities in a workflow

1. Establish a connection to the Maximo service
    1. To connect to the Maximo service as a user:
        1. Add the `Create Maximo Service` activity to a workflow
        1. Set the `URL` input to the root URL of your Maximo server. For example, `https://acme.emaximo.com/maximo`.
        1. Set the `Username` and `Password` inputs
    - **IMPORTANT:** secrets and passwords are credentials that should not be hard coded into workflows. These values should be acquired by the workflow at runtime from the end user or from another secure system.
1. Use the Maximo service
    1. Add one of the other Maximo activities to the workflow. For example, `Get Maximo Assets`.
    1. Set the `Service` input of the activity to be the output of the `Create Maximo Service` activity
        - Typically this would use an expression like `=$mxService1.service`
    1. Supply any additional inputs to the activity
    1. Supply the `result` output of the activity to the inputs of other activities in the workflow
1. Run the workflow

## Development

This project was bootstrapped with the [Geocortex Workflow SDK](https://github.com/geocortex/vertigis-workflow-sdk). Before you can use your activity pack in the [Geocortex Workflow Designer](https://apps.geocortex.com/workflow/designer/), you will need to [register the activity pack](https://developers.geocortex.com/docs/workflow/sdk-web-overview#register-the-activity-pack).

## Available Scripts

Inside the newly created project, you can run some built-in commands:

### `npm run generate`

Interactively generate a new activity or form element.

### `npm start`

Runs the project in development mode. Your activity pack will be available at [http://localhost:5000/main.js](http://localhost:5000/main.js). The HTTPS certificate of the development server is a self-signed certificate that web browsers will warn about. To work around this open [`https://localhost:5000/main.js`](https://localhost:5000/main.js) in a web browser and allow the invalid certificate as an exception. For creating a locally-trusted HTTPS certificate see the [Configuring a HTTPS Certificate](https://developers.geocortex.com/docs/workflow/sdk-web-overview/#configuring-a-https-certificate) section on the [Geocortex Developer Center](https://developers.geocortex.com/docs/workflow/overview/).

### `npm run lint`

Runs linter to perform static analysis.

### `npm run build`

Builds the activity pack for production to the `build` folder. It optimizes the build for the best performance.

Your custom activity pack is now ready to be deployed!

See the [section about deployment](https://developers.geocortex.com/docs/workflow/sdk-web-overview/#deployment) in the [Geocortex Developer Center](https://developers.geocortex.com/docs/workflow/overview/) for more information.

## Documentation

Find [further documentation on the SDK](https://developers.geocortex.com/docs/workflow/sdk-web-overview/) on the [Geocortex Developer Center](https://developers.geocortex.com/docs/workflow/overview/)
