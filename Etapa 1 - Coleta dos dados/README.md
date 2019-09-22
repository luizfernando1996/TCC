## Etapa 1 - Etapa de Coleta dos dados de Aplicativos - Dados: Comments e Metrics 

#### Dependencias do código
  *CLI-Progress
  ```
  npm install colors
  https://www.npmjs.com/package/colors
  ```
  npm install string-width
  https://www.npmjs.com/package/string-width
  ```
  npm install -g yarn
  https://tableless.com.br/yarn-evolucao-do-npm/
  ```
  yarn add cli-progress
  npm install cli-progress --save
  https://npmjs.com/package/cli-progress

#### Ambiente pesquisa
Foram feitas consultas por meio das  palavras chaves:
```javascript
var palavraChave = [
    'programming',
    'programação',
    'learn programming',
    'ensino de programação',
    'learn code'
] 
```
e de cada uma dessas respostas foi selecionado 250 apps, restrição da ferramenta, totalizando 1250 apps.


#### Ambiente experimental
   - Entrada: Foi coletado informações de 50 aplicativos para cada palavra chave, ou seja, 
o algoritmo retornou 250 aplicativos para serem analisados.

   - Detalhes sobre o algoritmo (O que ele faz?):
     - Problemas observados:

   - Saída: Essa pequena amostra  gerada pelo algoritmo foi exporada para arquivos em excel 
para uma melhor análise. Isso porque uma análise mais refinada irá auxiliar no 
refinamento do algoritmo de seleção.