# Histórias de Usuário — Sistema de Aluguel de Carros

LAB02 — DIAW — PUC Minas

As histórias seguem o formato: **Como** \<perfil\>, **quero** \<ação\>, **para** \<objetivo\>.
Cada história traz seus **critérios de aceitação**.

---

## Autenticação e Cadastro

### US01 — Cadastro de usuário
**Como** visitante, **quero** me cadastrar com usuário e senha, **para** poder acessar o sistema.

Critérios de aceitação:
- O cadastro exige usuário (único), senha e perfil (cliente ou agente).
- A senha é armazenada de forma segura (hash).
- Não é possível acessar nenhuma funcionalidade sem cadastro prévio.

### US02 — Login obrigatório
**Como** usuário cadastrado, **quero** autenticar com usuário e senha, **para** usar o sistema de forma segura.

Critérios de aceitação:
- O acesso às funcionalidades é bloqueado para usuários não autenticados.
- Credenciais inválidas retornam mensagem de erro e não concedem acesso.
- Após login, o usuário recebe um token/sessão válido.

---

## Cliente

### US03 — Cadastrar dados do cliente (Create)
**Como** cliente, **quero** registrar meus dados (RG, CPF, Nome, Endereço, profissão, entidades empregadoras e rendimentos), **para** poder solicitar aluguéis.

Critérios de aceitação:
- Campos obrigatórios: RG, CPF, Nome, Endereço.
- É possível registrar no máximo 3 entidades empregadoras, cada uma com seu rendimento.
- CPF deve ser único no sistema.

### US04 — Consultar dados do cliente (Read)
**Como** cliente, **quero** consultar meus dados cadastrados, **para** conferir se estão corretos.

Critérios de aceitação:
- O cliente visualiza todos os seus dados e suas entidades empregadoras.

### US05 — Atualizar dados do cliente (Update)
**Como** cliente, **quero** modificar meus dados, **para** mantê-los atualizados.

Critérios de aceitação:
- É possível editar dados de identificação, profissão e rendimentos.
- Permanece a restrição de no máximo 3 entidades empregadoras.

### US06 — Remover cliente (Delete)
**Como** cliente, **quero** excluir meu cadastro, **para** encerrar meu vínculo com o sistema.

Critérios de aceitação:
- A exclusão só é permitida se não houver pedidos/contratos ativos vinculados.

---

## Pedidos de Aluguel (Cliente)

### US07 — Criar pedido de aluguel
**Como** cliente, **quero** criar um pedido de aluguel de um automóvel, **para** solicitar o serviço.

Critérios de aceitação:
- O pedido referencia um automóvel e é criado com status inicial `CRIADO`.
- O pedido fica vinculado ao cliente autenticado.

### US08 — Modificar pedido de aluguel
**Como** cliente, **quero** modificar um pedido ainda não contratado, **para** ajustar as informações.

Critérios de aceitação:
- Somente pedidos em status `CRIADO` ou `EM_ANALISE` podem ser modificados pelo cliente.

### US09 — Consultar pedidos e visualizar status
**Como** cliente, **quero** consultar meus pedidos e ver o status de cada um, **para** acompanhar o andamento.

Critérios de aceitação:
- A lista mostra status: CRIADO, EM_ANALISE, APROVADO, REPROVADO, CANCELADO, CONTRATADO.

### US10 — Cancelar pedido de aluguel
**Como** cliente, **quero** cancelar um pedido, **para** desistir da solicitação.

Critérios de aceitação:
- Pedidos já `CONTRATADO` não podem ser cancelados diretamente pelo cliente.
- O pedido cancelado passa ao status `CANCELADO`.

---

## Agentes (Empresas e Bancos)

### US11 — Avaliar pedido (análise financeira)
**Como** agente, **quero** avaliar financeiramente um pedido, **para** emitir um parecer.

Critérios de aceitação:
- O agente altera o status para `EM_ANALISE` e registra uma avaliação.
- A avaliação contém parecer (positivo/negativo) e observação.

### US12 — Emitir parecer e encaminhar para contrato
**Como** agente, **quero** emitir parecer positivo, **para** colocar o pedido à consideração para execução do contrato.

Critérios de aceitação:
- Parecer positivo muda o status do pedido para `APROVADO`.
- Parecer negativo muda o status para `REPROVADO`.

### US13 — Modificar pedido
**Como** agente, **quero** modificar um pedido, **para** ajustar condições durante a análise.

Critérios de aceitação:
- Alterações do agente ficam registradas e associadas ao pedido.

### US14 — Conceder contrato de crédito (Banco)
**Como** banco (agente), **quero** associar um contrato de crédito ao aluguel, **para** financiar a operação.

Critérios de aceitação:
- Apenas agentes do tipo BANCO podem conceder crédito.
- O contrato de crédito registra valor financiado, número de parcelas e taxa de juros.

---

## Automóveis

### US15 — Gerenciar automóveis
**Como** agente, **quero** cadastrar e manter automóveis (matrícula, ano, marca, modelo, placa), **para** disponibilizá-los a aluguel.

Critérios de aceitação:
- O automóvel registra o tipo de proprietário (cliente, empresa ou banco) conforme o contrato.
