
var interval_fetch = 4500;
var interval_update = 5000;
var interval_progress = 300;

var menu_env_data = [{
    "name": "Global",
    "icon": "fa fa-globe",
    "link": "global",
}, {
    "name": "Region 1",
    "icon": "flag-icon flag-icon-us",
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
}, {
    "name": "Partner 2",
    "icon": "fa fa-fw fa-twitter",
    "link": "part-2",
}, {
    "name": "Partner 3",
    "icon": "fa fa-fw fa-youtube",
    "link": "part-3",
}, {
    "name": "Partner 4",
    "icon": "fa fa-fw fa-instagram",
    "link": "part-4",
}, {
    "name": "Partner 5",
    "icon": "fa fa-fw fa-windows",
    "link": "part-5",
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
    "color": "bg-aqua",
    "unit": "Mbps",
    "id": "egress",
}, {
    "name": "HTTP Latency",
    "value": 457,
    "icon": "fa fa-fw fa-clock-o",
    "color": "bg-orange",
    "unit": "ms",
    "id": "latency-http",
}, {
    "name": "TCP Latency",
    "value": 125,
    "icon": "fa fa-fw fa-dot-circle-o",
    "color": "bg-maroon",
    "unit": "ms",
    "id": "latency-tcp",
}, ];
