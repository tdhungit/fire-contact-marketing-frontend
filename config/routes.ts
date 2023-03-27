export default [
  // login
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  // welcome
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'dashboard',
    component: './Welcome',
  },
  // settings
  {
    path: '/setting',
    name: 'setting',
    icon: 'setting',
    routes: [
      { path: '/setting', redirect: '/setting/dashboard' },
      {
        path: '/setting/dashboard',
        name: 'dashboard',
        component: './Setting',
      },
      {
        path: '/setting/emails',
        name: 'email',
        component: './Setting/EmailSettings',
      },
    ],
  },
  // email template
  {
    path: '/email-template',
    name: 'email_template',
    icon: 'mail',
    routes: [
      { path: '/email-template', redirect: '/email-template/list' },
      {
        path: '/email-template/list',
        name: 'list',
        component: './Email/EmailTemplate/List',
      },
      {
        path: '/email-template/add',
        name: 'add',
        component: './Email/EmailTemplate/Edit',
      },
      {
        path: '/email-template/edit/:id',
        component: './Email/EmailTemplate/Edit',
      },
    ],
  },
  // contact
  {
    path: '/contact',
    name: 'contact',
    icon: 'contacts',
    routes: [
      { path: '/contact', redirect: '/contact/list' },
      {
        path: '/contact/list',
        name: 'list',
        component: './Contact/List',
      },
      {
        path: '/contact/add',
        name: 'add',
        component: './Contact/Edit',
      },
      {
        path: '/contact/edit/:id',
        component: './Contact/Edit',
      },
      {
        path: '/contact/detail/:id',
        component: './Contact/Detail',
      },
    ],
  },
  // rhythm
  {
    path: '/rhythm',
    name: 'rhythm',
    icon: 'sliders',
    routes: [
      { path: '/rhythm', redirect: '/rhythm/list' },
      {
        path: '/rhythm/list',
        name: 'list',
        component: './Rhythm/List',
      },
      {
        path: '/rhythm/add',
        name: 'add',
        component: './Rhythm/Edit',
      },
      {
        path: '/rhythm/edit/:id',
        component: './Rhythm/Edit',
      },
      {
        path: '/rhythm/detail/:id',
        component: './Rhythm/Detail',
      },
    ],
  },
  // if
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
