  Gerenciando versão com o NPM
  O objetivo principal do gerenciador de pacote Node é uma dependência automatizada e gerenciamento para os arquivos package.json com sua interface da linha de comando.
  
  Checar a versão do node
  ```
  npm -v
  ```

  Inicializar o projeto:
  ```
  npm init
  ```

  Instalar módulos:
  ```
  npm install <module>
  npm i <module>
  npm install express
  ```

  O comando acima irá instalar o módulo express em /node_modules no diretório atual.

  Sempre que você instalar um módulo do npm, ele será instalado na pasta node_modules.

  Abaixo é como ele se aparenta depois de você instalar um modulo no seu projeto:

  Apresenta as versões das dependencias
  ```
  npm outdated 
  ```
  Comando de atualização de um pacote especifico 

  ```
  npm update nome_do_módulo
  npm update google-play-scraper 
  ```

  Sempre após a instalação de um pacote no npm ocorre a instalação da pasta node modules também.

  ``
  https://www.hostinger.com.br/tutoriais/o-que-e-npm
  ``
    
  O comando acima pode não funcionar, se isso ocorrer remova o pacote e instale-o novamente. Você saberá que o pacote não foi atualizado utilizando o comando 
  ```
  npm outdated 
  ```

  Desinstalar um módulo do projeto.
  ```
  npm remove nome_do_módulo
  npm remove google-play-scraper 
  ```
  Lista todos os módulos existentes no projeto
  ```
  npm list
  ```
  Listagem dos Pacotes Globais Instalados
  ```
  npm --global list:
  ```

  ```
  $ npm --global list
  /home/gaeta/.node_modules_global/lib
  ├─┬ gulp-cli@1.4.0
  │ ├── archy@1.0.0
  │ ├─┬ chalk@1.1.3
  │ │ ├── ansi-styles@2.2.1
  │ │ ├── escape-string-regexp@1.0.5
  │ │ ├─┬ has-ansi@2.0.0
  │ │ │ └── ansi-regex@2.1.1
  (...)
    │ └── xtend@4.0.1
    ├── wrappy@1.0.2
    └─┬ write-file-atomic@2.1.0
      ├── graceful-fs@4.1.11 deduped
      ├── imurmurhash@0.1.4 deduped
      └── slide@1.1.6 deduped

 A lista é bem grande e no exemplo acima eu cortei a maior parte dela. Para listar apenas os pacotes, sem suas dependências, acrescente a opção 
 *  --depth=0:
```
$ npm list --global --depth=0
/home/gaeta/.node_modules_global/lib
├── gulp-cli@1.4.0
└── npm@5.4.2
```

Uma boa prática é não versionar no Git o pacote node-modules, quando um dev fizer o clone ele baixa os pacotes e quando atualizar, você tem que colocar esse processo na automação de "build" o Gulp pode te ajudar a automatizar essa tarefas. A única coisa que você versionaria seria o arquivo json com a relação de pacotes, daí é só dar o comando de update do npm, para atualizar os pacotes.

``
https://www.hostinger.com.br/tutoriais/o-que-e-npm
``

Arquivo package.json
  ```
  {
    "name": "npm-basico",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "gulp": "^3.9.1"
    }
  }
  ```
   O acento circunflexo (^) na frente do número da versão indica que o npm irá buscar sempre a última versão disponível, respeitando apenas a dependência para a versão maior. Estamos nos referindo aqui ao versionamento semântico, que obedece a forma MAJOR.MINOR.PATCH. No caso deste exemplo, portanto, o npm buscaria a última versão disponível, abaixo da 4.0.0.
   
   O arquivo package-lock.json, criado automaticamente a partir do npm v5, “trava”, por assim dizer, nas versões instaladas durante o desenvolvimento. Assim, quando o projeto for reinstalado, serão baixadas as versões idênticas àquelas.

   A principal razão de adotarmos o package.json para controle das dependências de um projeto é a portabilidade. Dessa forma, quando clonamos um projeto do Github, por exemplo, basta executarmos o comando npm install e todas as dependências necessárias serão instaladas num piscar de olhos (ou quase…).

  ```
  npm install --save underscore@1.8.2
  ```
  Observem que instalamos o pacote underscore com a opção --save, o que o inclui na seção “dependencies” do package.json, e não na seção “devDependencies”, como ocorreu quando usamos a opção --save-dev. Vejam também que foi instalada a versão que especificamos (1.8.2):

  Podemos instalar vários pacotes de uma só vez, conforme a seguir:
  ```
  npm i express momemt lodash mongoose body-parser webpack
  ```

Outros Comandos Úteis

Acessar a Homepage de um pacote:
```
npm home <pacote>
```

Acessar o repositório de um pacote no GitHub:
```
npm repo <pacote>
```

Acessar a documentação de um pacote:
```
npm docs <pacote>
```

``
https://pontogpp.com.br/blog/tecnico/npm-basico/
``

Procurar por pacotes não declarados no package.json
```
npm prune
```

``
https://www.luiztools.com.br/post/o-guia-completo-do-package-json-do-node-js/
``