# 🌟 LC Estética e Saúde Integrativa - Site Oficial

Site profissional desenvolvido para a clínica LC Estética e Saúde Integrativa, especializada em tratamentos estéticos e saúde integrativa em Águas Claras - DF.

---

## 📋 Índice

1. [Estrutura do Projeto](#estrutura-do-projeto)
2. [Como Testar Localmente](#como-testar-localmente)
3. [Configurações Necessárias](#configurações-necessárias)
4. [Como Publicar](#como-publicar)
5. [SEO - Google](#seo-google)
6. [SEO - Meta (Facebook/Instagram)](#seo-meta-facebookinstagram)
7. [Checklist Pré-Lançamento](#checklist-pré-lançamento)
8. [Sugestões de Palavras-Chave](#sugestões-de-palavras-chave)
9. [Manutenção e Atualizações](#manutenção-e-atualizações)
10. [Suporte](#suporte)

---

## 📁 Estrutura do Projeto

```
lc-estetica/
├── index.html          # Arquivo HTML principal
├── style.css           # Estilos CSS
├── script.js           # JavaScript (funcionalidades)
├── README.md           # Este arquivo
└── assets/             # Pasta para imagens (criar)
    ├── logo.png
    ├── og-image.jpg    # 1200x630px para redes sociais
    ├── favicon-32x32.png
    ├── favicon-16x16.png
    └── apple-touch-icon.png
```

---

## 🖥️ Como Testar Localmente

### Opção 1: Abrir Direto no Navegador
1. Baixe todos os arquivos (index.html, style.css, script.js)
2. Coloque-os na mesma pasta
3. Clique duas vezes no arquivo `index.html`
4. O site abrirá no seu navegador padrão

### Opção 2: Usar um Servidor Local (Recomendado)

#### Com Python (Instalado por padrão no Mac/Linux):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Com Node.js:
```bash
npx http-server -p 8000
```

#### Com VS Code:
1. Instale a extensão "Live Server"
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

Após iniciar o servidor, acesse: `http://localhost:8000`

---

## ⚙️ Configurações Necessárias

### 1. Meta Pixel do Facebook

**Localização:** `index.html` (linhas 57-69)

**O que fazer:**
1. Acesse o [Facebook Events Manager](https://business.facebook.com/events_manager2)
2. Crie um Pixel ou use um existente
3. Copie o ID do Pixel (exemplo: 1234567890123456)
4. No arquivo `index.html`, descomente o código do Meta Pixel:

```javascript
// REMOVA OS COMENTÁRIOS (// no início das linhas)
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

// SUBSTITUA 'YOUR_PIXEL_ID' pelo seu ID real:
fbq('init', '1234567890123456'); 
fbq('track', 'PageView');
```

### 2. Google Analytics (Opcional)

**Localização:** `index.html` (linhas 78-86)

**O que fazer:**
1. Acesse o [Google Analytics](https://analytics.google.com/)
2. Crie uma propriedade ou use uma existente
3. Copie o ID de Medição (exemplo: G-XXXXXXXXXX)
4. Descomente e configure o código:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX'); // ← SEU ID AQUI
</script>
```

### 3. Google Maps

**Localização:** `index.html` (linha 1285)

**O que fazer:**
1. Acesse o [Google Maps](https://www.google.com/maps)
2. Pesquise por "Connect Towers Águas Claras"
3. Clique em "Compartilhar" → "Incorporar um mapa"
4. Copie o código iframe
5. Substitua o `src` do iframe no HTML

### 4. Imagens

**O que fazer:**
1. Crie uma pasta chamada `assets` na mesma pasta dos arquivos
2. Adicione as seguintes imagens:
   - `logo.png` - Logo da clínica
   - `og-image.jpg` - Imagem para redes sociais (1200x630px)
   - `favicon-32x32.png` e `favicon-16x16.png` - Ícones do site
   - `apple-touch-icon.png` - Ícone para iOS (180x180px)

3. Atualize os caminhos no `index.html`:
```html
<!-- Linha 53 -->
<meta property="og:image" content="https://www.lcsaudeintegrativa.com.br/assets/og-image.jpg">

<!-- Linhas 47-49 -->
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
```

### 5. Informações da Clínica

**O que revisar:**
- Telefone/WhatsApp (verifique se está correto: 61 99809-2709)
- Endereço completo
- Horários de atendimento
- Links de redes sociais
- Textos e descrições dos serviços

---

## 🚀 Como Publicar

### Opção 1: Hospedagem Compartilhada (HostGator, Hostinger, UOLHost)

1. **Contrate uma hospedagem**
   - Recomendados: HostGator, Hostinger, Locaweb
   - Plano básico é suficiente

2. **Acesse o cPanel**
   - Entre com usuário e senha fornecidos pela hospedagem

3. **Faça upload dos arquivos**
   - Acesse "Gerenciador de Arquivos"
   - Vá para a pasta `public_html` ou `www`
   - Faça upload de todos os arquivos:
     - index.html
     - style.css
     - script.js
     - pasta assets/ (com todas as imagens)

4. **Configure o domínio**
   - Se ainda não tem domínio, compre um (ex: registro.br, GoDaddy)
   - Aponte o domínio para os nameservers da hospedagem
   - Aguarde propagação (24-48h)

### Opção 2: Netlify (Gratuito e Fácil)

1. **Crie conta no [Netlify](https://www.netlify.com/)**

2. **Faça deploy:**
   - Arraste a pasta com os arquivos para o Netlify
   - Ou conecte com GitHub/GitLab

3. **Configure domínio personalizado:**
   - Em "Domain Settings"
   - Adicione seu domínio próprio (lcsaudeintegrativa.com.br)

4. **HTTPS automático** ✅ (Netlify fornece gratuitamente)

### Opção 3: Vercel (Gratuito e Rápido)

Processo similar ao Netlify:
1. Acesse [Vercel](https://vercel.com/)
2. Faça upload dos arquivos ou conecte com Git
3. Configure domínio personalizado
4. HTTPS automático ✅

### Opção 4: GitHub Pages (Gratuito)

1. Crie repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings → Pages
4. Selecione branch `main` e pasta `/root`
5. Seu site estará em: `username.github.io/nome-do-repo`

---

## 🔍 SEO - Google

### Checklist Essencial

#### ✅ Meta Tags (Já implementadas)
- ✓ Title otimizado
- ✓ Meta description
- ✓ Meta keywords
- ✓ Canonical URL
- ✓ Robots meta tag

#### ✅ Estrutura de Headings (Já implementada)
- ✓ H1 único por página
- ✓ Hierarquia correta (H2 → H3 → H4)
- ✓ Palavras-chave nos títulos

#### ✅ Schema Markup (Já implementado)
- ✓ JSON-LD para MedicalBusiness
- ✓ LocalBusiness schema
- ✓ Informações de contato estruturadas

#### 📝 Ações Pós-Publicação

1. **Google Search Console**
   - Acesse: [search.google.com/search-console](https://search.google.com/search-console)
   - Adicione sua propriedade (domínio)
   - Envie o sitemap (você pode criar em: [xml-sitemaps.com](https://www.xml-sitemaps.com/))
   - Solicite indexação das páginas principais

2. **Google Meu Negócio**
   - Essencial para SEO local
   - Crie/reivindique: [business.google.com](https://business.google.com)
   - Adicione:
     - Endereço completo (Connect Towers)
     - Horários de atendimento
     - Fotos de alta qualidade
     - Categorias: "Clínica de Estética", "Centro de Saúde"
     - Link do site

3. **Sitemap XML**
   - Crie um arquivo `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>https://www.lcsaudeintegrativa.com.br/</loc>
      <lastmod>2025-02-14</lastmod>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
   </url>
</urlset>
```
   - Faça upload na raiz do site
   - Envie para o Google Search Console

4. **Robots.txt**
   - Crie um arquivo `robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://www.lcsaudeintegrativa.com.br/sitemap.xml
```

5. **Performance**
   - Teste em: [PageSpeed Insights](https://pagespeed.web.dev/)
   - Otimize imagens (use TinyPNG ou Squoosh)
   - Meta: Pontuação 90+ em Mobile e Desktop

---

## 📱 SEO - Meta (Facebook/Instagram)

### Checklist Open Graph

#### ✅ Tags Já Implementadas
- ✓ og:type
- ✓ og:site_name
- ✓ og:title
- ✓ og:description
- ✓ og:url
- ✓ og:image (1200x630px)
- ✓ og:locale

#### 📝 Testes e Validação

1. **Facebook Debugger**
   - Acesse: [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
   - Cole a URL do site
   - Clique em "Depurar" / "Debug"
   - Clique em "Buscar novas informações" se necessário
   - Verifique se a imagem e textos aparecem corretamente

2. **Criação da Imagem OG**
   - Dimensões: 1200px x 630px
   - Formato: JPG ou PNG
   - Peso: máximo 5MB (ideal < 1MB)
   - Conteúdo sugerido:
     - Logo da clínica
     - Tagline: "Realce sua Beleza Natural com Saúde"
     - Fundo elegante (cores da marca)
   - Ferramenta gratuita: [Canva](https://www.canva.com/)

3. **Meta Pixel - Eventos Configurados**
   - ✓ PageView (visualização de página)
   - ✓ Lead (envio de formulário)
   - ✓ Contact (clique no WhatsApp)
   - Eventos customizados:
     - TimeOnPage (tempo na página)
     - ScrollDepth (profundidade de scroll)

4. **Configurar Conversões no Meta Ads**
   - Acesse: [Facebook Events Manager](https://business.facebook.com/events_manager2)
   - Verifique se os eventos estão sendo recebidos
   - Configure conversões personalizadas se necessário
   - Use para otimizar campanhas

---

## ✅ Checklist Pré-Lançamento

### Antes de Publicar

- [ ] Todos os textos revisados
- [ ] Telefones e e-mails corretos
- [ ] Links de redes sociais funcionando
- [ ] Imagens otimizadas (< 200KB cada)
- [ ] Meta Pixel configurado
- [ ] Google Analytics configurado (opcional)
- [ ] Google Maps incorporado
- [ ] Favicon adicionado
- [ ] OG Image criada e adicionada
- [ ] Testar formulário de contato
- [ ] Testar em diferentes navegadores:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge
- [ ] Testar em dispositivos móveis:
  - [ ] iPhone
  - [ ] Android
  - [ ] Tablet

### Após Publicar

- [ ] Verificar carregamento em produção
- [ ] Testar todos os links
- [ ] Verificar certificado SSL (HTTPS)
- [ ] Enviar sitemap para Google Search Console
- [ ] Criar/atualizar Google Meu Negócio
- [ ] Testar Facebook Debugger
- [ ] Configurar redirecionamento www → não-www (ou vice-versa)
- [ ] Configurar e-mail profissional (@lcsaudeintegrativa.com.br)

---

## 🎯 Sugestões de Palavras-Chave

### Principais (Alta Prioridade)

#### Localização + Serviço
- estética águas claras
- botox águas claras
- preenchimento facial brasília
- ozonioterapia df
- clínica estética brasília
- fios de pdo brasília
- bioestimulador águas claras

#### Serviços Específicos
- toxina botulínica brasília
- preenchimento bigode chinês
- tratamento melasma águas claras
- gordura localizada brasília
- ventosaterapia df
- terapia neural brasília
- tratamento capilar águas claras

#### Long-tail (Específicas)
- clínica de estética perto de mim águas claras
- quanto custa botox em águas claras
- melhor clínica de estética brasília
- ozonioterapia para que serve brasília
- tratamento papada águas claras
- onde fazer fios de pdo em brasília

### Secundárias

- estética integrativa brasília
- saúde integrativa águas claras
- tratamentos faciais brasília
- harmonização facial águas claras
- rejuvenescimento facial brasília
- medicina estética águas claras

### Como Usar as Palavras-Chave

1. **Title Tags** - Use nos títulos das páginas
2. **Headings** - Incorpore em H2 e H3
3. **Meta Descriptions** - Inclua naturalmente
4. **Conteúdo** - Use 2-3 vezes por página
5. **URLs** - Se criar páginas específicas
6. **Alt Text** - Nas imagens

**Importante:** Use palavras-chave de forma natural! Não force.

---

## 🔧 Manutenção e Atualizações

### Atualizações Regulares

**Mensalmente:**
- Atualizar depoimentos
- Adicionar novos serviços (se houver)
- Verificar links quebrados
- Revisar informações de contato

**Trimestralmente:**
- Adicionar novas fotos
- Atualizar promoções/ofertas
- Revisar textos
- Verificar performance (PageSpeed)

**Semestralmente:**
- Analisar dados do Analytics
- Otimizar palavras-chave
- Atualizar design (se necessário)
- Revisar estratégia de conteúdo

### Como Atualizar Textos

1. Abra o arquivo `index.html` em um editor de texto
2. Localize a seção que deseja alterar (use Ctrl+F para buscar)
3. Edite o texto desejado
4. Salve o arquivo
5. Faça upload para o servidor (substituindo o anterior)

### Como Adicionar Novo Serviço

1. No `index.html`, localize a seção de serviços
2. Copie um bloco `<article class="service-card">` existente
3. Cole no local desejado
4. Atualize:
   - Imagem (src)
   - Título
   - Descrição
   - Features (benefícios)
   - Link do WhatsApp

---

## 📞 Suporte

### Recursos Adicionais

- **Google Search Console:** [search.google.com/search-console](https://search.google.com/search-console)
- **Facebook Business:** [business.facebook.com](https://business.facebook.com)
- **Meta Pixel Helper:** [Chrome Extension](https://chrome.google.com/webstore/detail/facebook-pixel-helper)
- **PageSpeed Insights:** [pagespeed.web.dev](https://pagespeed.web.dev/)
- **GTmetrix:** [gtmetrix.com](https://gtmetrix.com/)

### Dúvidas Frequentes

**Q: O formulário não está enviando e-mails**
A: O formulário atual está configurado para enviar via WhatsApp. Para envio de e-mail, você precisa configurar um backend ou usar um serviço como FormSubmit, EmailJS ou Zapier.

**Q: Como adiciono mais idiomas?**
A: Este site está otimizado para português. Para adicionar outros idiomas, você precisaria criar versões separadas do HTML e usar hreflang tags.

**Q: Posso usar imagens do site original?**
A: Verifique os direitos autorais. Recomendo usar fotos próprias da clínica ou banco de imagens com licença (Pexels, Unsplash).

**Q: Como adiciono um blog?**
A: Este site é estático. Para blog, recomendo integrar com WordPress ou Ghost, ou criar páginas individuais em HTML.

---

## 📝 Notas Importantes

### Performance
- Todas as imagens devem ser otimizadas (WebP ou JPG < 200KB)
- Use lazy loading para imagens abaixo da dobra (já implementado)
- Minimize CSS e JS em produção para melhor performance

### Segurança
- Sempre use HTTPS (certificado SSL)
- Não exponha chaves de API no código frontend
- Mantenha backups regulares

### Conformidade LGPD
- Adicione política de privacidade
- Inclua termos de uso
- Implemente banner de cookies se usar cookies de terceiros

---

## 🎉 Conclusão

Você agora tem um site profissional, otimizado e pronto para converter visitantes em pacientes!

**Próximos passos:**
1. Configure Meta Pixel e Google Analytics
2. Publique o site
3. Configure Google Meu Negócio
4. Comece a divulgar nas redes sociais
5. Considere investir em Google Ads e Meta Ads

**Sucesso com seu novo site!**

---
*Versão 1.0 - Fevereiro 2025*
