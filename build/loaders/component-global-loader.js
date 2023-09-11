
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
              options.mixins = options.mixins || [];
              options.mixins.unshift(baseline);

              options.aliases = [ ...aliases(options.mixins), ...(options.aliases || []) ];
          }
          
          function aliases(mixins)
          {
              return (mixins || [])
                  .reduce((a, m) => ([ ...a, ...(m.aliases || []), ...aliases(m.mixins) ]), [])
                  .filter((e, i, a) => a.indexOf(e) === i );
          }
          </extend>
        `;
    }

    return content;
}
