## Drink Vending Machine
Summary:
- Coke, Pepsi, Dew are the drinks
- Fund is person's assumed Money to spend
- Income is Machine's earning
- Units are respective drinks number of items left

- Put the coins in textfield
- Click on the button to buy the respective drink
- Higher coin result in purchase of exact drinks and Change return
- Insuffiecient fund will result in Unable to buy drink
- Drinks can be return & refund one at a time only
- Machine's income will deduct and persons fund will increase
- If more drinks are returned than actual vending windraw, server error will occur


Requirements:
- Node.js 14.x
- React
- TypeScript
- Mongodb
- yarn (use `yarn add <npm_module>` instead of `npm install <npm_module>`)

### Installations
incase  docker-compose up returns error
for simple installation React
```bash
	cd client
	yarn install
	yarn start   (port:3000)
```

for simple installation Server
```bash
	cd server
	yarn install
	yarn start   (port:4000)
  ```
	
ts.config for more setup in strict

#### Mongodb Installation

```bash
sudo apt update && sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb    (This is to enable mongodb on computer restart)
```

#### Nodejs 14

Reference:
https://computingforgeeks.com/install-node-js-14-on-ubuntu-debian-linux/

```bash
sudo apt update
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt -y install nodejs
```

Check nodejs version at this point using node -v

```bash
sudo apt -y install gcc g++ make
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
```
#### React Setup
make sure nodejs installation is successfull using node --version

npx create-react-app (name of project) --template typescript

#### Docker Container Setup

Reference: https://docs.docker.com/engine/install/ubuntu/

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Test Installation `sudo docker run hello-world`

Compose Setup: https://docs.docker.com/compose/install/

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Build Docker container

This might take multiple runs of the command depending on internet connection.
The command will resume from the step it failed.

`sudo docker-compose up --build`



### Development

Development environment is containerized with Docker.

#### Backend (NodeJS + Express)

Executing `sudo docker-compose up` from the directory where `docker-compose.yml`
file exists will start a localhost setup for development with following
services:

- invept-mongo: mongoDB in port 27017
- invept-web: express app - <http://localhost:4000>

#### Website (React)

Executing `cd website; yarn start` will start a development server for React
application <http://localhost:3000>

#### More docker commands for testing

### Testing

```bash
# run test suite
yarn test

# watch mode - test suite runs every time there's a file change
yarn test:watch
```


