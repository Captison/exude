import { pascalCase } from 'change-case'
import { ns } from '_lco'


/**
    Patterned provide/inject mixin.

    Providers must implement a `provideContext(name)`function.

    @return { object }
      - `provider`: context provider mixin (for parent component)
      - `consumer`: context consumer mixin (for child component)
*/
export default function(name, options)
{
    let { defaultContext, prop } = options || {};

    let names =
    {
        provider: ns(name, 'context'),
        local: `${name}Inject`,
        prop: prop || `${name}Context`,
        propDefault: defaultContext || 'default',
        previous: `last${pascalCase(name)}`,
        reset: `reset${pascalCase(name)}Context`
    };

    let onlooker =
    {
        props:
        {
            /**
                Provider context name.
                @ignore
            */
            [names.prop]: { type: String, default: names.propDefault }
        }
    };

    let receiver =
    {
        ...onlooker,

        inject: { [names.local]: { from: names.provider, default: {} } },

        computed:
        {
            [name]: function() { return this[names.local][this[names.prop]]; }
        }
    };

    let provider =
    {
        ...receiver,

        provide()
        {
            let provide =
            {
                [names.provider]:
                {
                    ...this[names.local],
                    [this[names.prop]]: this.provideContext(name)
                }
            };

            return provide;
        },

        methods:
        {
            provideContext(name) { return this[`provide${pascalCase(name)}Context`](); }
        }
    };

    let consumer =
    {
        ...receiver,

        beforeDestroy()
        {
            this.resetContext(name, false);
        },

        watch:
        {
            [names.prop]: { immediate: true, handler() { this.resetContext(name); } }
        },

        methods:
        {
            // called on context change; should return a cleanup function
            changeContext(name)
            {
                let fname = `change${pascalCase(name)}Context`;

                if (typeof this[fname] === 'function')
                    return this[fname]();
            },

            resetContext(name, renew = true) { return this[`reset${pascalCase(name)}Context`](renew); },

            [names.reset]: function(renew = true)
            {
                if (typeof this[names.previous] === 'function') this[names.previous]();
                // perform context change
                this[names.previous] = renew ? this.changeContext(name) : null;
            }
        }
    };

    return { onlooker, receiver, provider, consumer };
}
