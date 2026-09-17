# Entradas Processadas

Este documento descreve o contrato inicial de dados que o Focus-Pass deve coletar, validar e preparar para o fluxo de solicitacao de passaporte brasileiro.

As regras abaixo representam o mapeamento inicial informado pelo fluxo real ja conhecido. Elas ainda devem ser refinadas quando o produto tiver telas, schemas e validacoes implementadas.

## Padroes Gerais

- Textos devem aceitar caracteres com e sem acento.
- Datas devem usar o formato `dd/mm/aaaa`.
- Opcoes fechadas devem ser implementadas como listas controladas.
- Campos de UF devem usar siglas dos estados brasileiros.
- Campos de cidade devem depender da UF selecionada.
- Dados sensiveis devem ser tratados com cuidado e nao devem aparecer em logs.
- Sempre que possivel, armazenar valores normalizados alem do texto exibido ao usuario.

## Pagina 1 - Informacoes Pessoais

| Campo | Tipo | Validacao inicial | Observacoes |
| --- | --- | --- | --- |
| Nome completo | Texto | Aceitar letras, espacos, acentos e caracteres usuais de nome | Campo principal de identificacao do requerente |
| Sexo | Opcao | Masculino, feminino ou nao especificado | Lista fechada |
| Filiacao 1 | Texto | Aceitar letras, espacos, acentos e caracteres usuais de nome | Nome da primeira filiacao |
| Sexo da filiacao 1 | Opcao | Masculino, feminino ou nao especificado | Lista fechada |
| Filiacao 2 | Texto | Aceitar letras, espacos, acentos e caracteres usuais de nome | Nome da segunda filiacao |
| Sexo da filiacao 2 | Opcao | Masculino, feminino ou nao especificado | Lista fechada |
| Data de nascimento | Data | `dd/mm/aaaa` | Validar data real |
| Raca | Opcao | Amarela, branca, parda, indigena, preta ou outras | Lista fechada |
| Nacionalidade | Opcao | Grande lista de paises | Recomendada fonte padronizada |
| UF de nascimento | Opcao | Sigla de estado brasileiro | Usar lista de UFs |
| Cidade de nascimento | Opcao | Cidade dependente da UF | Carregar conforme UF selecionada |
| Nome anterior | Texto | Aceitar letras, espacos, acentos e caracteres usuais de nome | Campo condicional quando houve mudanca de nome |
| Motivo da mudanca | Opcao | Mudanca por estado civil, decisao judicial ou outros motivos | Campo condicional ao nome anterior |

## Pagina 2 - Documentacao

### Documento RG ou CPF

| Campo | Tipo | Validacao inicial | Observacoes |
| --- | --- | --- | --- |
| Numero | Numero/texto numerico | Ate 12 digitos | Manter como texto para preservar zeros a esquerda |
| Data de emissao | Data | `dd/mm/aaaa` | Validar data real |
| Orgao emissor | Texto | Aceitar letras, espacos, acentos e siglas | Exemplo: SSP, DETRAN, instituto de identificacao |
| UF de expedicao | Opcao | Sigla de estado brasileiro | Usar lista de UFs |

### CPF

| Campo | Tipo | Validacao inicial | Observacoes |
| --- | --- | --- | --- |
| CPF | Texto numerico | Ate 12 digitos conforme mapeamento inicial | Refinar para validacao oficial de CPF com 11 digitos |
| CPF do responsavel | Texto numerico | Ate 12 digitos conforme mapeamento inicial | Campo condicional, provavelmente para menor de idade ou caso especifico |

### Certidao de Nascimento

| Campo | Tipo | Validacao inicial | Observacoes |
| --- | --- | --- | --- |
| Matricula da certidao de nascimento | Texto numerico | 32 digitos | Manter como texto |
| Cartorio | Texto | Aceitar letras, espacos, acentos e caracteres usuais | Nome do cartorio |
| UF do cartorio | Opcao | Sigla de estado brasileiro | Usar lista de UFs |
| Cidade do cartorio | Opcao | Cidade dependente da UF | Carregar conforme UF selecionada |

### Passaporte Anterior

| Campo | Tipo | Validacao inicial | Observacoes |
| --- | --- | --- | --- |
| Situacao do passaporte anterior | Opcao | Nunca teve, passaporte anterior valido ou vencido | Define se serie e numero serao exigidos |
| Serie | Texto | 2 letras | Campo condicional |
| Numero | Texto numerico | 6 numeros | Campo condicional |

## Pagina 3 - Dados Complementares

### Profissao

| Campo | Tipo | Validacao inicial | Observacoes |
| --- | --- | --- | --- |
| Profissao | Opcao/valor fixo | Preencher obrigatoriamente como `outras ocupacoes nao especificadas anteriormente` | Valor padrao do fluxo atual |
| Outra profissao | Texto | Aceitar letras, espacos, acentos e caracteres usuais | Descricao manual da profissao |
| Email | Email | Formato padrao de email | Normalizar para minusculas quando apropriado |
| Confirmacao do email | Email | Deve ser igual ao email | Validacao cruzada |

### Endereco do Requerente

| Campo | Tipo | Validacao inicial | Observacoes |
| --- | --- | --- | --- |
| Pais | Opcao | Lista de paises | Brasil como provavel padrao, se fizer sentido operacional |
| CEP | Texto numerico | 8 digitos | Manter como texto e aplicar mascara |
| UF | Opcao | Sigla de estado brasileiro | Usar lista de UFs |
| Cidade | Opcao | Cidade dependente da UF | Carregar conforme UF selecionada |
| Logradouro | Texto | Aceitar letras, numeros, espacos, acentos e caracteres usuais de endereco | Rua, avenida, travessa etc. |
| Distrito/bairro | Texto | Aceitar letras, numeros, espacos, acentos e caracteres usuais | Bairro ou distrito |
| DDD | Texto numerico | 2 digitos | Validar como texto |
| Telefone | Texto numerico | 9 digitos | Numero principal do requerente |

## Entidades Iniciais Sugeridas

### Requerente

- Nome completo
- Sexo
- Filiacoes
- Data de nascimento
- Raca
- Nacionalidade
- Naturalidade
- Nome anterior e motivo de mudanca

### Documentacao

- Documento RG ou CPF
- CPF
- CPF do responsavel
- Certidao de nascimento
- Passaporte anterior

### Contato e Endereco

- Email
- Telefone
- Pais
- CEP
- UF
- Cidade
- Logradouro
- Bairro ou distrito

### Processo de Passaporte

- Status do preenchimento
- Etapa atual
- Responsavel interno
- Dados revisados
- Data de criacao
- Data da ultima atualizacao

## Pendencias para Refinamento

- Definir quais campos sao obrigatorios em todos os casos.
- Definir regras condicionais para menores de idade.
- Definir quando CPF do responsavel deve aparecer.
- Definir se documento RG e certidao serao alternativos ou complementares.
- Confirmar se nome anterior e motivo de mudanca aparecem apenas quando houve alteracao de nome.
- Definir fonte das listas de paises, UFs e municipios.
- Criar schemas compartilhados para frontend e backend.

