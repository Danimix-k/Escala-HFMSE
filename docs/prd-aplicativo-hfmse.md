# PRD - Aplicativo HFMSE simplificado

## 1. Resumo executivo

O Aplicativo HFMSE simplificado transforma o formulario de nove paginas fornecido como referencia em uma jornada digital guiada. Um profissional informa apenas as iniciais do paciente e a data do atendimento, responde aos 33 itens com pontuacoes de 0, 1 ou 2 e recebe o total de 0 a 66.

O aplicativo nao possui login, backend ou integracao externa. Avaliacoes em andamento e atendimentos concluidos permanecem exclusivamente no armazenamento do navegador e podem ser consultados ou excluidos pelo usuario do dispositivo.

## 2. Problema

O formulario em PDF concentra posicao inicial, posicao final, instrucao, grau de resposta e pontuacao em uma tabela extensa. Durante a aplicacao, isso exige localizar cada item, interpretar linhas densas, marcar manualmente a pontuacao e somar o resultado.

O produto deve reduzir essa carga operacional sem alterar a escala: uma pergunta por vez, alternativas claramente associadas a 2, 1 e 0 pontos, revisao obrigatoria e soma automatica.

## 3. Objetivos

- Guiar o profissional pelos 33 itens na ordem da escala.
- Reduzir erros de omissao e de soma.
- Mostrar apenas as informacoes necessarias em cada etapa.
- Permitir retomar uma avaliacao interrompida no mesmo dispositivo.
- Manter um historico local de atendimentos concluidos, identificado por iniciais e data.
- Funcionar sem conta de usuario e sem transmitir respostas para um backend.

## 4. Nao objetivos

- Substituir validacao, julgamento ou treinamento clinico.
- Interpretar a pontuacao ou recomendar tratamento.
- Manter prontuario eletronico.
- Sincronizar dados entre navegadores ou dispositivos.
- Realizar backup em nuvem.
- Cadastrar nome completo, CPF, numero de prontuario ou contato.
- Exportar relatorio ou formulario PDF no MVP.
- Integrar com sistemas hospitalares, RNDS ou APIs externas.

## 5. Usuario principal

Profissional de saude capacitado para aplicar a HFMSE, utilizando principalmente celular ou tablet durante o atendimento.

## 6. Principios de produto

1. **Uma decisao por vez:** mostrar um item da escala por tela.
2. **Conteudo clinico fiel:** nao resumir ou reinterpretar os criterios de pontuacao.
3. **Soma deterministica:** o total e sempre a soma das 33 respostas.
4. **Privacidade por minimizacao:** coletar somente iniciais e data.
5. **Local por padrao:** nenhuma resposta sai do dispositivo.
6. **Exclusao sob controle:** permitir apagar um registro ou todo o historico.
7. **Sem inferencia clinica:** mostrar pontos, nunca classificacoes ou recomendacoes.

## 7. Escopo funcional

### RF-01 - Iniciar atendimento

- Solicitar iniciais do paciente e data do atendimento.
- Normalizar iniciais para maiusculas, removendo pontos e espacos.
- Aceitar de 2 a 6 letras.
- Preencher a data inicialmente com a data atual.
- Aceitar apenas datas validas, iguais ou anteriores ao dia atual.
- Criar um identificador local aleatorio para diferenciar atendimentos com as mesmas iniciais e data.

### RF-02 - Retomar rascunho

- Manter no maximo um atendimento em andamento.
- Ao abrir o aplicativo, detectar o rascunho e oferecer continuar ou descartar.
- Mostrar iniciais, data e quantidade de itens respondidos.
- Exigir confirmacao antes de descartar.

### RF-03 - Aplicar a escala

- Apresentar os 33 itens na ordem numerica do documento de referencia.
- Para cada item, apresentar titulo, posicao inicial, posicao final, instrucao, pergunta e tres graus de resposta.
- Associar cada grau exclusivamente a `2`, `1` ou `0` pontos.
- Exigir resposta antes de avancar.
- Permitir voltar e alterar respostas enquanto o atendimento estiver em andamento.
- Incluir cronometro auxiliar nos itens com contagem de tempo, sem pontuacao automatica.

### RF-04 - Salvar progresso local

