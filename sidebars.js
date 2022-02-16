/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Get started',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'End user',
          items: [
            'roles/user/metamask',
          ],
        },
        {
          type: 'category',
          label: 'Node operator',
          items: [
            'roles/node/join',
            'roles/node/join-genesis',
            'roles/node/basic',
            'roles/node/ust-to-evm',
            'roles/node/ust-from-evm',
            'roles/node/axl-to-evm',
            'roles/node/axl-from-evm',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
