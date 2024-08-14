export function fetchAPI(url, params, method = 'get') {
  const headers = {
    'Accept'       : 'application/json',
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer xrL9SPcw0K6EqU6hlOfMJTGCYgA5TIA25kYjkB8dRMtx0ZwXRSqJho3Zi7p4HayRc81vse',
  };
  const body = JSON.stringify(params);
  const options = { method, headers, body };

  return fetch(url, options);
}