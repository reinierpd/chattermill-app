FROM node:8

# Set a working directory
WORKDIR /usr/src/app

# Copy project dependencies
COPY package.json package.json

# Install Node.js dependencies
RUN yarn install

# Set default command
CMD [ "yarn", "start" ]
