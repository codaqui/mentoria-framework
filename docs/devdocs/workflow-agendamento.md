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

## ⚙️ Estrutura do Projeto
O projeto é dividido em dois componentes principais:
1. **Google Agenda:** Onde os eventos de mentoria são criados e gerenciados.
2. **Google Sheets:** Planilha que armazena os dados dos agendamentos para rastreamento e análise.

## 🚀 Como Funciona

### 1️⃣ Criação do Evento
Quando um evento é agendado na Google Agenda:
- Um **Google Apps Script** é acionado automaticamente através do trigger
- O script extrai informações relevantes do evento, como (wip)
- As informações são formatadas para serem compatíveis com a planilha.

### 2️⃣ Atualização da Planilha
Depois que os dados são extraídos:
- O script acessa a **Google Sheets** e insere uma nova linha com as informações do evento.
- Se o evento for atualizado ou cancelado, a linha correspondente na planilha também é atualizada.

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
