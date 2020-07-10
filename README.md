# Drone Commands API
O objetivo da API de comandos do drone é fornecer uma interface REST configurável para executar comandos de rotas do drone no simulador `Sphinx`. Através da API é possível cadastrar comandos disponibilizados nos scripts de interface com o drone [drone-routes](https://bitbucket.org/ggleme/drone-routes/).

## Instalação

As instruções abaixo foram testadas em sistemas operacionais Linux (Ubuntu/Debian) e MacOS, porém, para compatibilidade com os scripts de execução da simulação do drone, é necessário .

#### Pré-requisitos

- Instalação do [Nodejs 12+](https://nodejs.org/en)
- Instalação do [MongoDB](https://docs.mongodb.com/manual/installation/) de acordo com seu sistema operacional
- Alternativa para o [MongoDB em Docker](https://hub.docker.com/_/mongo): `docker run --name <nome-do-container> -p 27017:27017 mongo:4.2`

## Instalação


```
git clone https://ggleme@bitbucket.org/ggleme/drone-commands-api.git

cd drone-commands-api

cp sample.env .env
```

```.env
NODE_ENV=development
PORT=3000

MONGODB_PREFIX=mongodb
MONGODB_HOSTNAME=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=drone-inspection
MONGODB_AUTH_DATABASE=drone-inspection
MONGODB_USERNAME=iot
MONGODB_PASSWORD=iot@2020
MONGODB_DEBUG=true

AUTHENTICATION_SECRET=U_ftgwxT-4@AH.V2HEhC.-L*UGLriVHGQBmzsdoK2Yd8ep64j9
AUTHENTICATION_EXPIRATION=30d
AUTHENTICATION_SALT_ROUNDS=10
```

## Executando a API

## Configurando o Proxy Reverso

## Criando um Comando Para Execução de uma Rota

## Testando com o Skill da Alexa