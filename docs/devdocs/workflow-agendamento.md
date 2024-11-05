# 🗓️ Workflow de Agendamento | Codaqui

## 📋 Sumário
- [📚 Introdução](#-introdução)
- [🔧 Requisitos](#-requisitos)
- [⚙️ Estrutura do Projeto](#%EF%B8%8F-estrutura-do-projeto)
- [🚀 Como Funciona](#-como-funciona)
    - [1️⃣ Criação do Evento](#1️⃣-criação-do-evento)
    - [2️⃣ Atualização da Planilha](#2️⃣-atualização-da-planilha)
- [🛠️ Manutenção](#%EF%B8%8F-manutenção)
- [🐛 Troubleshooting](#-troubleshooting)

## 📚 Introdução
Este documento descreve o fluxo de agendamento que integra o Google Agenda com uma planilha do Google Sheets via Apps Script. O objetivo é automatizar o processo de registro de eventos de mentoria, garantindo que todos os agendamentos sejam salvos e atualizados de forma eficiente.

## 🔧 Requisitos
Antes de começar, certifique-se de que você tem acesso aos seguintes itens:
- ✅ **Conta Google** com permissão para acessar o Google Agenda e a planilha no namespace da codaqui.
- ✅ **Google Apps Script** configurado com permissões adequadas (leitura e escrita).
- ✅ **Planilha do Google** preparada para receber e armazenar os dados de agendamento.
- ✅ **Google AppSheet** preparado para apresentar e editar os dados de agendamento, mentorado e mentoria.

## ⚙️ Estrutura do Projeto
O projeto é dividido em dois componentes principais:
1. **Google Agenda:** Onde os eventos de mentoria são criados e gerenciados.
2. **Google Sheets:** Planilha que armazena os dados dos agendamentos para rastreamento e análise.

## 🚀 Como Funciona

### 1️⃣ Criação do Evento
Por meio do [link de mentorias](https://www.codaqui.dev/quero/mentoria) qualquer pessoa pode solicitar um agendamento com os mentores disponíveis. 
Ao solicitar o agendamento é necessário, além do dia e horário, preencher dados como **Nome**, **E-mail**, **Telefone**, **Idade** e **Cidade**.

Quando um evento é agendado:
- Um **Google Apps Script** é acionado automaticamente através do trigger
- O script extrai informações relevantes do evento como:
  - Nome do agendamento
  - Data do agendamento
  - Nome do mentor (Dono da agenda)
  - Nome do mentorado (Guest)
  - E-mail
  - Telefone
  - Idade
  - Cidade/UF
- As informações são formatadas para serem compatíveis com a planilha.

### 2️⃣ Atualização da Planilha
Depois que os dados são extraídos:
- O script acessa a **Google Sheets** e insere uma nova linha com as informações do evento.
- Se o evento for atualizado ou cancelado (wip), a linha correspondente na planilha também é atualizada.

### 3️⃣ Preenchimento dos dados da mentoria
Por meio do [AppSheet](https://www.appsheet.com/start/5f848f70-92e3-49d9-9e7c-838acd3e7b99) o mentor tem acesso aos dados de seus mentorados e de suas mentorias, podendo:
 - Ver e atualizar dados cadastrais de seus mentorados
 - Ver e atualizar seus agendamentos de mentoria, podendo marcar seu status como Realizado ou Cancelado
 - Escrever anotações a respeito da mentoria realizada

## 🛠️ Manutenção
Para garantir que o fluxo funcione corretamente:
- Verifique regularmente as **credenciais e permissões** no Google Apps Script.
- Revise o código para garantir compatibilidade com atualizações futuras das libs.
- **Documente qualquer mudança** significativa no fluxo para ajudar futuras manutenções, seja alterando ou criando algum workflow.

## 🐛 Troubleshooting
Caso ocorra algum problema:
- **Erro na criação de eventos:** >> Verifique se o Apps Script tem permissão para acessar a Google Agenda.
- **Dados não aparecem na planilha:** >> Confirme se o id da planilha está correto no script.
- **Eventos não atualizam corretamente:** Revise a lógica de atualização no script.
- **Dados não aparecem no AppSheet:** Revise o usuário utilizado para abrir o AppSheet, pois as informações apresentadas são filtradas pelo e-mail do usuário logado como mentor dos agendamentos e mentorias.
