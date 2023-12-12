import { ApiClient } from './fetch_api_client';
import { FetchErrorHandler } from './fetch_error_handling';

const urlBase = process.env.URL_BASE || 'http://localhost:5000/';
const loginUrl = urlBase + 'api/authenticate';
const logoutUrl = urlBase + 'auth/logout';
const refreshUrl = urlBase + 'auth/refresh_token';
const graphQLUrl = urlBase + 'graphql';

const apiEndpoints = {
    tree: urlBase + 'api/tree/',
    individuals: urlBase + 'api/individuals/'
};

const MEMBERSPACE_TOKEN = process.env.MEMBERSPACE_TOKEN || "MemberSpaceWidget.token"
const ACCOUNT_PAGE = process.env.ACCOUNT_PAGE ||  "/account"

const apiClient = new ApiClient();
const errorHandler = new FetchErrorHandler(loginUrl, refreshUrl, logoutUrl, MEMBERSPACE_TOKEN, ACCOUNT_PAGE, apiClient);

export async function getRestDataWrapper(endpoint, itemId) {
    const restUrlBase = apiEndpoints[endpoint]
    console.log(endpoint, itemId, restUrlBase)
    const restUrl = restUrlBase + itemId;

    try {
        return await apiClient.getRestData(restUrl);
    } catch (error) {
        //console.log("Error in REST");
        //console.log(restUrl);
        return await errorHandler.handleRestError(error, restUrl);
    }
}

export async function getGraphQLDataWrapper(query) {
    try {
        return await apiClient.getGraphQLData(graphQLUrl, query);
    } catch (error) {
        //console.log("Error in GraphQL");
        //console.log(graphQLUrl);
        return await errorHandler.handleGraphQLError(error, graphQLUrl, query);
    }
}

export { apiClient, logoutUrl }