DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'Anomologita',
        'USER': 'user1',
        'PASSWORD': 'g8nzmktk6Y$',
        'HOST': '127.0.0.1',
        'OPTIONS': {
            'isolation_level': 'read committed'
        }
    }
}

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '@jmna!1@@32@b5fh6hb2_lz^e8!&l=$#^2u#6(o$0ebzo$e6y2'

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '[::1]', 'snf-856559.vm.okeanos.grnet.gr']