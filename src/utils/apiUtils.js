import { webservice } from ".";



class ApiUtils {
    static headers() {
        return {
            //  'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'dataType': 'json',
        }
    }
    static get(route) {
        return this.webServiceExplorer(route, null, 'GET');
    }
    static put(route, params) {
        return this.webServiceExplorer(route, params, 'PUT');
    }
    static post(route, params) {
        return this.webServiceExplorer(route, params, 'POST');
    }
    static postWithToken(route, params, token) {
        return this.webServiceExplorer(route, params, token, 'POST');
    }
    static delete(route, params) {
        return this.webServiceExplorer(route, params, 'DELETE');
    }
    static webServiceExplorer(route, params, verb) {
        const host = webservice.hostUrl;
        const url = `${host}${route}`;
        console.log("URL::::", url);
        var options = { method: verb, headers: { 'Content-Type': 'application/json' }, body: params }
        console.log("options::::", JSON.stringify(options));


        return fetch(url, options).then(resp => {
            let json = resp.json();
            if (resp.ok) {
                return json;
            }
            return json.then(err => { throw err });
        }).then(json => json);


        /*   return fetch(url, options).then((res) => res.json()).then((jsonResp) => {
              console.log("RESPONSE:::" + JSON.stringify(jsonResp));
  
              return jsonResp;
  
          }) */



    }
}
export default ApiUtils;