export const menuItems = [
    {
        text: 'Home',
        path: '/',
    },
    {
        text: 'About',
        path: '/about',
    },
    {
        text: 'Resources',
        path: '/resources',
        submenu: [
            {
                text: 'Data',
                path: '/resources/data',
            },
            {
                text: 'Tools',
                path: '/resources/tools',
            },
            {
                text: 'BYOD',
                path: '/resources/byod',
            },
            {
                text: 'Learn',
                path: '/resources/learn',
            },
        ],
    },
    // {
    //     text: 'FAQ',
    //     path: '/faq',
    // },
    {
        text: 'Contact',
        path: '/contact',
    },
]
