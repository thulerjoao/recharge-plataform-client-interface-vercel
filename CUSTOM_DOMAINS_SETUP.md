# Configuração de Domínios Próprios - Arquitetura Híbrida

Este documento descreve como configurar domínios próprios para aplicações Cloud Run usando uma arquitetura híbrida com isolamento completo por frontend.

## 🏗️ Arquitetura Implementada

### **Estrutura Final:**

- **API (Recharge):** `http://34.54.92.191/api` → Porta 80
- **Bigo Frontend:** `https://4miga.games` e `https://www.4miga.games` → IP: 34.120.7.164

### **Vantagens da Arquitetura:**

- ✅ Isolamento completo por frontend
- ✅ Certificados SSL independentes
- ✅ Fácil adicionar novos frontends
- ✅ Troubleshooting independente
- ✅ Escalabilidade

## 📋 Pré-requisitos

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) instalado e configurado
- Acesso ao projeto GCP configurado
- Permissões para Cloud Run, Load Balancer e SSL
- Domínio registrado (ex: `4miga.games`)
- Backend services já configurados

## 🚀 Passos de Implementação

### **Passo 1: Reservar IP Estático para o Frontend**

```bash
# Criar IP estático para o novo frontend
gcloud compute addresses create [FRONTEND_NAME]-frontend-ip --global

# Exemplo para Bigo:
gcloud compute addresses create bigo-frontend-ip --global
```

### **Passo 2: Criar URL Map Independente**

```bash
# Criar URL Map específico para o frontend
gcloud compute url-maps create lb-[FRONTEND_NAME]-url-map \
  --default-service=[FRONTEND_NAME]-backend \
  --global

# Exemplo para Bigo:
gcloud compute url-maps create lb-bigo-url-map \
  --default-service=bigo-backend \
  --global
```

### **Passo 3: Configurar Domínios no URL Map**

```bash
# Editar o URL Map para adicionar os domínios
gcloud compute url-maps edit lb-[FRONTEND_NAME]-url-map --global
```

**No editor, adicionar:**

```yaml
defaultService: https://www.googleapis.com/compute/v1/projects/[PROJECT_ID]/global/backendServices/[FRONTEND_NAME]-backend
hostRules:
  - hosts:
      - [DOMAIN_1]
      - [DOMAIN_2] # se houver subdomínio www
    pathMatcher: default-matcher
pathMatchers:
  - defaultService: https://www.googleapis.com/compute/v1/projects/[PROJECT_ID]/global/backendServices/[FRONTEND_NAME]-backend
    name: default-matcher
```

**Exemplo para Bigo:**

```yaml
defaultService: https://www.googleapis.com/compute/v1/projects/pure-sunlight-468021-r1/global/backendServices/bigo-backend
hostRules:
  - hosts:
      - 4miga.games
      - www.4miga.games
    pathMatcher: default-matcher
pathMatchers:
  - defaultService: https://www.googleapis.com/compute/v1/projects/pure-sunlight-468021-r1/global/backendServices/bigo-backend
    name: default-matcher
```

### **Passo 4: Criar Certificado SSL Independente**

```bash
# Criar certificado SSL específico para o frontend
gcloud compute ssl-certificates create [FRONTEND_NAME]-ssl-cert \
  --domains=[DOMAIN_1],[DOMAIN_2] \
  --global

# Exemplo para Bigo:
gcloud compute ssl-certificates create bigo-ssl-cert \
  --domains=4miga.games,www.4miga.games \
  --global
```

### **Passo 5: Criar Target HTTPS Proxy**

```bash
# Criar target HTTPS proxy específico
gcloud compute target-https-proxies create lb-[FRONTEND_NAME]-https-proxy \
  --url-map=lb-[FRONTEND_NAME]-url-map \
  --ssl-certificates=[FRONTEND_NAME]-ssl-cert \
  --global

# Exemplo para Bigo:
gcloud compute target-https-proxies create lb-bigo-https-proxy \
  --url-map=lb-bigo-url-map \
  --ssl-certificates=bigo-ssl-cert \
  --global
```

### **Passo 6: Criar Forwarding Rule HTTPS**

