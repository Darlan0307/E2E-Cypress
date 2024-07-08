Funcionalidade: Registro de Imagem
̣̣
Cenário: Enviando uma imagem com entradas inválidas
Dado que estou na página de registro de imagem
Quando eu insiro "" no campo de título
Então eu insiro "" no campo de URL
Então eu clico no botão de enviar
Então eu devo ver a mensagem "Por favor, digite um título para a imagem" acima do campo de título
E eu devo ver a mensagem "Por favor, digite uma URL válida" acima do campo imageUrl
E eu devo ver um ícone de exclamação nos campos de título e URL

Cenário: Enviando uma imagem com entradas válidas usando a tecla enter
Dado que estou na página de registro de imagem
Quando eu insiro "Alien BR" no campo de título
Então eu devo ver um ícone de verificação no campo de título
Quando eu insiro "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg" no campo de URL
Então eu devo ver um ícone de verificação no campo imageUrl
Então eu posso pressionar enter para enviar o formulário
E a lista de imagens registradas deve ser atualizada com o novo item
E o novo item deve ser armazenado no localStorage
Então os campos de entrada devem ser limpos


Cenário: Atualizando a página após enviar uma imagem clicando no botão de enviar
Dado que estou na página de registro de imagem
Então eu enviei uma imagem clicando no botão de enviar
Quando eu atualizo a página
Então eu ainda devo ver a imagem enviada na lista de imagens registradas