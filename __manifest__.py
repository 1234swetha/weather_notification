{
    'name': 'Weather Notification',
    'version': '16.0.1.0.0',
    'sequence': 5,
    'depends': [
        'base',
        'base_setup',
    ],
    'data': [

    ],
    'assets': {
        'web.assets_backend': {
            '/weather_notification/static/src/xml/systray.xml',
            '/weather_notification/static/src/js/systray.js',

   },
    },
    'installable': True,
    'application': True,
    'auto_install': False
}
