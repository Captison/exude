
let reKey = /^(.+\/)*(.+)[.].+$/;
/**
    Map the default exports of files from a specified context.
    
    https://medium.com/dailyjs/leveraging-webpack-power-to-import-all-files-from-one-folder-cddedd3201b3
    
    The `context` parameter should be of the form:
      `require.context('/path/to/files', false, /inclusionRegex/)`
    
    @param { function } files
      A context, as provided by `require.context`.
    @param { function } exname
      The export to grab from the module context.
    @return { object }
      Root filenames mapped to file contents.      
*/
export default function(files, exname)
{
    let reducer = (object, key) => 
    {
        let name = key.replace(reKey, '$2');
        let mod = files(key);
        
        return { ...object, [name]: exname ? mod[exname] : mod };
    }
    
    return files.keys().reduce(reducer, {});  
}
