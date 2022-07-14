var path = require('path');
var paths = require('../../paths');


var content = paths.sub(paths.guide, 'content');
var components = paths.sub(paths.components);

module.exports =
[
    {
        name: 'Intro',
        content: content('intro.md'),
        exampleMode: 'hide'
    },
    {
        name: 'Configuration',
        sectionDepth: 1,
        sections:
        [
            {
                name: 'Sections',
                content: content('configuration', 'sections.md'),
                exampleMode: 'hide',
            },
            {
                name: 'Current',
                content: content('configuration', 'current.md'),
                exampleMode: 'hide',
            },
        ]    
    },
    {
        name: 'Colors',
        sections:
        [
            {
                name: 'Named Colors',
                content: content('colors', 'named.md'),
                exampleMode: 'hide',
            },
            {
                name: 'Aliased Colors',
                content: content('colors', 'aliased.md'),
                exampleMode: 'hide',
            },
            {
                name: 'Modifying Colors',
                content: content('colors', 'modify.md'),
                exampleMode: 'hide',
            }
        ]
    },    
    {
        name: 'Icons',
        sections:
        [
            {
                name: 'Named Icons',
                content: content('icons', 'named.md'),
                exampleMode: 'hide',
            },
            {
                name: 'Aliased Icons',
                content: content('icons', 'aliased.md'),
                exampleMode: 'hide',
            },
        ]
    },    
    {
        name: 'Components',
        sectionDepth: 1,
        sections:
        [
            {
                name: 'Application',
                description: 'Top-level components',
                components: components('application', '*.vue')
            },
            {
                name: 'Layout',
                description: 'Components that provide structure',
                components: components('layout', '*.vue')
            },
            {
                name: 'Extension',
                description: 'Components providing advanced access to CSS box-model',
                components: components('extension', '*.vue')
            },
            {
                name: 'Typography',
                description: 'Components that render text content',
                components: components('typography', '*.vue')
            },
            {
                name: 'Assets',
                description: 'Components that represent discreet graphical elements',
                components: components('assets', '*.vue')
            },
            {
                name: 'Action',
                description: 'Components that execute when clicked',
                components: components('action', '*.vue')
            },
            {
                name: 'Form Elements',
                description: 'Components for accepting user input',
                components: components('form', '*.vue')
            },
            {
                name: 'Options',
                description: 'Components for managing selectable options',
                components: components('options', '*.vue')
            },
            {
                name: 'Drag And Drop',
                description: 'Components for dragging and dropping',
                components: path.join(paths.components, 'drag-and-drop', '**', '*.vue')
            },
            {
                name: 'Utility',
                description: 'Components that are more functional and less pretty',
                components: components('utility', '*.vue')
            },
        ]
    },
    {
        name: 'Examples',
        sectionDepth: 1,
        sections:
        [
            {
                name: 'Flip Card',
                content: content('examples', 'flip-card.md'),
            },
            {
                name: 'Progress Bar',
                content: content('examples', 'progress-bar.md'),
            }
        ]
    },    
]
