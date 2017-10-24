# refresh-token-exemple

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.16.0.

It is just an example that we found.

##Description

This project is just an example how we did it, by using [angular-oauth2](https://github.com/oauthjs/angular-oauth2) library 
and some parts from [witoldsz/angular-http-auth](https://github.com/witoldsz/angular-http-auth). 

There are better ways to do it, I am sure this code can be improved,
but I wanted to share it, so maybe one day it will help someone.


## Main files to see:
    app/
        scripts/
            services/
                httpbuffer.js               - witoldsz lib file
                httpinterceptor.js       - file that checks the call statuses
                user.js                        - file where we treate the refresh token, login and logout
            app.js                             - set the interceptor and the OAuth setup 



## Credits 

For the lib that we partially used to create what we needed: 

  [witoldsz/angular-http-auth](https://github.com/witoldsz/angular-http-auth)

For the post that helped find this library:
  
[Oauth2 with Angular: The right way - @jeremymarc](https://jeremymarc.github.io/2014/08/14/oauth2-with-angular-the-right-way)
