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
                text: 'BYOD',
                path: '/resources/byod',
            },
            {
                text: 'Services',
                path: '/resources/services',
            },
            {
                text: 'Learn',
                path: '/resources/learn',
            },
        ],
    },
    {
        text: 'Fellows',
        path: '/fellows',
        submenu: [
            {
                text: 'Program',
                path: '/fellows/program',
            },
            {
                text: 'Apply',
                path: '/fellows/apply',
            },
            {
                text: 'Cohort I',
                path: '/fellows/cohort1',
            },
            {
                text: 'FAQs',
                path: '/fellows/faqs',
            },
        ],
    },
    {
        text: 'Contact',
        path: '/contact',
    },
]
