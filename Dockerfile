FROM ubuntu:22.04

LABEL maintainer="Bastien Merlette"
LABEL name="TableauElec"

RUN echo $(whoami)
ENV SUPERVISOR_PHP_USER=tableauElec
RUN useradd ${SUPERVISOR_PHP_USER} -U
WORKDIR /home/${SUPERVISOR_PHP_USER}

ARG NODE_VERSION=20
ARG TZ="Europe/Paris"

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update \
    && mkdir -p /etc/apt/keyrings \
    && apt-get install -y gnupg gosu curl ca-certificates git supervisor libcap2-bin libpng-dev dnsutils librsvg2-bin fswatch ffmpeg nano \
    && apt-get install -y postgresql
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_VERSION.x nodistro main" > /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install -y nodejs \
    && npm install -g npm \
    && npm install -g pnpm \
    && npm install -g bun \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY tableau-elec .

RUN chown -R ${SUPERVISOR_PHP_USER} /home/${SUPERVISOR_PHP_USER}
USER ${SUPERVISOR_PHP_USER}
