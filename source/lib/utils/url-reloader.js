import uid from './uid'


/**
    Generates a new URL from `url` that bypasses caching and forces reload.
    
    The caching bypass is done by tricking the browser into thinking a new url
    is being requested by appending a custom query parameter.

    @param { string } url
      Original URL.
    @param { string } pname
      Query parameter name to use.
    @return { string }
      Updated URL.
*/
export default function(url, pname = 'reload')
{
    let newUrl = new URL(url, global.document.location.origin);

    newUrl.searchParams.set(pname, uid.next());
    
    return newUrl.toString();
}
