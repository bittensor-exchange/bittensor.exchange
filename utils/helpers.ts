
export const fetcher = (url) => {
  return _fetcher(url, 'GET');
}

export const postFetcher = ({ url, body = {} }) => {
  return _fetcher(url, 'POST', body);
}

const _fetcher = async(url, method = 'GET', body = {}) => {
  const token = localStorage.getItem('auth');
  const headers = {

  };
  if (url.startsWith("/api")) {
    // url = process.env.API_HOST + url.substring(4);

    if (token) {
      headers['Authorization'] = token;
    }
  }
  if(method == 'POST')
    headers["Content-Type"] = "application/json";
  const res = await fetch(url, {
    method,
    headers: headers,
    body: method == 'POST' ? JSON.stringify(body) : undefined
  })

  if (!res.ok) {
    if (res.status === 401) {
      if (token) {
        localStorage.removeItem("token");
        window.location.href = '/login';
      }
    }
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error['info'] = await res.json()
    error['status'] = res.status
    throw error
  }

  return res.json()
}

export const truncateAddress = (address, dots = 6) => {
  if (!address) return "No Account";
  const match = address.match(
    /^[0x]*([a-zA-Z0-9]{10})[a-zA-Z0-9]+([a-zA-Z0-9]{10})$/
  );
  if (!match) return address;
  return `${match[1]}${' .'.repeat(dots)} ${match[2]}`;
};

export const copy2Clipboard = (text) => {
  navigator.clipboard.writeText(text);
}
