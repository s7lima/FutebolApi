# ⚽ **Futebol API -- Velo Clube**

Projeto simples desenvolvido em **.NET 9 WebAPI** com **MySQL** e um
**Front-End em HTML/JS/CSS**, utilizado para cadastrar, listar, editar e
excluir jogadores do Velo Clube.

## 📌 **Objetivo do Projeto**

Este projeto tem como finalidade:

-   Criar uma API REST para gerenciamento de jogadores.
-   Armazenar os dados em um banco MySQL.
-   Fornecer um pequeno front-end para interação com o usuário.
-   Usar o Swagger para testes rápidos e documentação automática.

# 🏗️ **Tecnologias Utilizadas**

## **Back-end**

-   .NET 9 Web API\
-   Entity Framework Core\
-   MySQL + Pomelo MySQL Provider\
-   Swagger / Swashbuckle

## **Front-end**

-   HTML\
-   CSS (tema do Velo Clube)\
-   JavaScript (fetch API)

## **Ambiente**

-   XAMPP (MySQL local)

# 📂 **Estrutura de Pastas**

    /FutebolApi
    │   Program.cs
    │   appsettings.json
    │
    ├── Controllers
    │     JogadoresController.cs
    │
    ├── Data
    │     AppDbContext.cs
    │
    ├── Models
    │     Jogador.cs
    │
    ├── Migrations
    │
    └── wwwroot
          index.html
          script.js
          styles.css
          img/

# ⚙️ **Como Executar o Projeto**

## **1. Configurar o MySQL**

Certifique-se de que o **MySQL do XAMPP** está ligado.

Crie o banco, caso ainda não exista:

``` sql
CREATE DATABASE MinhaApiDB;
```

Configure a connection string no `appsettings.json`:

``` json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=MinhaApiDB;User=root;Password=;"
}
```

(Altere a senha caso seu MySQL possua uma)

------------------------------------------------------------------------

## **2. Aplicar as Migrations**

``` bash
dotnet ef database update
```

------------------------------------------------------------------------

## **3. Executar a API**

``` bash
dotnet run
```

Swagger disponível em:

👉 http://localhost:5038/swagger

------------------------------------------------------------------------

## **4. Abrir o Front-end**

Se estiver na pasta `wwwroot`:

👉 http://localhost:5038/index.html

Ou abra manualmente o arquivo:

    /wwwroot/index.html

------------------------------------------------------------------------

# 🧩 **Funcionamento da Aplicação**

## ✔ API Endpoints (Jogadores)

### **GET /api/Jogadores**

Lista todos os jogadores.

### **GET /api/Jogadores/{id}**

Retorna um jogador específico.

### **POST /api/Jogadores**

Cria um jogador.\
O time é sempre enviado como:

``` json
"time": "Velo Clube"
```

### **PUT /api/Jogadores/{id}**

Atualiza um jogador já existente.

### **DELETE /api/Jogadores/{id}**

Remove um jogador.

------------------------------------------------------------------------

# 🖥️ **Front-End**

O front-end realiza:

-   Cadastro\
-   Edição\
-   Exclusão\
-   Listagem dinâmica

O time não aparece no formulário, mas é enviado automaticamente no JSON.

------------------------------------------------------------------------

# 📥 **Inserção inicial de jogadores**

``` sql
INSERT INTO Jogadores (id, nome, time, posicao, numeroCamisa) VALUES
('1','Rafael','Velo Clube','Defensor','3'),
('2','Leonardo Lima Dos Santos','Velo Clube','Meio-campo','8'),
('3','Daniel Amorim Dias da Silva','Velo Clube','Atacante','89'),
('4','Lucas Duni de Lima','Velo Clube','Atacante','18'),
('5','Cauari Carmo Simao Santos','Velo Clube','Atacante','19'),
('6','Caio','Velo Clube','Goleiro','22'),
('7','Carlos Manuel','Velo Clube','Meio-campo','2'),
('8','Gabriel Mancha','Velo Clube','Defensor','4'),
('9','Julio Cesar Vaz De Andrade','Velo Clube','Defensor','5'),
('10','Pablo Caique','Velo Clube','Goleiro','1'),
('11','Leonardo De Campos','Velo Clube','Atacante','6'),
('12','Sillas Da Silva Vital Gomes','Velo Clube','Atacante','10'),
('13','Jefferson Nem','Velo Clube','Atacante','11'),
('14','Pedro Antonio Matheus','Velo Clube','Meio-campo','7'),
('15','Dalton Alan Munaretto','Velo Clube','Goleiro','12'),
('16','Carlos Eduardo Pontes Santos','Velo Clube','Defensor','13'),
('17','Rennan','Velo Clube','Defensor','16'),
('18','Vinicius Leite Silva','Velo Clube','Meio-campo','7'),
('19','Fabio','Velo Clube','Meio-campo','14'),
('20','Pedro Cacho','Velo Clube','Meio-campo','17'),
('21','Pedro Henrique Fiuza da Silva','Velo Clube','Atacante','15');
```

------------------------------------------------------------------------

# ✔️ **Considerações Finais**

Este projeto é ideal para:

-   estudos de .NET API\
-   integração com front-end\
-   CRUD completo com MySQL\
-   prática de Entity Framework Core