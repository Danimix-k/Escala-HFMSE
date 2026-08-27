# Escala HFMSE

Aplicação web responsiva para conduzir a **Escala Motora Funcional de Hammersmith Expandida (HFMSE)** em pacientes com Atrofia Muscular Espinhal (AME). O instrumento deve ser utilizado somente por profissional capacitado.

## O que o aplicativo oferece

- Avaliação guiada dos 33 itens da HFMSE, com pontuação de 0 a 66.
- Rascunho e histórico de avaliações no próprio dispositivo.
- Relatório visual para impressão.
- Uso sem conta, sem backend e sem envio de dados clínicos à nuvem.
- Histórico local protegido por senha com AES-256-GCM.

## Privacidade e armazenamento

O aplicativo solicita apenas iniciais do paciente e data do atendimento. Rascunhos, respostas e histórico são cifrados no navegador com uma senha local definida pelo profissional. A senha deve ter ao menos quatro caracteres; para dados clínicos reais, prefira uma senha maior.

- A senha não é salva nem transmitida.
- O cofre é bloqueado após 15 minutos sem interação e sempre que a página é recarregada.
- Ao usar uma versão anterior do app, os registros existentes são migrados para o cofre cifrado na primeira configuração de senha.
- Se a senha for esquecida, não há recuperação segura: será necessário apagar os dados locais deste navegador.
- Limpar os dados do navegador também apaga o histórico.

> Este aplicativo não substitui um prontuário eletrônico, controles institucionais de acesso ou uma política de retenção de dados clínicos.

## Desenvolvimento local

Pré-requisito: Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Para gerar uma versão de produção:

```bash
npm run build
```

Os arquivos finais são gerados em `dist/`.

## Publicação no Netlify

O projeto usa `netlify.toml` com o comando `npm run build` e a pasta de publicação `dist`.

```bash
npx netlify deploy --prod
```

Variáveis sensíveis nunca devem ser versionadas. Use o painel do Netlify para configurá-las caso o app passe a utilizar serviços externos.

## Incorporar em outro site

Use a página de incorporação (`embed.html`), que mantém o aplicativo principal protegido contra incorporação direta:

```html
<iframe
  src="https://SEU-SITE.netlify.app/embed.html"
  title="Escala HFMSE"
  width="100%"
  height="900"
  loading="lazy"
  style="border: 0; max-width: 100%;"
  allow="clipboard-write"
></iframe>
```

Alguns navegadores restringem ou particionam o armazenamento local quando o app roda dentro de um `iframe` de outro domínio. Para manter um histórico clínico persistente, prefira abrir o aplicativo em uma aba própria.

## Segurança do repositório

- Gitleaks é executado em pushes e pull requests.
- Dependabot verifica atualizações de dependências semanalmente.
- Arquivos `.env`, certificados e credenciais estão bloqueados no `.gitignore`.
- O deploy define Content Security Policy e cabeçalhos de proteção no Netlify.
