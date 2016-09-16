from fabric.decorators import hosts
from fabric.api import local, put, lcd, run
import secret


def build():
    local('jekyll build')

@hosts(secret.machine)
def deploy():
    build()
    run('mkdir -p ' + secret.remote_dir)
    put('_site', secret.remote_dir)
