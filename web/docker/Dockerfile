ARG version
FROM nginx
EXPOSE 80
ARG version
LABEL version=${version}
LABEL Author=ltinerary
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
COPY ./dist /usr/share/nginx/html
# RUN mkdir /etc/nginx/sslconfig
# COPY ./cert/cert.key /etc/nginx/
# COPY ./cert/cert.pem /etc/nginx/
# COPY ./cert/ca.crt /etc/nginx/
COPY ./default.conf /etc/nginx/conf.d/default.conf 
WORKDIR /usr/share/nginx/html
ENTRYPOINT nginx -g "daemon off;"
