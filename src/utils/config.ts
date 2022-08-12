const config = {
    request: {
        LinearBaseHeaders: {
            'X-App-Native-Playback': 'native',
            'X-App-Platform-Name': 'iOS',
            'User-Agent':
                'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 (5835339808)',
            'X-App-Version': 'HaloChannel/7.3.0.189 (iOS)',
            'X-API-Version': '3.3',
            'X-App-Platform-Version': '13.3',
            'Accept-Language': 'en-US',
        },
        SVCBaseHeaders: {
            'Cache-Control': 'no-cache',
            'User-Agent': 'cpprestsdk/2.10.16',
            'Accept-Language': 'en-US',
            'Accept-Encoding': 'gzip, deflate, compress',
            Accept: 'application/json',
            Pragma: 'no-cache',
        },
        WWWBaseHeaders: {
            Pragma: 'no-cache',
            'Cache-Control': 'no-cache',
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
            'Accept-Language': 'en-US',
            'Accept-Encoding': 'identity',
            Accept: '*/*',
        },
        WWWBaseUrl: 'https://www.halowaypoint.com/en-us',
    },
};

export default config;