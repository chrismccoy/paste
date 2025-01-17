const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
};

const setCookie = (sKey, sValue, { until, sPath = '/', sDomain, bSecure } = {}) => {
    if (!sKey || /^(?:expires|max-age|path|domain|secure)$/i.test(sKey)) {
        return false;
    }

    let sExpires = '';
    if (until) {
        switch (typeof until) {
            case 'number':
                sExpires = until === Infinity ? '; expires=Tue, 19 Jan 2038 03:14:07 GMT' : `; max-age=${until}`;
                break;
            case 'string':
                sExpires = `; expires=${until}`;
                break;
            case 'object':
                if (until instanceof Date) {
                    sExpires = `; expires=${until.toUTCString()}`;
                }
                break;
        }
    }

    const data = `${encodeURIComponent(sKey)}=${encodeURIComponent(sValue)}${sExpires}${sDomain ? `; domain=${sDomain}` : ''}${sPath ? `; path=${sPath}` : ''}${bSecure ? '; secure' : ''}`;
    document.cookie = data;
};

export { getCookie, setCookie };
