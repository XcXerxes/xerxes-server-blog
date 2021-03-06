module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'API',
      script    : './server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : '39.108.97.20',
      ref  : 'origin/master',
      repo : 'git@github.com:XcXerxes/xerxes-server-blog.git',
      path : '/var/www/xcxerxes',
      'post-deploy' : 'yarn install && git pull && pm2 reload ecosystem.config.js --env production'
    },
    dev : {
      user : 'root',
      host : '39.108.97.20',
      ref  : 'origin/master',
      repo : 'git@github.com:XcXerxes/xerxes-server-blog.git',
      path : '/var/www/xcxerxes',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
