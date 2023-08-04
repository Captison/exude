
module.exports = 
{
    env: 
    {
        node: true
    },
    
    extends: 
    [
        'eslint:recommended',        
        'plugin:vue/recommended'
    ],
          
    parser: 'vue-eslint-parser',
    
    parserOptions: 
    {
        ecmaVersion: 'latest',
        parser: '@babel/eslint-parser',
        sourceType: 'module'
    },

    rules:
    {
        // eslint
        'no-constant-condition': 'error',
        'no-extra-boolean-cast': 'error',
        'no-undef': 'error',
        'no-unused-vars': 'error',

        // vue (https://eslint.vuejs.org/rules)
        'vue/attribute-hyphenation': 'warn',
        'vue/attributes-order': 'warn',
        'vue/component-tags-order': 'off',
        'vue/html-self-closing': [ 'warn', { html: { void: "any", normal: "always", "component": "always" } } ],
        'vue/max-attributes-per-line': [ 'off', { singleline: 4, multiline: { max: 1, allowFirstLine: false } } ],
        'vue/no-parsing-error': 'error',
        // 'vue/no-unregistered-components': [ 'error', { ignorePatterns: [ 'fragment' ] } ],
        'vue/no-unused-components': 'error',
        'vue/no-v-html': 'warn',
        'vue/order-in-components': 'off',
        'vue/require-component-is': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',
        'vue/singleline-html-element-content-newline': 'warn',
        'vue/v-slot-style': 'warn'
    }
}