- Salvar o rascunho depois de cada resposta e mudanca de item.
- Preservar o rascunho depois de recarregar ou fechar a pagina.
- Exibir erro claro se o armazenamento estiver indisponivel ou cheio.
- Nao transmitir o rascunho pela rede.

### RF-05 - Revisar respostas

- Listar os 33 itens, resposta escolhida e pontos.
- Mostrar itens ausentes primeiro.
- Permitir abrir diretamente um item para edicao.
- Exibir total parcial apenas como soma, sem interpretacao.
- Impedir finalizacao enquanto houver resposta ausente.

### RF-06 - Finalizar atendimento

- Solicitar confirmacao antes de finalizar.
- Calcular novamente o total no momento da finalizacao.
- Salvar uma unica copia no historico local.
- Marcar o registro como somente leitura.
- Remover o rascunho apenas depois de confirmar que o registro concluido foi salvo.
- Se o salvamento falhar, manter o rascunho e permitir nova tentativa.

### RF-07 - Mostrar resultado

- Exibir iniciais, data e total no formato `X de 66 pontos`.
- Permitir consultar o detalhamento das 33 respostas.
- Informar que o valor nao oferece diagnostico ou interpretacao clinica.
- Oferecer nova avaliacao e acesso ao historico.

### RF-08 - Historico local

- Listar atendimentos concluidos em ordem decrescente de data de atendimento e conclusao.
- Exibir iniciais, data e total em cada registro.
- Permitir abrir o detalhamento somente leitura.
- Permitir excluir um atendimento mediante confirmacao.
- Permitir apagar todo o historico mediante confirmacao reforcada.
- Exibir estado vazio quando nao houver registros.

### RF-09 - Ciclo de vida local

- Manter os atendimentos ate exclusao manual ou limpeza dos dados do navegador.
- Informar que os registros pertencem somente ao navegador e dispositivo atuais.
- Informar que modo anonimo, troca de navegador, limpeza de dados ou perda do dispositivo pode apagar o historico.
- Nao oferecer sincronizacao, importacao ou exportacao no MVP.

## 8. Regras da pontuacao

- Quantidade de itens: `33`.
- Valores validos por item: `0`, `1` ou `2`.
- Total minimo: `0`.
- Total maximo: `66`.
- Formula: `total = soma das 33 respostas`.
- Nao existe alternativa "nao se aplica".
- O total nao pode ser digitado ou ajustado manualmente.
- Percentuais, faixas, classificacoes, tendencias e recomendacoes clinicas nao fazem parte do produto.

## 9. Conteudo da escala

A fonte primaria e o arquivo `escala hfmse ame jun 2025.docx.pdf`, identificado como "Versao Brasileira da Escala HFMSE - Avaliacao Motora Pacientes AME 5Q Tipo II", DIAF/SAS/SES/SC, junho de 2025.

Os titulos identificados no documento sao:

| Item | Titulo |
| ---: | --- |
| 1 | Sentado na cadeira/chao |
| 2 | Permanecer sentado por um longo periodo |
| 3 | Uma mao na cabeca sentado |
| 4 | Duas maos na cabeca sentado |
| 5 | Deitado de lado |
| 6 | Rolar de prono a supino para a direita |
| 7 | Rolar de prono a supino para a esquerda |
| 8 | Rolar de supino para prono para a direita |
| 9 | Rolar de supino para prono para a esquerda |
| 10 | Sentado para deitar |
| 11 | Apoio nos antebracos |
| 12 | Levanta a cabeca no decubito |
| 13 | Suporte nos bracos estendidos |
| 14 | Deitado para sentar |
| 15 | Deitado para sentar - titulo repetido no PDF, requer validacao clinica |
| 16 | Engatinhando |
| 17 | Levanta a cabeca em decubito dorsal |
| 18 | Ficando de pe |
| 19 | Ficando de pe sem suporte |
| 20 | Caminhando |
| 21 | Flexao do quadril direito em decubito dorsal |
| 22 | Flexao do quadril esquerdo em decubito dorsal |
| 23 | Ajoelhado alto a meio ajoelhado - direita |
| 24 | Ajoelhado alto a meio ajoelhado - esquerda |
| 25 | Ajoelhado alto para em pe, conduzindo com a perna esquerda |
| 26 | Ajoelhado alto para em pe, conduzindo com a perna direita |
| 27 | De pe para sentar no chao |
| 28 | Agachamento |
| 29 | Saltar 30 cm a frente |
| 30 | Subir quatro degraus com auxilio do corrimao |
| 31 | Descer quatro degraus com auxilio do corrimao |
| 32 | Subir quatro degraus sem auxilio do corrimao |
| 33 | Descer quatro degraus sem auxilio do corrimao |

