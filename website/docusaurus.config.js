// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Lab Docs',
  tagline: "It's Going To Be Legendary!",
  url: 'https://legendarylabs.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/blue_logo_no_words.png',
  organizationName: 'Legendary Labs', // Usually your GitHub org/user name.
  projectName: 'Legendary Labs Docs ', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/LegendaryLabsBSC/LegendaryLabs/tree/develop/contracts/contracts',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/LegendaryLabsBSC/LegendaryLabs/tree/develop/contracts/contracts',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Lab Docs',
        logo: {
          alt: 'Legendary Labs Logo',
          src: 'img/blue_logo_no_words.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'contracts/contracts',
            position: 'left',
            label: 'Contracts',
          }, {
            type: 'doc',
            docId: 'under-construction',
            position: 'left',
            label: 'Front End',
          },
          {
            type: 'doc',
            docId: 'under-construction',
            position: 'left',
            label: 'Back End',
          },
          {
            type: 'doc',
            docId: 'under-construction',
            position: 'left',
            label: 'Generator',
          }, {
            type: 'doc',
            docId: 'api/intoapi',
            position: 'left',
            label: 'API',
          },
          { to: '/blog', label: 'Updates', position: 'left' },
          {
            href: 'https://github.com/LegendaryLabsBSC/LegendaryLabs/tree/develop/contracts/contracts',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://legendarylabs.net',
            label: 'DApp',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        // links: [
        //   {
        //     title: 'Docs',
        //     items: [
        //       {
        //         label: 'Tutorial',
        //         to: '/docs/intro',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'Community',
        //     items: [
        //       {
        //         label: 'Stack Overflow',
        //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //       },
        //       {
        //         label: 'Discord',
        //         href: 'https://discordapp.com/invite/docusaurus',
        //       },
        //       {
        //         label: 'Twitter',
        //         href: 'https://twitter.com/docusaurus',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'More',
        //     items: [
        //       {
        //         label: 'Blog',
        //         to: '/blog',
        //       },
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/facebook/docusaurus',
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © ${new Date().getFullYear()} Legendary Labs, birds birds birds`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['solidity'],
      },
    }),
};

module.exports = config;
