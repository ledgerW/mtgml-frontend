export default function() {
  return [
    {
      title: "Dashboards",
      htmlBefore: '<i class="material-icons">&#xE2C7;</i>',
      items: [
        {
          title: "Analytics",
          to: "/analytics"
        },
        {
          title: "Store",
          to: "/ecommerce"
        },
        {
          title: "Blog",
          to: "/blog-overview"
        }
      ]
    },
    {
      title: 'Header Nav',
      htmlBefore: '<i class="material-icons">view_day</i>',
      to: '/header_nav',
    }, {
      title: 'Icon Sidebar',
      htmlBefore: '<i class="material-icons">&#xE251;</i>',
      to: '/icon_side_nav',
    },
    {
      title: "Components",
      htmlBefore: '<i class="material-icons">view_module</i>',
      items: [
        {
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
        }
      ]
    },
    {
      title: "File Managers",
      htmlBefore: '<i class="material-icons">&#xE2C7;</i>',
      items: [
        {
          title: 'Files - List View',
          to: '/file_manager_list',
        }, {
          title: 'Files - Cards View',
          to: '/file_manager_cards',
        }
      ]
    },
    {
      title: "Transactions",
      htmlBefore: '<i class="material-icons"></i>',
      to: "/transaction_history"
    },
    {
      title: "User Account",
      htmlBefore: '<i class="material-icons">&#xE8B9;</i>',
      items: [
        {
          title: 'User Profile',
          to: '/profile',
        }, {
          title: 'Edit User Profile',
          to: '/edit_profile',
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
      ]
    },
    {
      title: "Errors",
      htmlBefore: '<i class="material-icons">error</i>',
      to: "/errors"
    }
  ];
}
