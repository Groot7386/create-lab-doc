ARG version

FROM node:14-alpine

ARG version

LABEL version=${version}

LABEL Author=fan

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
# FROM node:12
# RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -

# RUN yum update -y && yum install nodejs -y

# ENV LANG=zh_CN.UTF-8 LANGUAGE=zh_CN LC_ALL=zh_CN.UTF-8

# RUN yum update -y && yum reinstall -y glibc-common && yum install -y telnet net-tools && yum clean all && rm -rf /tmp/* rm -rf /var/cache/yum/* && localedef -c -f UTF-8 -i zh_CN zh_CN.UTF-8 && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 

# ADD ./depend/chinese.tar /usr/share/fonts/

# ADD ./depend/LibreOffice_7.1.8_Linux_x86-64_rpm.tar.gz /home/

# ADD ./depend/LibreOffice_7.1.8_Linux_x86-64_rpm_sdk.tar.gz /home/

# RUN yum localinstall  /home/LibreOffice_7.1.8.1_Linux_x86-64_rpm/RPMS/*.rpm -y

# RUN yum localinstall /home/LibreOffice_7.1.8.1_Linux_x86-64_rpm_sdk/RPMS/*.rpm -y

# RUN rm -rf /home/LibreOffice_7.1.8.1_Linux_x86-64_rpm && rm -rf /home/LibreOffice_7.1.8.1_Linux_x86-64_rpm_sdk

# ENV LibreOffice_PATH /opt/libreoffice7.1/program

# ENV PATH ${LibreOffice_PATH}:$PATH

# RUN soffice -h

# RUN yum install ibus -y

# RUN cd /usr/share/fonts/ && chmod -R 755 /usr/share/fonts && yum install mkfontscale -y && mkfontscale && yum install fontconfig -y && mkfontdir && fc-cache -fv && yum clean all

WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install cnpm -g --registry https://registry.npm.taobao.org

# RUN npm install --unsafe-perm --registry https://registry.npm.taobao.org

COPY . .

RUN npm install pm2 -g --registry https://registry.npm.taobao.org

# RUN pm2 install pm2-intercom

RUN echo ${version}

CMD ["pm2-runtime", "doc.js"]