```bash
# Criar forwarding rule HTTPS
gcloud compute forwarding-rules create lb-[FRONTEND_NAME]-https-frontend \
  --address=[FRONTEND_NAME]-frontend-ip \
  --target-https-proxy=lb-[FRONTEND_NAME]-https-proxy \
  --global \
  --ports=443

# Exemplo para Bigo:
gcloud compute forwarding-rules create lb-bigo-https-frontend \
  --address=bigo-frontend-ip \
  --target-https-proxy=lb-bigo-https-proxy \
  --global \
  --ports=443
```

### **Passo 6b: HTTP (porta 80) → Redirect no Load Balancer**

Configure o redirect de HTTP para HTTPS diretamente no Load Balancer, evitando depender do app.

```bash
# Criar URL Map exclusivo para HTTP do frontend
gcloud compute url-maps create lb-[FRONTEND_NAME]-http-url-map \
  --default-service=[FRONTEND_NAME]-backend \
  --global

# Editar para habilitar redirect
gcloud compute url-maps edit lb-[FRONTEND_NAME]-http-url-map --global
```

No editor, configure (ajuste domínios):

```yaml
hostRules:
  - hosts:
      - [DOMAIN_1]
      - [DOMAIN_2] # opcional, ex: www
    pathMatcher: http-redirect

pathMatchers:
  - name: http-redirect
    defaultUrlRedirect:
      httpsRedirect: true
      stripQuery: false
      redirectResponseCode: MOVED_PERMANENTLY_DEFAULT
```

Agora aponte o proxy HTTP para este URL Map e crie a forwarding rule na porta 80:

```bash
# Se ainda não existir o proxy HTTP
gcloud compute target-http-proxies create lb-[FRONTEND_NAME]-http-proxy \
  --url-map=lb-[FRONTEND_NAME]-http-url-map \
  --global

# Se já existir, apenas atualize
# gcloud compute target-http-proxies update lb-[FRONTEND_NAME]-http-proxy \
#   --url-map=lb-[FRONTEND_NAME]-http-url-map \
#   --global

# Forwarding rule na porta 80 do IP do frontend
gcloud compute forwarding-rules create lb-[FRONTEND_NAME]-http-frontend \
  --address=[FRONTEND_NAME]-frontend-ip \
  --target-http-proxy=lb-[FRONTEND_NAME]-http-proxy \
  --global \
  --ports=80
```

Exemplo (Bigo):

```bash
gcloud compute url-maps create lb-bigo-http-url-map --default-service=bigo-backend --global
gcloud compute url-maps edit lb-bigo-http-url-map --global
# (colar YAML com hosts 4miga.games e www.4miga.games)

gcloud compute target-http-proxies update lb-bigo-http-proxy \
  --url-map=lb-bigo-http-url-map --global

gcloud compute forwarding-rules create lb-bigo-http-frontend \
  --address=bigo-frontend-ip \
  --target-http-proxy=lb-bigo-http-proxy \
  --global --ports=80
```

Testes esperados (retorno 301/308 para HTTPS):

```bash
curl -I http://[DOMAIN_1]
curl -I http://[DOMAIN_2]
```

Nota: Após ativar o redirect no LB, o redirect do Next.js no `next.config.js` torna-se opcional e pode ser removido para simplificar.

### **Passo 7: Configurar DNS**

No provedor de DNS, adicionar registros A:

**Para domínio principal:**

- **Tipo:** A
- **Nome:** @ (ou deixar em branco)
- **Valor:** [IP_DO_FRONTEND]

**Para subdomínio www:**

- **Tipo:** A
- **Nome:** www
- **Valor:** [IP_DO_FRONTEND]

**Exemplo para Bigo:**

- `4miga.games` → `34.120.7.164`
- `www.4miga.games` → `34.120.7.164`

### **Passo 8: Verificar e Testar**

```bash
# Verificar forwarding rules
gcloud compute forwarding-rules list --global

# Verificar certificados SSL
gcloud compute ssl-certificates list --global

# Testar DNS
dig [DOMAIN]

# Testar aplicação (após certificados ficarem ACTIVE)
curl -I https://[DOMAIN]
```

## 🔧 Ordem de Criação dos Recursos

**IMPORTANTE:** Sempre seguir esta ordem:

