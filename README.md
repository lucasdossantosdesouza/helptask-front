#helptask front-end (Angular)
Para rodar o projeto front-End baixe a ide VS.Code e instale. 
instale o NodeJS versão 12.19.0 e o Angular Cli versão 10.1.7. 
Clone o projeto do git ou baixe via .rar. 
Abra o projeto na ide na opção File -> Open Folder, vá a pasta que você clonou o projeto e abra a pasta do projeto e clique em abrir. 
Para subir a aplicação va ao menu Terminal -> new terminal. 
Com o terminal aberto digite npm install  @angular/cli para instalar as dependências no projeto e depois ng serve --open=true para subir a aplicação front-end. 
O login default é admin@admin.com com password 123456. 
Existem três tipos de usuários no sistema o Administrador que só cadastra usuários e visualiza o resumo das tasks, 
O Técnico vizualiza as tasks atríbui ela pra sí e atende.
O Cliente abre a task para atendimento e vizualiza o andamento. 
Cada task pode ser editada, excluida, vizualizar detalhes e adicionar comentários. 
Também é possível informar o tempo gasto para atendimento e agendar o atendimento das mesmas.
Somente o Cliente pode alterar a situação(status) de uma task resolvida.
Somente o Técnico pode alterar a situação(status)  de uma task com a situação aprovada ou desaprovada.
Somente o Técnico pode reabrir a task.
Somente o Técnico pode atribuir a task para ele.
Os comentários só aparecem para tasks com situação(status) diferentes de fechada.


