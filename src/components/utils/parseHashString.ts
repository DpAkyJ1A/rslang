export const parseHashString = (str: string) => {
    const params: { [N: string]: string } = {};
    if (str.match(/#/)) {
        const view = str.split('#')[1].split('/')[0].trim();
        const paramArr = str.slice(str.indexOf('?') + 1).split('&');
        params['view'] = view;
        if (paramArr.length > 1) {
            paramArr.map((param) => {
                const [key, val] = param.split('=');
                params[key] = decodeURIComponent(val);
            });
            params['view'] = view;
        }
    } else {
        params.view = 'main';
    }
    return params;
    // const url = new URL(str);
    // const searchParams = url.searchParams;
    // const group = searchParams.get('group');
    // const page = searchParams.get('page');
    // // const strSplit = str.split('/');
    // // const [view, querryParams] = strSplit;
    // console.log(page, group);
};