1. **IP Estático** → `gcloud compute addresses create`
2. **URL Map** → `gcloud compute url-maps create`
3. **Configurar Domínios** → `gcloud compute url-maps edit`
4. **Certificado SSL** → `gcloud compute ssl-certificates create`
5. **Target HTTPS Proxy** → `gcloud compute target-https-proxies create`
6. **Forwarding Rule** → `gcloud compute forwarding-rules create`
7. **DNS** → Configurar no provedor
8. **Testar** → Verificar funcionamento

## 🌐 URLs Finais

### **Arquitetura Completa:**

- **API:** `http://34.54.92.191/api`
- **Bigo:** `https://4miga.games` e `https://www.4miga.games`

### **Para Novos Frontends:**

- **Novo Frontend:** `https://[DOMAIN]` → IP específico

## ⚠️ Troubleshooting

### **Problemas Comuns:**

1. **Certificado SSL em PROVISIONING:**

   - Aguardar 10-30 minutos
   - Verificar se DNS propagou

2. **Forwarding rule não funciona:**

   - Verificar se target HTTPS proxy foi criado
   - Confirmar se certificado está ACTIVE

3. **DNS não propagou:**
   - Aguardar 5-30 minutos
   - Verificar configuração no provedor DNS

### **Comandos de Debug:**

```bash
# Verificar status do certificado
gcloud compute ssl-certificates describe [FRONTEND_NAME]-ssl-cert --global

# Verificar forwarding rules
gcloud compute forwarding-rules list --global

# Verificar URL map
gcloud compute url-maps describe lb-[FRONTEND_NAME]-url-map --global

# Testar conectividade
curl -I https://[DOMAIN]
```

## 🔄 Adicionando Novos Frontends

Para adicionar um novo frontend, seguir exatamente os mesmos passos:

1. **Reservar IP:** `gcloud compute addresses create novo-frontend-ip --global`
2. **Criar URL Map:** `gcloud compute url-maps create lb-novo-url-map --default-service=novo-backend --global`
3. **Configurar domínios:** Editar URL Map com novos domínios
4. **Criar certificado SSL:** `gcloud compute ssl-certificates create novo-ssl-cert --domains=novo.dominio.com --global`
5. **Criar target HTTPS proxy:** `gcloud compute target-https-proxies create lb-novo-https-proxy --url-map=lb-novo-url-map --ssl-certificates=novo-ssl-cert --global`
6. **Criar forwarding rule:** `gcloud compute forwarding-rules create lb-novo-https-frontend --address=novo-frontend-ip --target-https-proxy=lb-novo-https-proxy --global --ports=443`
7. **Configurar DNS:** Adicionar registros A no provedor
8. **Testar:** Verificar funcionamento

## 📝 Exemplo Completo - Bigo

**Comandos executados com sucesso:**

```bash
# 1. Reservar IP
gcloud compute addresses create bigo-frontend-ip --global

# 2. Criar URL Map
gcloud compute url-maps create lb-bigo-url-map \
  --default-service=bigo-backend \
  --global

# 3. Configurar domínios (via editor)
gcloud compute url-maps edit lb-bigo-url-map --global

# 4. Criar certificado SSL
gcloud compute ssl-certificates create bigo-ssl-cert \
  --domains=4miga.games,www.4miga.games \
  --global

# 5. Criar target HTTPS proxy
gcloud compute target-https-proxies create lb-bigo-https-proxy \
  --url-map=lb-bigo-url-map \
  --ssl-certificates=bigo-ssl-cert \
  --global

# 6. Criar forwarding rule
gcloud compute forwarding-rules create lb-bigo-https-frontend \
  --address=bigo-frontend-ip \
  --target-https-proxy=lb-bigo-https-proxy \
  --global \
  --ports=443
```

**Resultado final:**

- ✅ `https://4miga.games` → Bigo App
- ✅ `https://www.4miga.games` → Bigo App
- ✅ Isolamento completo
- ✅ Certificado SSL independente

---

**Nota:** Esta documentação é específica para configuração de domínios próprios no GCP Cloud Run com arquitetura híbrida e isolamento por frontend. Para outros ambientes, consulte a documentação correspondente.
