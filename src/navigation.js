import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: '/'
    },
    {
      text: 'About Us',
      links: [
        {
          text: 'Our Club',
          href: getPermalink('/#aboutclub'),
        },
        {
          text: 'Toastmasters International',
          href: 'https://www.toastmasters.org/',
        },
      ],
    },
    {
      text: 'Contact Us',
      href: '/#contact'
    },
    {
      text: 'Resources',
      links: [
        {
          text: 'Useful Documents',
          href: getPermalink('/documents'),
        },
        {
          text: 'Table Topics Generator',
          href: getPermalink('/ttgenerator')
        },
      ],
    },
  ],
  actions: [{ text: 'Join Next Meeting', href: 'https://us02web.zoom.us/j/8179484915?pwd=WHNaUXdXK1l4YnZ2UVljTUNMaDE5QT09', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: 'Blog Categories',
      links: [
        { text: 'Public Speaking', href: '#' },
        { text: 'Workshops', href: '#' },
        { text: 'Featured Speakers', href: '#' },
      ],
    },
    {
      title: 'Pages',
      links: [
        { text: 'Home', href: '/' },
        { text: 'Attend Meeting', href: 'https://us02web.zoom.us/j/8179484915?pwd=WHNaUXdXK1l4YnZ2UVljTUNMaDE5QT09' },
        { text: 'Contact Us', href: '/contact' },
        { text: 'Blog', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: 'https://www.facebook.com/swiftplazatm' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(https://www.toastmasters.org/Content/images/ToastmastersLogo192.png)]"></span>
    Copyright © Swift Plaza Toastmasters - All Rights Reserved
  `,
};
