from fabric.decorators import hosts
from fabric.api import local, put, lcd, run
import secret

def serve():
    local('jekyll serve')

def build():
    local('jekyll build')

@hosts(secret.machine)
def clean_remote():
    run('rm -rf ' + secret.remote_dir)

@hosts(secret.machine)
def deploy():
    build()
    clean_remote()
    run('mkdir -p ' + secret.remote_dir)
    put('_site/*', secret.remote_dir)

