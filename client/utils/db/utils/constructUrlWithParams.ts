export function constructUrlWithParams(url: string, params: {[key: string]: any}) {
    const INITIAL_QUERY_PARAMS_STR = "?";
    let queryParamsStr = INITIAL_QUERY_PARAMS_STR;

    for (let key in params) {
        
        const paramValue = params[key];
        const paramHasValidValue = Boolean(paramValue) || paramValue === 0;

        const isTheFirstParamToBeAdded = queryParamsStr === INITIAL_QUERY_PARAMS_STR;

        if (!isTheFirstParamToBeAdded)
            queryParamsStr += "&";

        if (paramHasValidValue)
            queryParamsStr += `${key}=${paramValue}`;
    }

    return url + queryParamsStr;
}