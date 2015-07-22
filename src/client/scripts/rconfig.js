var require = {
    waitSeconds: 0,
    paths: {
        'jquery':'../../../bower_components/jquery/dist/jquery',
        'jqueryui':'../../../bower_components/jqueryui/jquery-ui',               
        'bootstrap': '../../../bower_components/bootstrap/dist/js/bootstrap',
        'angular': '../../../bower_components/angular/angular',
        'angular-ui-router': '../../../bower_components/angular-ui-router/release/angular-ui-router',
        'angular-bootstrap': '../../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
        'angular-couch-potato':'../../../bower_components/angular-couch-potato/dist/angular-couch-potato',
        'icheck':'../scripts/plugins/icheck/icheck.min',
        'mCustomScrollbar':'../scripts/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min',
        'plugins':'../scripts/plugins/plugins',
        'actions':'../scripts/plugins/actions',
        'leftPanel':'../directives/leftPanel',
        'headerPane':'../directives/headerPane'

    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-bootstrap': { deps: ['angular'] },
        'angular-ui-router': { deps: ['angular'] },
        'bootstrap':{ deps: ['jquery']},
        'plugins':{ deps: ['jquery','mCustomScrollbar'] },
        'actions':{ deps: ['jquery','plugins'] },
        'mCustomScrollbar': { deps: ['jquery'] },
        'icheck': { deps: ['jquery'] },
        'leftPanel': { deps: ['angular'] },
        'headerPane':{ deps: ['angular'] },
    },
    priority: [
        'jquery',
        'bootstrap',
        'angular'
    ]
};