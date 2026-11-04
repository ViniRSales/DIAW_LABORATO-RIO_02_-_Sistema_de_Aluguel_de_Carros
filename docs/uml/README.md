# Modelagem UML — Sistema de Aluguel de Carros

Esta pasta contém a modelagem do sistema (LAB02 — DIAW — PUC Minas).

## Artefatos

| Arquivo | Artefato |
|---|---|
| `01-casos-de-uso.puml` | Diagrama de Casos de Uso |
| `02-historias-de-usuario.md` | Histórias de Usuário |
| `03-diagrama-de-classes.puml` | Diagrama de Classes (modelo de domínio) |
| `04-diagrama-de-pacotes.puml` | Diagrama de Pacotes (Visão Lógica) |

Os diagramas estão em **PlantUML** (`.puml`), formato textual versionável no Git.

## Como visualizar os diagramas

Opções:

1. **VS Code**: instale a extensão *PlantUML* (jebbs.plantuml) e use `Alt+D` para pré-visualizar.
2. **Web**: cole o conteúdo do arquivo em <https://www.plantuml.com/plantuml>.
3. **CLI** (requer Java + plantuml.jar):
   ```bash
   java -jar plantuml.jar docs/uml/*.puml
   ```

## Versionamento dos modelos

Conforme a especificação do laboratório, todas as versões dos modelos produzidas ao
longo do desenvolvimento são mantidas no histórico do repositório, sendo revisadas de
acordo com o feedback em aula.