### Regra editorial clinica

- Posicoes, instrucoes, perguntas e alternativas devem ser transcritas integralmente do PDF.
- Erros aparentes, repeticoes ou divergencias nao devem ser corrigidos silenciosamente.
- Cada divergencia deve entrar em uma lista de pendencias para decisao de profissional habilitado.
- A versao aprovada do conteudo deve receber um identificador imutavel, como `hfmse-br-ses-sc-2025-06-v1`.
- Um atendimento deve conservar o identificador da versao usada, mesmo quando o aplicativo receber uma escala revisada.

## 10. Modelo de dados local

### `ScaleItem`

```ts
type Score = 0 | 1 | 2;

interface ScaleItem {
  number: number;
  title: string;
  initialPosition: string;
  finalPosition: string;
  instruction: string;
  patientPrompt: string;
  options: Array<{
    score: Score;
    description: string;
  }>;
  timerSeconds?: 3 | 10;
}
```

### `DraftAssessment`

```ts
interface DraftAssessment {
  id: string;
  scaleVersion: string;
  patientInitials: string;
  attendanceDate: string; // ISO 8601: YYYY-MM-DD
  currentItem: number;
  responses: Partial<Record<number, 0 | 1 | 2>>;
  createdAt: string;
  updatedAt: string;
}
```

### `CompletedAssessment`

```ts
interface CompletedAssessment {
  id: string;
  scaleVersion: string;
  patientInitials: string;
  attendanceDate: string;
  responses: Record<number, 0 | 1 | 2>;
  totalScore: number;
  createdAt: string;
  completedAt: string;
}
```

### Chaves de armazenamento

- `hfmse_draft_v1`: objeto `DraftAssessment` ou ausente.
- `hfmse_history_v1`: lista de `CompletedAssessment`.

### Transacao de finalizacao

1. Validar que existem exatamente 33 respostas validas.
2. Recalcular a soma, ignorando qualquer total previamente armazenado.
3. Criar o registro concluido com o mesmo `id` do rascunho.
4. Inserir no historico apenas se esse `id` ainda nao existir.
5. Confirmar a escrita do historico.
6. Somente entao remover o rascunho.

## 11. Requisitos nao funcionais

### Privacidade e seguranca

- Nao incluir backend, endpoint de API, analytics, pixels, gravadores de sessao ou crash reporting remoto.
- Hospedar scripts, icones e fontes junto com o aplicativo, evitando dependencias externas em tempo de execucao.
- Aplicar Content Security Policy restritiva.
- Nunca incluir iniciais ou respostas em URL, query string, logs ou mensagens de erro.
- Explicar que o armazenamento local do navegador nao equivale a prontuario seguro ou criptografado.
- Recomendar exclusao ao final do uso em dispositivo compartilhado.

### Acessibilidade

- Atender WCAG 2.2 nivel AA.
- Permitir uso completo por teclado.
- Manter foco visivel e ordem de foco logica.
- Associar alternativas a labels acessiveis com descricao e pontos.
- Usar alvos de toque de pelo menos 44 por 44 pixels.
- Nao depender apenas de cor para indicar selecao, erro ou pontuacao.
- Anunciar mudancas de item e erros de validacao a leitores de tela.

### Desempenho e compatibilidade

- Abrir rapidamente em conexoes instaveis.
- Funcionar offline depois que os arquivos estaticos forem armazenados pelo service worker.
- Suportar versoes atuais de Chrome, Edge, Safari e Firefox.
- Adaptar-se a celular, tablet e desktop sem rolagem horizontal.

## 12. Tratamento de erros

| Erro | Comportamento esperado |
| --- | --- |
| Armazenamento bloqueado | Informar que o progresso nao podera ser preservado e impedir falsa confirmacao de salvamento |
| Quota excedida | Manter a tela atual, explicar o problema e oferecer exclusao de historico |
| JSON local corrompido | Nao pontuar dados invalidos; oferecer limpeza segura e preservar o restante valido quando possivel |
| Versao desconhecida | Abrir registro antigo somente para consulta se sua estrutura for valida; nao mistura-lo com a escala atual |
| Fechamento durante finalizacao | Usar o mesmo ID para impedir duplicacao quando o aplicativo for reaberto |
| Data futura | Bloquear inicio e explicar o formato aceito |
| Item ausente | Bloquear finalizacao e direcionar ao primeiro item pendente |

