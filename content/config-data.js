var interval_fetch = 4500;
var interval_update = 5000;
var interval_progress = 300;

var menu_env_data = [{
  "name": "Global",
  "icon": "fa fa-globe",
  "color": "#000000",
  "link": "global",
}, {
  "name": "Region 1",
  "icon": "flag-icon flag-icon-us",
  "color": "#3366FF",
  "sub": [{
    "name": "Region 1 Summary",
    "link": "reg-1",
  }, {
    "name": "Environment 1-1",
    "link": "env-1-1",
  }, {
    "name": "Environment 1-2",
    "link": "env-1-2",
  }, {
    "name": "Environment 1-3",
    "link": "env-1-3",
  }],
}, {
  "name": "Region 2",
  "icon": "flag-icon flag-icon-hk",
  "color": "#FF3300",
  "sub": [{
    "name": "Region 2 Summary",
    "link": "reg-2",
  }, {
    "name": "Environment 2-1",
    "link": "env-2-1",
  }, {
    "name": "Environment 2-2",
    "link": "env-2-2",
  }, {
    "name": "Environment 2-3",
    "link": "env-2-3",
  }, {
    "name": "Environment 2-4",
    "link": "env-2-4",
  }, {
    "name": "Environment 2-5",
    "link": "env-2-5",
  }],
}, {
  "name": "Region 3",
  "icon": "flag-icon flag-icon-sg",
  "color": "#39CCCC",
  "sub": [{
    "name": "Region 3 Summary",
    "link": "reg-3",
  }, {
    "name": "Environment 3-1",
    "link": "env-3-1",
  }, {
    "name": "Environment 3-2",
    "link": "env-3-2",
  }, {
    "name": "Environment 3-3",
    "link": "env-3-3",
  }, {
    "name": "Environment 3-4",
    "link": "env-3-4",
  }],
}, {
  "name": "Region 4",
  "icon": "flag-icon flag-icon-za",
  "color": "#009933",
  "sub": [{
    "name": "Region 4 Summary",
    "link": "reg-4",
  }, {
    "name": "Environment 4-1",
    "link": "env-4-1",
  }, {
    "name": "Environment 4-2",
    "link": "env-4-2",
  }],
}, {
  "name": "Region 5",
  "icon": "flag-icon flag-icon-gb",
  "color": "#800000",
  "sub": [{
    "name": "Region 5 Summary",
    "link": "reg-5",
  }, {
    "name": "Environment 5-1",
    "link": "env-5-1",
  }, {
    "name": "Environment 5-2",
    "link": "env-5-2",
  }, {
    "name": "Environment 5-3",
    "link": "env-5-3",
  }, {
    "name": "Environment 5-4",
    "link": "env-5-4",
  }, {
    "name": "Environment 5-5",
    "link": "env-5-5",
  }],
}, {
  "name": "Region 6",
  "icon": "flag-icon flag-icon-cn",
  "color": "#FF9900",
  "sub": [{
    "name": "Region 6 Summary",
    "link": "reg-6",
  }, {
    "name": "Environment 6-1",
    "link": "env-6-1",
  }, {
    "name": "Environment 6-2",
    "link": "env-6-2",
  }],
}, {
  "name": "Region 7",
  "icon": "flag-icon flag-icon-kr",
  "color": "#666699",
  "sub": [{
    "name": "Region 7 Summary",
    "link": "reg-7",
  }, {
    "name": "Environment 7-1",
    "link": "env-7-1",
  }],
}, {
  "name": "Region 8",
  "icon": "flag-icon flag-icon-br",
  "color": "#99CC00",
  "sub": [{
    "name": "Region 8 Summary",
    "link": "reg-8",
  }, {
    "name": "Environment 8-1",
    "link": "env-8-1",
  }, {
    "name": "Environment 8-2",
    "link": "env-8-2",
  }],
}, ];

var menu_part_data = [{
  "name": "Partner 1",
  "icon": "fa fa-fw fa-github-square",
  "link": "part-1",
  "sub": [{
    "name": "Partner 1-1",
    "link": "part-1-1",
  }, {
    "name": "Partner 1-2",
    "link": "part-1-2",
  }, {
    "name": "Partner 1-3",
    "link": "part-1-3",
  }],
}, {
  "name": "Partner 2",
  "icon": "fa fa-fw fa-twitter",
  "link": "part-2",
  "sub": [{
    "name": "Partner 2-1",
    "link": "part-2-1",
  }, {
    "name": "Partner 2-2",
    "link": "part-2-2",
  }, {
    "name": "Partner 2-3",
    "link": "part-2-3",
  }, {
    "name": "Partner 2-4",
    "link": "part-2-4",
  }],
}, {
  "name": "Partner 3",
  "icon": "fa fa-fw fa-youtube",
  "link": "part-3",
  "sub": [{
    "name": "Partner 3-1",
    "link": "part-3-1",
  }, {
    "name": "Partner 3-2",
    "link": "part-3-2",
  }, {
    "name": "Partner 3-3",
    "link": "part-3-3",
  }, {
    "name": "Partner 3-4",
    "link": "part-3-4",
  }, {
    "name": "Partner 3-5",
    "link": "part-3-5",
  }],
}, {
  "name": "Partner 4",
  "icon": "fa fa-fw fa-instagram",
  "link": "part-4",
  "sub": [{
    "name": "Partner 4-1",
    "link": "part-4-1",
  }, {
    "name": "Partner 4-2",
    "link": "part-4-2",
  }, {
    "name": "Partner 4-3",
    "link": "part-4-3",
  }, {
    "name": "Partner 4-4",
    "link": "part-4-4",
  }, {
    "name": "Partner 4-5",
    "link": "part-4-5",
  }, {
    "name": "Partner 4-6",
    "link": "part-4-6",
  }],
}, {
  "name": "Partner 5",
  "icon": "fa fa-fw fa-windows",
  "link": "part-5",
  "sub": [{
    "name": "Partner 5-1",
    "link": "part-5-1",
  }, {
    "name": "Partner 5-2",
    "link": "part-5-2",
  }, {
    "name": "Partner 5-3",
    "link": "part-5-3",
  }, {
    "name": "Partner 5-4",
    "link": "part-5-4",
  }, {
    "name": "Partner 5-5",
    "link": "part-5-5",
  }, {
    "name": "Partner 5-6",
    "link": "part-5-6",
  }, {
    "name": "Partner 5-7",
    "link": "part-5-7",
  }],
}, ];

var gauge_data = [{
  "name": "RPS",
  "value": 1028,
  "icon": "fa fa-fw fa-bar-chart-o",
  "color": "bg-green",
  "id": "rps",
}, {
  "name": "RPS Error",
  "value": 0.43,
  "icon": "fa fa-fw fa-warning",
  "color": "bg-red",
  "id": "rps-error",
}, {
  "name": "Ingress",
  "value": 168.74,
  "icon": "fa fa-fw fa-sign-in",
  "color": "bg-teal",
  "unit": "Mbps",
  "id": "ingress",
}, {
  "name": "Egress",
  "value": 642.36,
  "icon": "fa fa-fw fa-sign-out",
  "color": "bg-purple",
  "unit": "Mbps",
  "id": "egress",
}, ];
