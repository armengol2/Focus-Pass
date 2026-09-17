# Tecnologias e Arquitetura Inicial

## Objetivo do Produto

O Focus-Pass sera um assistente web para apoiar agencias de viagens no processo de solicitacao de passaporte brasileiro. A proposta inicial e reduzir retrabalho, erros de preenchimento e perda de informacoes antes da etapa oficial no site da Policia Federal.

O produto deve atuar como automacao assistiva: o cliente informa os dados em um fluxo proprio, a agencia revisa, e o sistema ajuda a organizar, validar e preparar as informacoes para uso no site oficial. Qualquer etapa que envolva captcha, confirmacao legal, pagamento, agendamento ou declaracao oficial deve respeitar as regras do servico publico e manter intervencao humana quando necessario.

## Principios Tecnicos

- Segurança e privacidade por padrao, pois o sistema tratara dados pessoais sensiveis.
- Validacao forte antes de qualquer envio ou uso em automacao.
- Rastreabilidade das alteracoes feitas pela agencia.
- Separacao clara entre dados fornecidos pelo cliente, dados revisados pela agencia e dados utilizados no site oficial.
- Interface simples para cliente e painel operacional eficiente para a agencia.
- Evitar automacoes que burlem mecanismos de seguranca do site oficial.

## Stack Recomendada

### Frontend

- Next.js com React e TypeScript.
- Formularios com React Hook Form.
- Validacao de schemas com Zod.
- Componentes acessiveis com Radix UI ou shadcn/ui.
- Estilizacao com Tailwind CSS.
- Mascara de campos para CPF, CEP, datas, telefone e passaporte.

### Backend

- Node.js com TypeScript.
- API em Next.js Route Handlers, NestJS ou Fastify.
- Zod ou biblioteca equivalente para validar payloads tambem no servidor.
- Camada de servicos separada para regras de negocio, validacao e preparacao dos dados.
- Logs estruturados, sem gravar dados sensiveis em texto aberto.

### Banco de Dados

- PostgreSQL como banco principal.
- Prisma ORM para modelagem, migrations e acesso aos dados.
- Campos de auditoria: criado em, atualizado em, usuario responsavel e status do processo.
- Criptografia para informacoes sensiveis quando aplicavel.

### Autenticacao e Permissoes

- Login para funcionarios da agencia.
- Area do cliente acessada por link seguro, token temporario ou conta propria.
- Controle de permissoes por perfil: cliente, atendente, administrador.
- Expiracao de links e sessoes para reduzir risco de acesso indevido.

### Automacao Assistiva

- Playwright pode ser usado para automacao controlada e revisavel do navegador.
- A automacao deve preencher campos com base em dados previamente validados.
- A agencia deve poder revisar os dados antes de cada acao critica.
- O sistema nao deve tentar contornar captcha, fila, bloqueio, termos de uso ou controles antifraude.
- A automacao deve registrar status, etapa atual e eventuais erros sem armazenar credenciais desnecessarias.

### Integracoes Futuras

- Consulta de CEP para preencher endereco.
- Lista oficial ou mantida de paises, estados e municipios.
- Envio de notificacoes por email ou WhatsApp, se a agencia desejar.
- Armazenamento seguro de documentos anexados, se o produto evoluir para isso.
- Painel de status por cliente e por etapa do processo.

## Modelo Inicial de Modulos

- `client-form`: formulario publico ou autenticado para coleta de dados.
- `agency-dashboard`: painel interno para acompanhamento e revisao.
- `validation-core`: regras de validacao compartilhadas entre frontend e backend.
- `passport-request`: entidade principal do pedido de passaporte.
- `automation-assistant`: modulo responsavel por preparar e executar etapas assistidas.
- `audit-log`: historico de alteracoes, revisoes e acoes relevantes.

## Cuidados com LGPD

- Coletar apenas os dados necessarios para o processo.
- Exibir consentimento claro sobre uso e armazenamento das informacoes.
- Permitir exclusao ou anonimização quando o processo for encerrado, conforme politica da agencia.
- Restringir acesso interno aos dados.
- Evitar logs com CPF, filiacao, documentos, telefone, email ou endereco completo.
- Definir politica de retencao dos dados.

## Roadmap Sugerido

1. Documentar o fluxo real do processo de passaporte.
2. Criar schemas de dados e validacoes.
3. Construir formulario do cliente com salvamento parcial.
4. Criar painel interno de revisao da agencia.
5. Implementar geracao de resumo revisavel.
6. Avaliar automacao assistiva com Playwright em ambiente controlado.
7. Adicionar auditoria, permissoes e politicas de retencao.

