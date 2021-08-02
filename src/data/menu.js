export const menuItems = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "About",
    path: "/about",
    submenu: [
      {
        text: "Overview",
        path: "/about/overview",
      },
      {
        text: "Latest Updates",
        path: "/about/latest-updates",
      },
      {
        text: "Events",
        path: "/about/events",
      },
    ],
  },
  {
    text: "Resources",
    path: "/resources",
    submenu: [
      {
        text: "Data",
        path: "/resources/data",
      },
      {
        text: "BYOD",
        path: "/resources/byod",
      },
      {
        text: "Cloud Credits",
        path: "/resources/cloud-credits",
      },
      {
        text: "Learn",
        path: "/resources/learn",
      },
      {
        text: "Services",
        path: "/resources/services",
      },
    ],
  },
  {
    text: "Fellows",
    path: "/fellows",
    submenu: [
      {
        text: "Program",
        path: "/fellows/program",
      },
      {
        text: "Cohort I",
        path: "/fellows/cohort1",
      },
      {
        text: "Cohort II",
        path: "/fellows/cohort2",
      },
      {
        text: "Cohort III",
        path: "/fellows/cohort3",
      },
      {
        text: "FAQs",
        path: "/fellows/faqs",
      },
    ],
  },
  {
    text: "Contact",
    path: "/contact",
    submenu: [
      {
        text: "Ask a Question",
        path: "/contact",
      },
      {
        text: "Join the Community",
        path: "/contact/ecosystem",
      },
    ],
  },
];
