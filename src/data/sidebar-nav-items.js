export default function () {
  return [
  {
    title: 'Decks',
    items: [{
      title: 'Analyze',
      to: '/analyze',
      htmlBefore: '<i class="material-icons">&#xE917;</i>',
      htmlAfter: '',
    }, {
      title: 'Compare',
      to: '/compare',
      htmlBefore: '<i class="material-icons">&#xE8D1;</i>',
      htmlAfter: '',
    }, {
      title: 'Build',
      to: '/build',
      htmlBefore: '<i class="material-icons">&#xE8D1;</i>',
      htmlAfter: '',
    }]
  },
  {
    title: 'Card Market',
    items: [{
      title: 'Portfoio',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: '/portfolio',
    }, {
      title: 'Prices',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: '/prices',
    }, {
      title: 'Forecast',
      htmlBefore: '<i class="material-icons">&#xE889;</i>',
      to: '/forecast',
    }]
  },
  {
    title: 'Collection',
    items: [{
      title: 'Manage Decks',
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: '/manage_decks',
    }, {
      title: 'Manage Cards',
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: '/manage_cards',
    },
    {
      title: 'Other Stuff',
      htmlBefore: '<i class="material-icons">&#xE2C7;</i>',
      open: false,
      items: [{
        title: 'Files - List View',
        to: '/file_manager_list',
      }, {
        title: 'Files - Cards View',
        to: '/file_manager_cards',
      }, {
        title: 'Settings',
        to: '/settings'
      }, {
        title: 'Transaction History',
        htmlBefore: '<i class="material-icons">&#xE889;</i>',
        to: '/transaction_history',
      }]
    },
  ]
  }];
}
