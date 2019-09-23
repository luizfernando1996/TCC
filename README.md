# Análise dos fatores e relações que levam um aplicativo de ensino de programação ao sucesso na Google Play Store!
Orientados: Jonathan Dias Rodrigues,  Luiz Fernando de Oliveira Macedo
Orientador: Lesandro Ponciano 

### Related projects

* [google-play-scraper](https://github.com/luizfernando1996/TCC/tree/master/bibliotecas/google-play-scraper): Scraper para o Google Play Store.
* [sentiment](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao/Etapa%203%20-%20Definicao%20e%20calculo%20de%20sucesso%20de%20comments/code/lib/sentiment): Análise de sentimento baseada em AFINN para Node.js

## Sumário

  1. [Etapa 0 - Definição das ferramentas](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao#etp0)
  1. [Etapa 1 - Coleta dos dados de aplicativos](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao#etapa-1----coleta-dos-dados-de-aplicativos---dados-comments-e-metrics)
  1. [Etapa 2 - Definição e cálculo de sucesso a partir de atributos quantitativos dos aplicativos](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao#etapa-2---defini%C3%A7%C3%A3o-e-c%C3%A1lculo-de-sucesso-a-partir-de-atributos-quantitativos-dos-aplicativos)
  1. [Etapa 3 - Definição e cálculo de sucesso a partir de comentários dos aplicativos](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao#etapa-2---defini%C3%A7%C3%A3o-e-c%C3%A1lculo-de-sucesso-a-partir-de-atributos-quantitativos-dos-aplicativos)
  1. [Etapa 4 - Inter-relacionar as medidas de sucesso obtidas nas etapas II e III](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao#etapa-4---inter-relacionar-as-medidas-de-sucesso-obtidas-nas-etapas-ii-e-iii)
  1. [Etapa 5 - Análise dos resultados](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao#etapa-5---an%C3%A1lise-dos-resultados)
  1. [Etapa 6 -  Escrita do documento final](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao#etapa-6---escrita-do-documento-final)

## Etapa 0 - Definição das ferramentas

Para mais detalhes: [Clique aqui](https://github.com/luizfernando1996/TCC/blob/estabilizandoVersao/Etapa%200%20-%20Defini%C3%A7%C3%A3o%20das%20tecnologias/README.md)

## Etapa 1 -  Coleta dos dados de aplicativos - Dados: Comments e Metrics 

Na etapa I, coleta dos dados de aplicativos, serão buscados e selecionados apenas os aplicativos do domínio de ensino de programação na Google Play Store. Os filtros estabelecidos são: 

  1. palavras-chave: 
    ```
    programming, programação, learn programming, ensino de programação, learn code.
    ```
  1. categorias: 
    ```
    educação, livros e referências.
    ```
    
É relevante lembrar que os aplicativos selecionados por tais palavras-chave devem estar em alguma das duas categorias para serem categorizados como aplicativos do domínio de ensino de programação. Serão coletados dados tanto de aplicativos gratuitos como de aplicativos pagos. A ferramenta proposta para a coleta de dados é a Google Play Scraper descrita na Seção 2.5. 

Para mais detalhes: [Clique aqui](https://github.com/luizfernando1996/TCC/blob/estabilizandoVersao/Etapa%201%20-%20Coleta%20dos%20dados/README.md)

## Etapa 2 - Definição e cálculo de sucesso a partir de atributos quantitativos dos aplicativos
Na etapa II, definição e cálculo de sucesso a partir de atributos quantitativos dos aplicativos, serão selecionadas informações para analisar o sucesso dos aplicativos. Essas informações, em sua maioria, serão valores numéricos e serão usados para medir os níveis de cada uma delas que implica no sucesso do aplicativo. Como exemplo de fatores candidatos a serem coletados para cada aplicativo, pode-se citar:
1. Número de avaliações: Essa métrica informa a quantidade de usuários que avaliaram o aplicativo e teceram comentários.  
1. Número de estrelas do aplicativo:	Essa informação representa a média de estrelas que um aplicativo possui, e é calculada pela divisão entre o número total de estrelas que os usuários forneceram para tal aplicativo, dividido pela quantidade de usuários que o avaliaram. 
1. Número de instalações: Essa métrica representa o número aproximado de instalações que o aplicativo obteve até o momento da análise. 
1. Tamanho do aplicativo: Essa métrica representa o tamanho que o software ocupa no dispositivo do usuário. 
1. Versão requerida: Essa informação representa a versão mínima do Sistema Operacional Android compatível com o aplicativo, restringindo  a instalação quando o aparelho do usuário não está na versão requerida.  

Para mais detalhes: [Clique aqui](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao/Etapa%202%20-%20Definicao%20e%20calculo%20de%20sucesso%20de%20metrics)

## Etapa 3 - Definição e cálculo de sucesso a partir de comentários dos aplicativos


Para mais detalhes: [Clique aqui](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao/Etapa%203%20-%20Definicao%20e%20calculo%20de%20sucesso%20de%20comments)

## Etapa 4 - Inter-relacionar as medidas de sucesso obtidas nas etapas II e III
A etapa IV,  inter-relacionar as medidas de sucesso obtidas nas etapas II e III,  consiste em definir e implementar um método estatístico de análise de correlação ou regressão, sendo a definição do método a ser utilizado baseada na distribuição estatística dos dados obtidos nas etapas II e III. E então, a partir do método definido, inter-relacionar os resultados obtidos nas etapas II e III, a fim de encontrar fatores que podem influenciar no sucesso dos aplicativos. 

Para mais detalhes: [Clique aqui](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao/Etapa%204%20-%20%20Inter-relacionamento)

## Etapa 5 - Análise dos resultados
Na etapa V, análise dos resultados, busca-se observar as conclusões da etapa IV. Isso para inferir quais fatores, níveis e relações das medidas de sucesso são significativas para alcance de sucesso do aplicativo de ensino de programação. 

Para mais detalhes: [Clique aqui](https://github.com/luizfernando1996/TCC/tree/estabilizandoVersao/Etapa%205%20-%20Analise)

## Etapa 6 - Escrita do documento final
Por fim, a etapa VI, escrita do documento final, consiste em expor os resultados alcançados. Além disso, expor as limitações do estudo realizado, além de propostas para trabalhos futuros baseados nas descobertas desse estudo.

Para mais detalhes: [Clique aqui](https://docs.google.com/document/d/1KTI5TGo5QIExQDu0JV7cqvV7AdhJaxVkj7a_LsISk04/edit#)
