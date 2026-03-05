# Deploy no Google Cloud Platform (GCP)

Este documento descreve como fazer deploy dos projetos **Store** e **Bigo** no Google Cloud Platform usando Cloud Run.

## 📋 Pré-requisitos

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) instalado e configurado
- [Docker](https://docs.docker.com/get-docker/) instalado
- Acesso ao projeto GCP configurado
- Permissões para Cloud Run e Container Registry

## 🚀 Deploy Automatizado

### Store Frontend

Para fazer deploy do projeto Store:

```bash
# Executar script de deploy
./scripts/deploy-store.sh
```

**Configurações do deploy:**

- **Serviço:** `store-frontend`
- **Porta:** 3000
- **Região:** us-central1
- **Memória:** 512Mi
- **CPU:** 1
- **Máximo de instâncias:** 10
- **Acesso:** Público (--allow-unauthenticated)

### Bigo Frontend

Para fazer deploy do projeto Bigo:

```bash
# Executar script de deploy
./scripts/deploy-bigo.sh
```

**Configurações do deploy:**

- **Serviço:** `bigo-frontend`
- **Porta:** 3001
- **Região:** us-central1
- **Memória:** 512Mi
- **CPU:** 1
- **Máximo de instâncias:** 10
- **Acesso:** Público (--allow-unauthenticated)

## 🔧 Configurações Específicas

### Next.js Standalone Mode

Ambos os projetos estão configurados com `output: "standalone"` no `next.config.js` para otimizar o deploy no Cloud Run.

### Configuração de API

Os projetos estão configurados para usar a API de produção:

- **URL da API:** `https://recharge-api-241805104636.us-central1.run.app`
- **Store ID (Store):** `7f563e66-1fd8-4906-b4aa-7c3dd1b9f4a0`
- **Store ID (Bigo):** `b7016ab1-88ab-4dde-b103-e1d3b6ccc53c`

### CDN Configuration

Os projetos utilizam CDN do Google Cloud Storage:

- **Base URL:** `https://storage.googleapis.com/frontend-cdn-assets`
- **Store images:** `/store`
- **Bigo images:** `/bigo`

## 🐳 Docker Configuration

### Estrutura dos Dockerfiles

Os Dockerfiles seguem uma estrutura multi-stage para otimização:

1. **Stage deps:** Instala dependências
2. **Stage builder:** Compila a aplicação
3. **Stage runner:** Imagem de produção otimizada

### .dockerignore

Cada projeto possui seu próprio `.dockerignore` que:

- Ignora outros projetos do monorepo
- Exclui arquivos de desenvolvimento
- Remove artefatos de build desnecessários

## 📦 Build Process

O processo de build inclui:

1. **Instalação de dependências** usando yarn workspaces
2. **Build da aplicação** com `yarn workspace @4miga/[project] build`
3. **Criação da imagem Docker** otimizada para produção
4. **Push para Google Container Registry**
5. **Deploy no Cloud Run**

## 🔍 Verificação do Deploy

Após o deploy, você pode verificar o status:

```bash
# Verificar serviço Store
gcloud run services describe store-frontend --region us-central1

# Verificar serviço Bigo
gcloud run services describe bigo-frontend --region us-central1
```

## 🌐 URLs dos Serviços

Os serviços ficam disponíveis em:

- **Store:** `https://store-frontend-[hash]-uc.a.run.app`
- **Bigo:** `https://bigo-frontend-[hash]-uc.a.run.app`

## ⚠️ Troubleshooting

### Problemas Comuns

1. **Erro de autenticação:** Verifique se está logado no gcloud
2. **Erro de permissões:** Confirme se tem acesso ao projeto GCP
3. **Erro de build:** Verifique se todas as dependências estão corretas
4. **Erro de push:** Confirme se o Container Registry está habilitado

### Logs

Para verificar logs dos serviços:

```bash
# Logs do Store
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=store-frontend" --limit 50

# Logs do Bigo
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=bigo-frontend" --limit 50
```

## 🔄 Atualizações

Para atualizar um serviço, simplesmente execute novamente o script de deploy correspondente. O Cloud Run fará o rolling update automaticamente.

---

**Nota:** Esta documentação é específica para deploy no GCP Cloud Run. Para outros ambientes, consulte a documentação correspondente.
