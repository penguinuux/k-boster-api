# API Advisor

## Rodando a primeira vez

## Configurações iniciais

Faça a configuração do arquivo **.env** conforme .env.example.

Inicialize seu gerenciador de pacotes para instalar todas as bibliotecas.

**Rode o seguinte comando no terminal para inicializar a aplicação:**

```bash
  yarn dev
```

## Regras da aplicação

- Criação de usuário deve conter autenticação, para que, apenas admin's possam criar outros admin's:
- A aplicação já deve conter um admin no banco. As credenciais serão cadastradas de acordo com a configuração no arquivo **.env**.
- Email do usuário é ÚNICO, caso tente fazer criação de um usuário com um email já existente deve estourar um erro com o status 409 CONFLICT.
- Apenas um usuário admin pode criar um dvd.
- Apenas um usuário admin pode criar outro admin.
- O dvd só será subtraído do estoque a partir do pagamento.
- Ao fazer uma compra a quantidade comprada será abatida do estoque.

---

## Sumário

- [/users](#rotas-users)
- [/dvds](#rotas-dvd)
- [/carts/pay](#rotas-buy)

## Rotas Users

### Cadastro de usuários

`POST /api/users/register - FORMATO DA REQUISIÇÃO `

**Bearer Token Required**

```json
{
  "name": "Marcelo",
  "email": "marcelo.carneiro@mail.com",
  "password": "1234"
}
```

> Em caso de sucesso, a resposta será:

`POST /api/users/register - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "user_id": "29788820-4fa9-4d61-bb5c-5b8b5ac9f606",
  "name": "Marcelo",
  "email": "marcelo.carneiro@mail.com",
  "is_adm": false
}
```

> Em caso de erro, a resposta será:

#### Status 400 BAD REQUEST

Criação de usuário sem todas as chaves obrigatórias.

```json
{
  "name": "Marcelo"
}
```

```json
{
  "error": ["email is a required field", "password is a required field"]
}
```

#### Status 409 CONFLICT

Email já cadastrado.

```json
{
  "name": "Marcelo",
  "email": "marcelo.carneiro@mail.com",
  "password": "1234"
}
```

```json
{
  "error": "Key (email)=(marcelo.carneiro@mail.com) already exists."
}
```

#### Status 401 UNAUTHORIZED

Tentando criar um usuário admin sem permissão de admin.

```json
{
  "name": "Marcelo",
  "email": "marcelo.carneiro@mail.com",
  "password": "1234",
  "is_adm": true
}
```

```json
{
  "error": "missing admin permision"
}
```

### Login de usuários

`POST /api/users/login - FORMATO DA REQUISIÇÃO `

```json
{
  "email": "marcelo.carneiro@mail.com",
  "password": "1234"
}
```

> Em caso de sucesso, a resposta será:

`POST /login - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0NWFiMTBkLTJmZjUtNDRmYy1hMzM0LWQ3ZGZkMzk4OTJiYiIsImlhdCI6MTY1Mzc2MDMzNywiZXhwIjoxNjUzNzYzOTM3fQ.ECH1rK8WvGkzY2ghEP5TJW4ZD8cOjeGfyvgSwn9ZAfs"
}
```

> Em caso de erro, a resposta será:

#### Status 400 BAD REQUEST

Criação de usuário sem todas as chaves obrigatórias.

```json
{
  "email": "marcelo.carneiro@mail.com"
}
```

```json
{
  "error": ["password is a required field"]
}
```

[Voltar ao topo](#sumário)

## Rotas Dvd

### Registro de um ou mais DVD's

`POST /api/dvds/register - FORMATO DA REQUISIÇÃO `

**Bearer Token Required ADMIN only**

```json
{
    "dvds": [
        {
            "name": "duro de matar",
            "duration": "2h12min",
            "quantity": 30,
            "price": 10.99
        },
        ...
    ]
}
```

> Em caso de sucesso, a resposta será:

`POST /api/dvds/register- FORMATO DA RESPOSTA - STATUS 201`

```json
{
    "dvds": [
    {
        "duration": "2h12min",
        "name": "duro de matar",
        "stock": {
            "price": 10.99,
            "quantity": 30,
            "id": "abbc73a5-3249-44ed-9c90-e6f22033a09a"
        },
        "id": "7e9615fb-c5ef-4d16-94ac-5fbac1211814"
    },
    ...
}
```

> Em caso de erro, a resposta será:

#### Status 401 UNAUTHORIZED

Tentando criar um dvd sem token.

```json
{
  "error": "missing authorization token"
}
```

#### Status 401 UNAUTHORIZED

Tentando criar um dvd com token inválido.

```json
{
  "error": {
    "name": "JsonWebTokenError",
    "message": "jwt malformed"
  }
}
```

#### Status 401 UNAUTHORIZED

Tentando criar um dvd sem permissão de admin.

```json
{
  "error": "missing admin permission"
}
```

### Listagem de dvds

`GET /api/dvds - NO BODY `

**Bearer Token Required**

> Em caso de sucesso, a resposta será:

```json
[
    {
        "id": "12015d05-8b2c-4f6b-917b-06f4e7e70637",
        "name": "duro de matar",
        "duration": "2h12min",
        "stock": {
            "id": "d0474b14-6f35-43ee-8f6b-e44edb7af5dc",
            "quantity": 30,
            "price": 10.99
        }
    },
    ...
]
```

> Em caso de sucesso, a resposta será:

`GET /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "id": "e45ab10d-2ff5-44fc-a334-d7dfd39892bb",
  "firstName": "Pedro",
  "lastName": "Paulo",
  "email": "pedropaulo@mail.com",
  "isAdm": false,
  "createdAt": "2022-05-28T17:46:57.980Z",
  "updatedAt": "2022-05-28T17:46:57.981Z",
  "courses": []
}
```

[Voltar ao topo](#sumário)

## Rotas Buy

### Compra/pedido de um DVD

`POST /api/dvds/buy/:dvdId - FORMATO DA REQUISIÇÃO `

**Bearer Token Required**

```json
{
  "quantity": 4
}
```

> Em caso de sucesso, a resposta será:

`POST /api/dvds/buy/:dvdId - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "id": "e9e45b5e-b6e8-4852-91e5-b4738b3cd01f",
  "total": 43.96,
  "paid": false,
  "newUser": {
    "name": "Marcelo",
    "email": "marcelo.carneiro@mail.com",
    "password": "1234"
  },
  "dvd": {
    "id": "efe6a881-e855-4b7c-a7ba-b0f284e4aa88",
    "name": "duro de matar 2",
    "duration": "2h4min",
    "stock": {
      "id": "f30a184c-eaa0-4553-9f73-9df9233116e6",
      "quantity": 30,
      "price": 10.99
    }
  }
}
```

> Em caso de erro, a resposta será:

#### Status 401 UNAUTHORIZED

Tentando fazer pedido de dvd sem token

```json
{
  "error": "missing authorization token"
}
```

#### Status 401 UNAUTHORIZED

Tentando fazer pedido de dvd com token inválido.

```json
{
  "error": {
    "name": "JsonWebTokenError",
    "message": "jwt malformed"
  }
}
```

#### Status 404 UNAUTHORIZED

Id inexistente.

```json
{
  "error": "dvd not found"
}
```

#### Status 422 UNPROCESSABLE ENTITY

Pedido com mais itens do que em estoque.

```json
{
  "error": "current stock: 22, received demand 400"
}
```

## Fechar pedido <a name="carts"></a>

`PUT /api/carts/pay - NO BODY`

**Bearer Token Required**

> Em caso de sucesso, a resposta será:

`POST /api/carts/pay - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "cart": [
    {
      "id": "b585c045-3082-4cdc-bc62-39368bbff4a3",
      "paid": true,
      "total": 43.96,
      "dvd": {
        "id": "a63c1eb7-5201-49fa-a7cf-55d13e7f2a64",
        "name": "duro de matar 2",
        "duration": "2h4min"
      }
    }
  ]
}
```

> Em caso de erro, a resposta será:

#### Status 401 UNAUTHORIZED

Tentando finalizar compra sem token.

```json
{
  "error": "missing authorization token"
}
```

#### Status 401 UNAUTHORIZED

Tentando finalizar compra com token inválido.

```json
{
  "error": {
    "name": "JsonWebTokenError",
    "message": "jwt malformed"
  }
}
```
