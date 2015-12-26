FROM node:argon

# Create storage directory
RUN mkdir -p /var/wtorrent

# Create app directory
RUN mkdir -p /usr/src/wtorrent
WORKDIR /usr/src/wtorrent

# Bundle app source
COPY . /usr/src/wtorrent

# Install app dependencies
RUN npm install

ENV PORT 80
EXPOSE ${PORT}
CMD [ "npm", "start" ]
