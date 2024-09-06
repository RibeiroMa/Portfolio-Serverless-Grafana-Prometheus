# Começando

- Executar `docker compose up --build` para preparar todo ambiente

# Grafana

- Entrar no [localhost:3000](http://localhost:3000) e fazer login com usuário `admin` e senha `admin`.
- Clique em `Create your first dashboard` ou em `Dashboards -> Create dashboard`
- Clique em `Import dashboard`
- Cole `11159` e clique em `Load`
- Selecione o `Prometheus` como data source.
- Clique em `Import`
- Volte na `Home` e clique em `remove this panel`.

# Limpando a bagunça

- Pare o processo do Docker compose com `CTRL + C` no terminal
- Execute `docker compose down -v` para limpar o que restou
