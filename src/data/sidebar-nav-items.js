export default function () {
  return [{
    title: 'Dashboards',
    items: [{
      title: 'Analytics',
      to: '/dashboard',
      htmlBefore: '<i class="material-icons">&#xE917;</i>',
      htmlAfter: '',
    }, {
      title: 'Online Store',
      to: '/ecommerce',
      htmlBefore: '<i class="material-icons">&#xE8D1;</i>',
      htmlAfter: '',
    }, {
      title: 'Personal Blog',
      to: '/overview',
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: '',
    }],
  },
  {
    title: 'Templates',
    items: [{
      title: 'User Account',
      htmlBefore: '<i class="material-icons">&#xE7FD;</i>',
      open: false,
      items: [{
        title: 'User Profile',
        to: '/profile',
      }, {
        title: 'Edit User Profile',
        to: '/edit_profile',
      }, {
        title: 'Old Login',
        to: '/old_login',
      }, {
        title: 'Login',
        to: '/login',
      }, {
        title: 'Sign Up',
        to: '/signup',
      }, {
        title: 'Forgot Password',
        to: '/login/reset',
      }, {
        title: 'Settings',
        to: '/settings',
      }, {
        title: 'Change Password',
        to: '/settings/password',
      }, {
        title: 'Change Email',
        to: '/settings/email',
      }, {
        title: 'Subscription',
        to: '/settings/subscribe',
      }
      ],
    }, {
      title: 'File Managers',
      htmlBefore: '<i class="material-icons">&#xE2C7;</i>',
      open: false,
      items: [{
        title: 'Files - List View',
        to: '/file_manager_list',
      }, {
        title: 'Files - Cards View',
        to: '/file_manager_cards',
      }],
    }, {
      title: 'Transaction History',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: '/transaction_history',
    }, {
      title: 'Calendar',
      htmlBefore: '<i class="material-icons">calendar_today</i>',
      to: '/calendar',
    }, {
      title: 'Add New Post',
      htmlBefore: '<i class="material-icons">note_add</i>',
      to: '/new_post',
    }, {
      title: 'Errors',
      htmlBefore: '<i class="material-icons">error</i>',
      to: '/errors',
    }],
  }, {
    title: 'Components',
    items: [{
      title: 'Overview',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: '/components',
    }, {
      title: 'Tables',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: '/tables',
    }, {
      title: 'Blog Posts',
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: '/blog_posts',
    }],
  }, {
    title: 'Layouts',
    items: [{
      title: 'Header Nav',
      htmlBefore: '<i class="material-icons">view_day</i>',
      to: '/header_nav',
    }, {
      title: 'Icon Sidebar',
      htmlBefore: '<i class="material-icons">&#xE251;</i>',
      to: '/icon_side_nav',
    }],
  },
  ];
}
