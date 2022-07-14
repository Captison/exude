
module.exports = content =>
{
    if (content.indexOf('<script>') >= 0)
    {
        content +=
        `
          <extend>
          import baseline from '_source/mixins/baseline'

          export default function({ exports, options })
          {
              exports.mixins = options.mixins || [];
              exports.mixins.unshift(baseline);
              
              options.mixins = options.mixins || [];
              options.mixins.unshift(baseline);
          }
          </extend>
        `;
    }

    return content;
}
