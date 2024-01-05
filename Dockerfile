FROM node:20.10-alpine

ARG USER=devsahamerlin
ENV HOME /home/$USER

# install sudo as root
RUN apk add --update sudo

# add new user
RUN adduser -D $USER \
        && echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER \
        && chmod 0440 /etc/sudoers.d/$USER

WORKDIR $HOME

COPY --chown=$USER:$USER package*.json ./

RUN npm install
RUN npm i -g nodemon

COPY --chown=$USER:$USER . .

USER $USER

EXPOSE 5002

CMD [ "nodemon", "src/index.js" ]
