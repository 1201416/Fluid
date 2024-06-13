# FluidFramework
Development of a demo application for Fluid Framework

# BACKLOG

Foi necessário desenvolver uma aplicação com a possibilidade de criar Board’s cooperativas e como tal foram decididas as seguintes tarefas:

•	Como utilizador, devo utilizar o login via Microsoft Office 365 para iniciar sessão na aplicação.

•	Como utilizador, posso criar uma Board para poder anotar dados relativos a essa board

•	Como utilizador, posso aceder a qualquer Board para a qual eu tenho permissões de acesso

•	Como utilizador, posso editar qualquer Board para a qual eu tenho permissões de edição

•	Como utilizador, posso convidar um utilizador Microsoft Office 365 para poder aceder, editar ou administrar uma Board criada por mim a qualquer membro.

•	Como utilizador, posso aceitar um convite de acesso, edição ou administração para uma Board.

•	Como utilizador, posso perder os acessos de qualquer Board para a qual não sou administrador.

•	Como administrador de uma Board, posso perder os acessos de qualquer Board para a qual não sou o único administrador

•	Como utilizador, posso criar ou eliminar colunas de qualquer Board para qual eu tenho permissões de edição.

•	Como utilizador, posso editar o nome das colunas de qualquer Board para a qual eu tenho permissões de edição.

•	Como utilizador, posso pesquisar por uma das Board’s para as quais eu tenho acesso através do seu título ou do seu autor 


PowerShell for login 

Neste caso, você pode tentar o seguinte:

Abra o PowerShell como administrador. Você pode fazer isso clicando com o botão direito do mouse no ícone do PowerShell e selecionando "Executar como administrador" no menu de contexto.
Execute o seguinte comando no PowerShell para definir a política de execução apenas para o escopo do usuário atual:
powershell
Copy code
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
Quando solicitado, confirme a alteração digitando "Y" e pressionando Enter.