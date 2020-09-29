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
                text: 'Cloud Credits',
                path: '/resources/cloud-credits',
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
                text: 'Cohort I',
                path: '/fellows/cohort1',
            },
            {
                text: 'Cohort II',
                path: '/fellows/cohort2',
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
