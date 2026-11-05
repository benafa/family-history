const JWT_MISSING = "Missing cookie \"access_token_cookie\"";
const JWT_EXPIRED = "Token has expired";
const JWT_SIG_FAILURE = "Signature verification failed";

export class FetchErrorHandler {
    constructor(refreshUrl, logoutUrl, redirectPage, apiClient) {
        this.logoutUrl = logoutUrl;
        this.refreshUrl = refreshUrl;
        this.redirectPage = redirectPage;
        this.apiClient = apiClient;
    }

    async handleGraphQLError(error, graphQLUrl, query) {
        try {
            if (this.isUnauthorizedError(error)) {
                //console.log("handleGraphQLError");
                await this.handleUnauthorizedError(error);
                return await this.apiClient.getGraphQLData(graphQLUrl, query);
            } else {
                // Only a bad token signs the member out; a missing page or a busy server should not
                if (this.isSigFailure(error)) {
                    console.log("Signature failure error");
                    await this.handleLogout();
                }
                throw error;
            }
        } catch(error) {
            //console.log(error);
            throw error;
        }
    }

    async handleRestError(error, restUrl) {
        try {
            if (this.isUnauthorizedError(error)) {
                //console.log("handleRestError");
                await this.handleUnauthorizedError(error);
                return await this.apiClient.getRestData(restUrl);
            } else {
                // Only a bad token signs the member out; a missing page or a busy server should not
                if (this.isSigFailure(error)) {
                    console.log("Signature failure error");
                    await this.handleLogout();
                }
                throw error;
            }
        } catch(error) {
            //console.log(error);
            throw error;
        }
    }

    async handleUnauthorizedError(error) {
        const errorBody = await error.json();
        if (errorBody.msg === JWT_EXPIRED) {
            await this.handleRefresh();
        } else if (errorBody.msg === JWT_MISSING && this.apiClient.getCookie('csrf_refresh_token')) {
            // The access cookie lapses after 15 minutes, while the refresh cookie lasts 14 days
            await this.handleRefresh();
        } else if (errorBody.msg === JWT_MISSING) {
            const next = window.location.pathname + window.location.search;
            window.location.href = `${this.redirectPage}?next=${encodeURIComponent(next)}`;
            throw error;
        } else {
            throw error;
        }
    }

    async handleRefresh() {
        try {
            await this.apiClient.refreshToken(this.refreshUrl);
        } catch(error) {
            await this.handleLogout();
            throw error;
        }
    }

    async handleLogout() {
        try {
            await this.apiClient.logout(this.logoutUrl);
        } finally {
            window.location.href = this.redirectPage;
        }
    }

    isUnauthorizedError(error) {
        return error instanceof Response && error.status === 401;
    }

    isSigFailure(error) {
        return error instanceof Response && error.status === 422;
    }
}