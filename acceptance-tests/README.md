# Testes de Aceitação em Cypress

## Casos de teste

| Feito | Casos de uso | Rotas |
|-------|--------------|-------|
| X (T01) | Cadastro | /register |
| X (T02) | Login | /login |
| X (T03) | Editar instituição | /instituição/:id |
| X (T04) | Criar campanha | /nova-campanha |
| X (T05) | Ver campanhas | /campaigns |
| X (T06) | Ver campanha | /campanhas/:id?viewinfo |
| X (T07) | Editar campanha | /campanhas/:id |
| X (T08) | Excluir campanha | /campanhas/:id |
| X (T09) | Logout | /logout |
| X (T10) | Recuperação de Senha | /login |
| X (T11) | Contato | /contact |
| X (T12) | Sobre | /about |

| - | Ver instituições (não autenticado) | /institutes |
| - | Ver campanhas (não autenticado) | /campaigns |
| - | Ver detalhes de campanha | /campaign/:id |

| ? (não é possível ir direto para a url, precisa ser clicando) | Ver detalhes de instituição | /institute/:id |
| ? (a página não existe) | Termos de uso | /termo.html |