## 13. Criterios de aceite

1. Uma nova avaliacao exige apenas iniciais e data.
2. O aplicativo apresenta os 33 itens na ordem correta.
3. Cada item aceita somente 0, 1 ou 2.
4. O profissional nao consegue concluir com item ausente.
5. Todas as respostas 0 geram total 0.
6. Todas as respostas 2 geram total 66.
7. Alterar qualquer resposta atualiza imediatamente o total parcial e final.
8. Recarregar a pagina preserva o rascunho e o item atual.
9. Finalizar cria um unico registro no historico e remove o rascunho.
10. O historico mostra iniciais, data e total em ordem decrescente.
11. O detalhe mostra as 33 respostas e nao permite edicao.
12. Exclusao individual remove somente o registro escolhido.
13. Exclusao total apaga todo o historico depois de confirmacao.
14. Nenhuma resposta, inicial ou pontuacao e enviada pela rede.
15. Limpar os dados do navegador remove o historico, conforme explicado na interface.

## 14. Plano de testes

### Pontuacao

- Totais 0, 66 e combinacoes intermediarias conhecidas.
- Edicao de 2 para 0 e de 0 para 2.
- Rejeicao de valores fora de 0, 1 e 2.
- Recalculo na finalizacao, sem confiar no total salvo.

### Jornada

- Nova avaliacao completa.
- Retomada depois de recarregar a pagina.
- Descarte de rascunho.
- Edicao a partir da revisao.
- Bloqueio com um ou mais itens ausentes.
- Nova avaliacao depois do resultado.

### Historico local

- Dois atendimentos com as mesmas iniciais e data permanecem distintos.
- Ordenacao por data e conclusao.
- Consulta somente leitura.
- Exclusao individual e total.
- Prevencao de duplicidade depois de interrupcao na finalizacao.
- Falha de quota e dado corrompido.

### Privacidade

- Inspecionar trafego e confirmar ausencia de envio de dados de avaliacao.
- Confirmar ausencia de dados sensiveis em URL e console.
- Confirmar que a aplicacao funciona sem analytics ou dependencias remotas.

### Conteudo e usabilidade

- Revisao linha a linha dos 33 itens contra o PDF renderizado.
- Validacao clinica das inconsistencias encontradas no documento de origem.
- Teste moderado em celular e tablet com profissional de saude.
- Navegacao por teclado e leitor de tela.

## 15. Indicadores de sucesso

Como o aplicativo nao possui telemetria, estes indicadores devem ser medidos apenas em testes moderados e sem registrar dados reais de pacientes:

- Profissional conclui uma avaliacao sem ajuda externa.
- Nenhum erro de soma em cenarios controlados.
- Nenhum item omitido em avaliacao finalizada.
- Profissional localiza um atendimento anterior pelas iniciais e data.
- Profissional compreende que o historico existe apenas no dispositivo.

## 16. Riscos e mitigacoes

| Risco | Mitigacao |
| --- | --- |
| Perda ao limpar o navegador | Aviso explicito de ausencia de backup e sincronizacao |
| Acesso por outra pessoa no mesmo dispositivo | Minimizar identificacao, permitir exclusao e alertar sobre dispositivos compartilhados |
| Interpretacao indevida do total | Nunca apresentar categoria, diagnostico ou recomendacao |
| Conteudo traduzido com inconsistencias | Revisao clinica obrigatoria e versionamento da escala |
| Confusao entre historico local e prontuario | Nomear a tela "Historico neste dispositivo" e repetir a limitacao |
| Duplicacao na finalizacao | Identificador idempotente e transacao local definida neste PRD |

## 17. Referencias

- Documento fornecido: `escala hfmse ame jun 2025.docx.pdf`.
- PCDT resumido AME 5Q do Ministerio da Saude: <https://www.gov.br/conitec/pt-br/midias/protocolos/resumidos/pcdt-resumido-ame>
- Stitch Skills: <https://github.com/google-labs-code/stitch-skills>

