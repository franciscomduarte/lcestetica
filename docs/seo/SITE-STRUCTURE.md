# SITE-STRUCTURE.md — LC Estética e Saúde Integrativa
**Arquitetura de URLs** | Gerado: 2026-06-02

---

## Hierarquia Atual (Implementada)

```
https://www.lcsaudeintegrativa.com.br/
│
├── /                                              ← Homepage (index.html)
│   └── Sections: #home #servicos #beneficios #depoimentos #localizacao #faq
│
├── /sobre.html                                    ← Sobre a Dra. Lara Cristian
├── /contato.html                                  ← Agendamento + Formulário + Mapa
│
├── /servicos/
│   ├── botox-aguas-claras.html                   ← "botox águas claras"
│   ├── ozonioterapia-brasilia.html               ← "ozonioterapia brasília"
│   ├── fios-pdo-aguas-claras.html                ← "fios pdo águas claras"
│   ├── bioestimulador-colageno-brasilia.html     ← "bioestimulador colágeno brasília"
│   ├── tratamento-melasma-brasilia.html          ← "melasma brasília"
│   ├── skinbooster-aguas-claras.html             ← "skinbooster águas claras"
│   ├── terapia-neural-brasilia.html              ← "terapia neural brasília"
│   └── ventosaterapia-brasilia.html              ← "ventosaterapia brasília"
│
├── /blog/
│   └── index.html                                ← Hub do Blog (50 temas planejados)
│
├── /robots.txt
├── /sitemap.xml
└── /.htaccess
```

---

## Expansão Planejada (Fase 2-3)

```
/servicos/
│   └── tratamento-capilar-brasilia.html          ← Fase 2 (Semana 11-12)
│
/blog/
│   ├── quanto-tempo-dura-botox.html              ← Publicar Jul/2026
│   ├── botox-doi.html
│   ├── botox-preventivo.html
│   ├── o-que-e-ozonioterapia.html
│   ├── ozonioterapia-funciona.html
│   ├── ... (48 artigos até Dez/2026)
│   └── ... (total 80+ até Jun/2027)
│
/galeria.html                                      ← Fase 2 (Sem. 9-10)
/depoimentos.html                                  ← Fase 3 (opcional)
│
/localizacoes/                                     ← Fase 4 (se expansão geográfica)
│   ├── aguas-claras.html
│   ├── taguatinga.html
│   └── park-way.html
```

---

## Schema Markup por Tipo de Página

| Página | Schema Implementado | Schema Planejado |
|--------|--------------------|--------------------|
| Homepage | MedicalBusiness + AggregateRating + hasOfferCatalog + FAQPage | — |
| /sobre.html | Person + BreadcrumbList | Organization |
| /contato.html | MedicalBusiness + BreadcrumbList | ContactPage |
| /servicos/*.html | BreadcrumbList + FAQPage + MedicalProcedure | Service, Review |
| /blog/index.html | Blog + BreadcrumbList | — |
| /blog/*.html | — (a criar) | Article + FAQPage + BreadcrumbList |
| /galeria.html | — (a criar) | ImageGallery |

---

## Estratégia de Links Internos

### Padrão de Linkagem por Página

**Homepage → todos os serviços** (via seção #servicos + footer)
**Páginas de serviço → 3 serviços relacionados** (seção "Tratamentos Complementares")
**Blog → página de serviço principal** (mínimo 2 links por artigo)
**Blog → outros artigos relacionados** (seção "Leia também")
**/sobre.html → /contato.html** (CTA principal)
**/contato.html → serviços relevantes** (via cards na barra lateral)

### Hubs de Autoridade Interna

| Hub | Páginas que Apontam Para |
|-----|--------------------------|
| Botox | /servicos/botox-aguas-claras.html | 8+ artigos de blog sobre botox |
| Ozonioterapia | /servicos/ozonioterapia-brasilia.html | 8+ artigos de blog sobre ozônio |
| Saúde Integrativa | Index + Ozônio + Terapia Neural + Ventosa | Artigos gerais |

---

## Sitemap XML — Estrutura Completa

### Atual (12 URLs)
```xml
/ (priority 1.0, weekly)
/sobre.html (priority 0.8, monthly)
/contato.html (priority 0.9, monthly)
/blog/ (priority 0.7, weekly)
/servicos/botox-aguas-claras.html (priority 0.9, monthly)
/servicos/ozonioterapia-brasilia.html (priority 0.9, monthly)
/servicos/fios-pdo-aguas-claras.html (priority 0.9, monthly)
/servicos/bioestimulador-colageno-brasilia.html (priority 0.9, monthly)
/servicos/tratamento-melasma-brasilia.html (priority 0.9, monthly)
/servicos/skinbooster-aguas-claras.html (priority 0.9, monthly)
/servicos/terapia-neural-brasilia.html (priority 0.9, monthly)
/servicos/ventosaterapia-brasilia.html (priority 0.9, monthly)
```

### Ao Adicionar Artigos de Blog
- Adicionar URL ao sitemap com: `priority 0.6`, `changefreq monthly`
- Atualizar `<lastmod>` da homepage e blog/ quando publicar novo artigo
- Considerar sitemap separado `/sitemap-blog.xml` quando ultrapassar 30 artigos

---

## Breadcrumbs — Padrão

```
Home > Serviços > Botox em Águas Claras
Home > Sobre
Home > Contato
Home > Blog
Home > Blog > [Título do Artigo]
```

Todas as páginas já têm o schema BreadcrumbList implementado.

---

## Diretrizes de URL

| Regra | Exemplo |
|-------|---------|
| Letras minúsculas | ✅ `/servicos/botox-aguas-claras.html` |
| Hífens para espaços | ✅ `botox-aguas-claras` |
| Sem acentos | ✅ `aguas-claras` (não `águas-claras`) |
| Keyword principal na URL | ✅ `tratamento-melasma-brasilia` |
| Sem parâmetros desnecessários | ✅ |
| Extensão .html explícita | ✅ (consistente no site atual) |
| Profundidade máx. recomendada | 3 níveis (`/blog/artigo.html`) |

---

## Mapa de Redirecionamentos

| URL Antiga | URL Nova | Status |
|-----------|---------|--------|
| index.html#servicos | /#servicos | Nenhum redirecionamento necessário |
| (SPA anterior) | / | Deploy da nova arquitetura substitui |

> **Nota:** Como o site era SPA, não há URLs de páginas antigas para redirecionar. Todas as novas URLs são adicionais.

---

## Controle de Qualidade — Checklist por Página

Antes de publicar qualquer nova página:

- [ ] URL amigável com keyword principal sem acento
- [ ] Meta title único (50-60 chars) com keyword + localização
- [ ] Meta description única (150-160 chars) com CTA
- [ ] Canonical apontando para a própria página
- [ ] H1 único com keyword principal
- [ ] Schema JSON-LD válido (testar em schema.org/validator)
- [ ] BreadcrumbList implementado
- [ ] Imagem hero: width + height + alt text + loading=eager
- [ ] Demais imagens: loading=lazy + width + height + alt text
- [ ] Mínimo 2 links internos para serviços relacionados
- [ ] CTA para WhatsApp + /contato.html
- [ ] Adicionado ao sitemap.xml
- [ ] Verificar no Google Rich Results Test
