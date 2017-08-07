FROM node:argon

COPY 	package.json /src/package.json
RUN 	cd /src; npm install

# Bundle app source
COPY 	. /src

RUN	    chmod +x /src/run.sh

CMD 	["/src/run.sh"]