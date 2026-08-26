import { ScaleItem } from '../types/hfmse';

export const HFMSE_SCALE_VERSION = 'hfmse-br-ses-sc-2025-06-v1';

export const HFMSE_ITEMS: ScaleItem[] = [
  {
    number: 1,
    title: 'Sentado na cadeira/chão',
    initialPosition: 'Sentado em uma cadeira ou no chão sem apoio para as costas.',
    finalPosition: 'Mantém a posição sentada estável sem apoio das mãos por 3 segundos.',
    instruction: 'Observar se o paciente mantém o equilíbrio sentado sem auxílio dos membros superiores.',
    patientPrompt: 'Fique sentado bem retinho sem apoiar as mãos.',
    timerSeconds: 3,
    options: [
      { score: 2, description: 'Mantém sentado ereto, sem apoio das mãos, por pelo menos 3 segundos.' },
      { score: 1, description: 'Mantém sentado com apoio de uma ou ambas as mãos, ou inclinado, por pelo menos 3 segundos.' },
      { score: 0, description: 'Incapaz de manter a posição sentada sem apoio total das costas ou cai.' }
    ]
  },
  {
    number: 2,
    title: 'Permanecer sentado por um longo período',
    initialPosition: 'Sentado sem apoio no chão ou superfície plana.',
    finalPosition: 'Mantém a postura sentada independente e estável por 10 segundos.',
    instruction: 'Avaliar a resistência e estabilidade postural estática em sedestação.',
    patientPrompt: 'Permaneça sentado nesta posição enquanto conto até 10.',
    timerSeconds: 10,
    options: [
      { score: 2, description: 'Permanece sentado sem apoio das mãos e sem oscilação excessiva por 10 segundos.' },
      { score: 1, description: 'Permanece sentado por 10 segundos com apoio das mãos ou oscilação do tronco.' },
      { score: 0, description: 'Incapaz de permanecer sentado por 10 segundos.' }
    ]
  },
  {
    number: 3,
    title: 'Uma mão na cabeça sentado',
    initialPosition: 'Sentado sem apoio para as costas e sem apoio dos braços.',
    finalPosition: 'Leva uma das mãos até o topo da cabeça mantendo a postura sentada.',
    instruction: 'O examinador pode indicar o braço preferido ou testar ambos se necessário. O cotovelo deve elevar-se livremente.',
    patientPrompt: 'Coloque uma das mãos em cima da sua cabeça sem cair.',
    options: [
      { score: 2, description: 'Toca o topo da cabeça com a mão sem flexão compensatória excessiva do tronco ou pescoço.' },
      { score: 1, description: 'Alcança a cabeça apenas inclinando a cabeça para a mão ou com apoio compensatório.' },
      { score: 0, description: 'Incapaz de levar a mão à cabeça.' }
    ]
  },
  {
    number: 4,
    title: 'Duas mãos na cabeça sentado',
    initialPosition: 'Sentado ereto sem apoio de encosto.',
    finalPosition: 'Leva ambas as mãos simultaneamente ao topo da cabeça.',
    instruction: 'Observar a estabilidade do tronco e a força proximal bilateral de membros superiores.',
    patientPrompt: 'Coloque as duas mãos em cima da cabeça ao mesmo tempo.',
    options: [
      { score: 2, description: 'Coloca as duas mãos no topo da cabeça simultaneamente sem perder o equilíbrio.' },
      { score: 1, description: 'Coloca as duas mãos sucessivamente, ou apenas toca a cabeça com flexão pronunciada do pescoço.' },
      { score: 0, description: 'Incapaz de colocar as duas mãos na cabeça.' }
    ]
  },
  {
    number: 5,
    title: 'Deitado de lado',
    initialPosition: 'Decúbito dorsal (deitado de barriga para cima).',
    finalPosition: 'Gira o corpo e mantém a posição em decúbito lateral estável.',
    instruction: 'Avaliar a capacidade de iniciar a rotação e estabilizar no plano lateral.',
    patientPrompt: 'Vire de lado e fique equilibrado nessa posição.',
    options: [
      { score: 2, description: 'Gira para o lado de forma independente e mantém a posição estável.' },
      { score: 1, description: 'Inicia o movimento ou atinge a posição com compensação acentuada ou auxílio mínimo.' },
      { score: 0, description: 'Incapaz de rolar para o decúbito lateral.' }
    ]
  },
  {
    number: 6,
    title: 'Rolar de prono a supino para a direita',
    initialPosition: 'Decúbito ventral (barriga para baixo) com membros alinhados.',
    finalPosition: 'Decúbito dorsal completo, girando pelo lado direito.',
    instruction: 'Observar a rotação segmental ou em bloco sobre o hemicorpo direito.',
    patientPrompt: 'Role de barriga para cima virando para a sua direita.',
    options: [
      { score: 2, description: 'Rola completamente de prono para supino para a direita de forma controlada.' },
      { score: 1, description: 'Completa o rolamento com movimentos compensatórios excessivos ou incompleto.' },
      { score: 0, description: 'Incapaz de iniciar ou completar o rolamento.' }
    ]
  },
  {
    number: 7,
    title: 'Rolar de prono a supino para a esquerda',
    initialPosition: 'Decúbito ventral (barriga para baixo) com membros alinhados.',
    finalPosition: 'Decúbito dorsal completo, girando pelo lado esquerdo.',
    instruction: 'Observar a rotação segmental ou em bloco sobre o hemicorpo esquerdo.',
    patientPrompt: 'Role de barriga para cima virando para a sua esquerda.',
    options: [
      { score: 2, description: 'Rola completamente de prono para supino para a esquerda de forma controlada.' },
      { score: 1, description: 'Completa o rolamento com movimentos compensatórios excessivos ou incompleto.' },
      { score: 0, description: 'Incapaz de iniciar ou completar o rolamento.' }
    ]
  },
  {
    number: 8,
    title: 'Rolar de supino para prono para a direita',
    initialPosition: 'Decúbito dorsal (barriga para cima).',
    finalPosition: 'Decúbito ventral completo, girando para o lado direito.',
    instruction: 'Avaliar o rolamento ativo no sentido supino-prono pela direita.',
    patientPrompt: 'Role de barriga para baixo virando para a sua direita.',
    options: [
      { score: 2, description: 'Rola completamente de supino para prono para a direita.' },
      { score: 1, description: 'Inicia o rolamento ou completa com esforço compensatório acentuado.' },
      { score: 0, description: 'Incapaz de rolar.' }
    ]
  },
  {
    number: 9,
    title: 'Rolar de supino para prono para a esquerda',
    initialPosition: 'Decúbito dorsal (barriga para cima).',
    finalPosition: 'Decúbito ventral completo, girando para o lado esquerdo.',
    instruction: 'Avaliar o rolamento ativo no sentido supino-prono pela esquerda.',
    patientPrompt: 'Role de barriga para baixo virando para a sua esquerda.',
    options: [
      { score: 2, description: 'Rola completamente de supino para prono para a esquerda.' },
      { score: 1, description: 'Inicia o rolamento ou completa com esforço compensatório acentuado.' },
      { score: 0, description: 'Incapaz de rolar.' }
    ]
  },
  {
    number: 10,
    title: 'Sentado para deitar',
    initialPosition: 'Sentado no colchonete com pernas estendidas à frente.',
    finalPosition: 'Decúbito dorsal com controle do tronco.',
    instruction: 'Observar o controle excêntrico dos flexores de tronco ao deitar.',
    patientPrompt: 'Deite-se devagar de costas no colchonete.',
    options: [
      { score: 2, description: 'Deita-se com controle total do tronco, sem bater as costas ou a cabeça.' },
      { score: 1, description: 'Deita-se com apoio das mãos/cotovelos ou perde o controle na fase final.' },
      { score: 0, description: 'Cai para trás sem controle postural.' }
    ]
  },
  {
    number: 11,
    title: 'Apoio nos antebraços',
    initialPosition: 'Decúbito ventral (barriga para baixo).',
    finalPosition: 'Apoio sobre os cotovelos/antebraços elevando a cabeça e tórax.',
    instruction: 'Observar a capacidade de suportar peso nos antebraços com extensão cervical por 3 segundos.',
    patientPrompt: 'Apoie-se nos seus cotovelos e levante o peito e a cabeça.',
    timerSeconds: 3,
    options: [
      { score: 2, description: 'Sustenta o peso nos antebraços com peito elevado por 3 segundos.' },
      { score: 1, description: 'Mantém apoio parcial ou por menos de 3 segundos.' },
      { score: 0, description: 'Incapaz de levantar a cabeça e tórax com apoio de antebraços.' }
    ]
  },
  {
    number: 12,
    title: 'Levanta a cabeça no decúbito ventral',
    initialPosition: 'Decúbito ventral com braços ao lado do corpo.',
    finalPosition: 'Cabeça elevada acima da linha do colchonete.',
    instruction: 'Avaliar a força dos extensores cervicais sem apoio dos membros superiores.',
    patientPrompt: 'Levante sua cabeça do chão olhando para a frente.',
    options: [
      { score: 2, description: 'Eleva a cabeça completamente mantendo a extensão cervical livre.' },
      { score: 1, description: 'Eleva a cabeça parcialmente ou não sustenta a posição.' },
      { score: 0, description: 'Incapaz de levantar a cabeça do colchonete.' }
    ]
  },
  {
    number: 13,
    title: 'Suporte nos braços estendidos',
    initialPosition: 'Decúbito ventral.',
    finalPosition: 'Apoio com as palmas das mãos e braços estendidos elevando tórax e abdômen.',
    instruction: 'Verificar extensão completa dos cotovelos suportando o peso do tronco superior.',
    patientPrompt: 'Empurre o chão com as mãos esticando os braços e levantando o peito.',
    options: [
      { score: 2, description: 'Eleva o tronco com braços totalmente estendidos e sustenta o peso.' },
      { score: 1, description: 'Eleva o tronco com extensão parcial dos cotovelos.' },
      { score: 0, description: 'Incapaz de apoiar e elevar o tronco com as mãos.' }
    ]
  },
  {
    number: 14,
    title: 'Deitado para sentar (lado preferido)',
    initialPosition: 'Decúbito dorsal.',
    finalPosition: 'Posição sentada ereta no colchonete.',
    instruction: 'O paciente pode rolar para o lado e empurrar com os braços para sentar.',
    patientPrompt: 'Levante e sente-se no colchonete do jeito que preferir.',
    options: [
      { score: 2, description: 'Passa de deitado para sentado de forma independente e fluida.' },
      { score: 1, description: 'Passa para sentado com grande esforço, compensação ou tempo prolongado.' },
      { score: 0, description: 'Incapaz de passar para a posição sentada.' }
    ]
  },
  {
    number: 15,
    title: 'Deitado para sentar (lado oposto)',
    initialPosition: 'Decúbito dorsal.',
    finalPosition: 'Posição sentada ereta no colchonete.',
    instruction: 'Observar a passagem para sentar utilizando o lado contra-lateral ao preferido.',
    patientPrompt: 'Agora sente-se virando para o outro lado.',
    options: [
      { score: 2, description: 'Passa para sentado virando pelo outro lado com autonomia.' },
      { score: 1, description: 'Passa para sentado com compensação acentuada pelo lado oposto.' },
      { score: 0, description: 'Incapaz de passar para sentado pelo lado solicitado.' }
    ]
  },
  {
    number: 16,
    title: 'Engatinhando (posição de quatro apoios)',
    initialPosition: 'Posição de quatro apoios (mãos e joelhos apoiados).',
    finalPosition: 'Deslocamento ou sustentação em quatro apoios.',
    instruction: 'Avaliar a sustentação e locomoção recíproca em quatro apoios.',
    patientPrompt: 'Fique na posição de quatro apoios e dê alguns passos engatinhando.',
    options: [
      { score: 2, description: 'Mantém quatro apoios estável e engatinha para frente de forma coordenada.' },
      { score: 1, description: 'Mantém a postura de quatro apoios estática ou avança com dificuldade.' },
      { score: 0, description: 'Incapaz de adotar ou manter quatro apoios.' }
    ]
  },
  {
    number: 17,
    title: 'Levanta a cabeça em decúbito dorsal',
    initialPosition: 'Decúbito dorsal com queixo alinhado.',
    finalPosition: 'Cabeça flexionada anteriormente com queixo em direção ao esterno.',
    instruction: 'Avaliar a força dos flexores cervicais anteriores sem tração dos membros.',
    patientPrompt: 'Levante a cabeça olhando em direção aos seus pés.',
    options: [
      { score: 2, description: 'Eleva a cabeça livremente do chão com queixo aproximado ao peito.' },
      { score: 1, description: 'Eleva a cabeça parcialmente sem queixo encostar ou com sustentação breve.' },
      { score: 0, description: 'Incapaz de levantar a cabeça do colchonete.' }
    ]
  },
  {
    number: 18,
    title: 'Ficando de pé',
    initialPosition: 'Sentado em uma cadeira com altura adequada e pés apoiados no chão.',
    finalPosition: 'Em pé com extensão completa de quadril e joelhos.',
    instruction: 'O paciente pode utilizar suporte dos membros superiores na cadeira ou nas coxas.',
    patientPrompt: 'Fique de pé a partir da cadeira.',
    options: [
      { score: 2, description: 'Fica de pé sem apoio das mãos na cadeira ou corpo.' },
      { score: 1, description: 'Fica de pé utilizando apoio das mãos na cadeira ou empurrando as pernas.' },
      { score: 0, description: 'Incapaz de levantar-se.' }
    ]
  },
  {
    number: 19,
    title: 'Ficando de pé sem suporte',
    initialPosition: 'Em pé livre no chão.',
    finalPosition: 'Manutenção da postura ortostática independente por 3 segundos.',
    instruction: 'Observar a estabilidade bípede sem tocar objetos ou o examinador.',
    patientPrompt: 'Fique em pé paradinho sem se apoiar em nada por 3 segundos.',
    timerSeconds: 3,
    options: [
      { score: 2, description: 'Permanece em pé sem nenhum apoio por pelo menos 3 segundos.' },
      { score: 1, description: 'Permanece em pé com apoio externo leve ou oscilação acentuada.' },
      { score: 0, description: 'Incapaz de manter-se em pé sem suporte substancial.' }
    ]
  },
  {
    number: 20,
    title: 'Caminhando',
    initialPosition: 'Em pé.',
    finalPosition: 'Marcha independente por pelo menos 4 passos consecutivos.',
    instruction: 'Avaliar a coordenação, simetria e independência da marcha.',
    patientPrompt: 'Caminhe para a frente dando pelo menos quatro passos.',
    options: [
      { score: 2, description: 'Caminha de forma autônoma sem órteses ou apoio por mais de 4 passos.' },
      { score: 1, description: 'Caminha com auxílio de órteses, andador ou suporte unilateral de um examinador.' },
      { score: 0, description: 'Incapaz de caminhar.' }
    ]
  },
  {
    number: 21,
    title: 'Flexão do quadril direito em decúbito dorsal',
    initialPosition: 'Decúbito dorsal com membros inferiores estendidos.',
    finalPosition: 'Quadril e joelho direitos flexionados em direção ao abdômen.',
    instruction: 'Avaliar amplitude e força do flexor de quadril direito sem impulso externo.',
    patientPrompt: 'Dobre a sua perna direita trazendo o joelho em direção à sua barriga.',
    options: [
      { score: 2, description: 'Flexiona o quadril direito completamente contra a gravidade (>90°).' },
      { score: 1, description: 'Flexiona parcialmente o quadril direito ou arrastando o calcanhar.' },
      { score: 0, description: 'Incapaz de flexionar o quadril direito.' }
    ]
  },
  {
    number: 22,
    title: 'Flexão do quadril esquerdo em decúbito dorsal',
    initialPosition: 'Decúbito dorsal com membros inferiores estendidos.',
    finalPosition: 'Quadril e joelho esquerdos flexionados em direção ao abdômen.',
    instruction: 'Avaliar amplitude e força do flexor de quadril esquerdo sem impulso externo.',
    patientPrompt: 'Dobre a sua perna esquerda trazendo o joelho em direção à sua barriga.',
    options: [
      { score: 2, description: 'Flexiona o quadril esquerdo completamente contra a gravidade (>90°).' },
      { score: 1, description: 'Flexiona parcialmente o quadril esquerdo ou arrastando o calcanhar.' },
      { score: 0, description: 'Incapaz de flexionar o quadril esquerdo.' }
    ]
  },
  {
    number: 23,
    title: 'Ajoelhado alto a meio ajoelhado - direita',
    initialPosition: 'Ajoelhado ereto sobre ambos os joelhos com tronco alinhado.',
    finalPosition: 'Posição meio ajoelhada avançando o pé direito à frente com apoio plantar.',
    instruction: 'Observar o equilíbrio pélvico e a dissociação de membros inferiores conduzindo com o membro direito.',
    patientPrompt: 'Fique de joelhos e coloque o pé direito na frente no chão.',
    options: [
      { score: 2, description: 'Avança a perna direita para meio ajoelhado sem apoio das mãos.' },
      { score: 1, description: 'Atinge a posição com apoio das mãos no chão ou na coxa.' },
      { score: 0, description: 'Incapaz de realizar a transição para meio ajoelhado à direita.' }
    ]
  },
  {
    number: 24,
    title: 'Ajoelhado alto a meio ajoelhado - esquerda',
    initialPosition: 'Ajoelhado ereto sobre ambos os joelhos com tronco alinhado.',
    finalPosition: 'Posição meio ajoelhada avançando o pé esquerdo à frente com apoio plantar.',
    instruction: 'Observar o equilíbrio pélvico e a dissociação de membros inferiores conduzindo com o membro esquerdo.',
    patientPrompt: 'Fique de joelhos e coloque o pé esquerdo na frente no chão.',
    options: [
      { score: 2, description: 'Avança a perna esquerda para meio ajoelhado sem apoio das mãos.' },
      { score: 1, description: 'Atinge a posição com apoio das mãos no chão ou na coxa.' },
      { score: 0, description: 'Incapaz de realizar a transição para meio ajoelhado à esquerda.' }
    ]
  },
  {
    number: 25,
    title: 'Ajoelhado alto para em pé (perna esquerda)',
    initialPosition: 'Ajoelhado alto no colchonete.',
    finalPosition: 'Em pé ereto, passando por meio ajoelhado com a perna esquerda à frente.',
    instruction: 'Avaliar a extensão de membros inferiores conduzida pela perna esquerda.',
    patientPrompt: 'Levante-se até ficar em pé colocando primeiro a perna esquerda na frente.',
    options: [
      { score: 2, description: 'Fica de pé conduzindo com a perna esquerda sem apoio dos braços.' },
      { score: 1, description: 'Fica de pé com apoio das mãos nas pernas ou móvel próximo.' },
      { score: 0, description: 'Incapaz de levantar-se a partir de ajoelhado.' }
    ]
  },
  {
    number: 26,
    title: 'Ajoelhado alto para em pé (perna direita)',
    initialPosition: 'Ajoelhado alto no colchonete.',
    finalPosition: 'Em pé ereto, passando por meio ajoelhado com a perna direita à frente.',
    instruction: 'Avaliar a extensão de membros inferiores conduzida pela perna direita.',
    patientPrompt: 'Levante-se até ficar em pé colocando primeiro a perna direita na frente.',
    options: [
      { score: 2, description: 'Fica de pé conduzindo com a perna direita sem apoio dos braços.' },
      { score: 1, description: 'Fica de pé com apoio das mãos nas pernas ou móvel próximo.' },
      { score: 0, description: 'Incapaz de levantar-se a partir de ajoelhado.' }
    ]
  },
  {
    number: 27,
    title: 'De pé para sentar no chão',
    initialPosition: 'Em pé no colchonete.',
    finalPosition: 'Sentado no chão de maneira controlada.',
    instruction: 'Observar o controle motor excêntrico durante a descida ao solo.',
    patientPrompt: 'Sente-se no chão devagar e com controle.',
    options: [
      { score: 2, description: 'Senta-se no chão suavemente sem usar as mãos para amortecer o impacto.' },
      { score: 1, description: 'Senta-se usando apoio das mãos no chão/corpo ou desce com impacto.' },
      { score: 0, description: 'Cai no chão sem controle na descida.' }
    ]
  },
  {
    number: 28,
    title: 'Agachamento',
    initialPosition: 'Em pé com pés paralelos na largura dos ombros.',
    finalPosition: 'Agacha com flexão de quadris e joelhos e retorna à posição em pé.',
    instruction: 'Observar a descida até pelo menos 90° de flexão de joelho e retorno à extensão completa.',
    patientPrompt: 'Faça um agachamento dobrando os joelhos e volte a ficar em pé.',
    options: [
      { score: 2, description: 'Realiza agachamento completo e retorna sem apoio das mãos.' },
      { score: 1, description: 'Realiza agachamento parcial ou com auxílio das mãos nas coxas.' },
      { score: 0, description: 'Incapaz de agachar e levantar.' }
    ]
  },
  {
    number: 29,
    title: 'Saltar 30 cm à frente',
    initialPosition: 'Em pé atrás de uma linha demarcada no chão.',
    finalPosition: 'Aterrissagem com ambos os pés após salto para frente de no mínimo 30 cm.',
    instruction: 'Avaliar a impulsão bípede e controle na aterrissagem.',
    patientPrompt: 'Pule para a frente com os dois pés juntos ultrapassando a marca de 30 cm.',
    options: [
      { score: 2, description: 'Salta com ambos os pés simultâneos ultrapassando 30 cm e aterrissa com controle.' },
      { score: 1, description: 'Salta menos de 30 cm, com saída assincrônica dos pés ou desequilíbrio na aterrissagem.' },
      { score: 0, description: 'Incapaz de saltar tirando os dois pés do chão.' }
    ]
  },
  {
    number: 30,
    title: 'Subir quatro degraus com auxílio do corrimão',
    initialPosition: 'Na base de uma escada padrão de quatro degraus.',
    finalPosition: 'No topo do quarto degrau.',
    instruction: 'Permitido segurar no corrimão. Observar padrão alternado ou passo a passo.',
    patientPrompt: 'Suba os quatro degraus da escada segurando no corrimão.',
    options: [
      { score: 2, description: 'Sobe quatro degraus com padrão recíproco alternado usando corrimão.' },
      { score: 1, description: 'Sobe quatro degraus passo a passo (dois pés no mesmo degrau) usando corrimão.' },
      { score: 0, description: 'Incapaz de subir os quatro degraus mesmo com corrimão.' }
    ]
  },
  {
    number: 31,
    title: 'Descer quatro degraus com auxílio do corrimão',
    initialPosition: 'No topo de uma escada padrão de quatro degraus.',
    finalPosition: 'Na base da escada.',
    instruction: 'Permitido segurar no corrimão. Observar o controle na descida.',
    patientPrompt: 'Desça os quatro degraus da escada segurando no corrimão.',
    options: [
      { score: 2, description: 'Desce quatro degraus de forma alternada com apoio do corrimão.' },
      { score: 1, description: 'Desce quatro degraus passo a passo com apoio do corrimão.' },
      { score: 0, description: 'Incapaz de descer quatro degraus.' }
    ]
  },
  {
    number: 32,
    title: 'Subir quatro degraus sem auxílio do corrimão',
    initialPosition: 'Na base da escada de quatro degraus.',
    finalPosition: 'No topo do quarto degrau sem tocar paredes ou corrimão.',
    instruction: 'Avaliar a força e estabilidade dinâmica em membros inferiores sem nenhum apoio manual.',
    patientPrompt: 'Suba os quatro degraus sem segurar no corrimão.',
    options: [
      { score: 2, description: 'Sobe quatro degraus de forma alternada sem segurar em nada.' },
      { score: 1, description: 'Sobe quatro degraus passo a passo sem corrimão.' },
      { score: 0, description: 'Incapaz de subir sem apoio manual.' }
    ]
  },
  {
    number: 33,
    title: 'Descer quatro degraus sem auxílio do corrimão',
    initialPosition: 'No topo da escada de quatro degraus.',
    finalPosition: 'Na base da escada sem tocar paredes ou corrimão.',
    instruction: 'Avaliar o controle excêntrico de quadríceps e equilíbrio na descida livre de escada.',
    patientPrompt: 'Desça os quatro degraus sem segurar em nada.',
    options: [
      { score: 2, description: 'Desce quatro degraus de forma alternada sem segurar em nada.' },
      { score: 1, description: 'Desce quatro degraus passo a passo sem apoio manual.' },
      { score: 0, description: 'Incapaz de descer sem apoio manual.' }
    ]
  }
];
