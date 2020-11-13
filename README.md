# instagramMobileUIAnimation
Projeto desenvolvido para aplicar alguns conceitos de UI&UX mobile, o material base utilizado para construir o projeto veio através dos conteúdos do [Catalin Miron](https://github.com/catalinmiron) no [Youtube](https://www.youtube.com/channel/UCTcH04SRuyedaSuuQVeAcdg). Conteúdo incrível para quem procura material sobre UI&UX utilizando React Native.

# Setup

## JSON-SERVER

Foi utilizado o [json-server](https://github.com/typicode/json-server) para simular a comunicação com uma API. Para garantir que funcione corretamente, é recomendado que inicie o json-server utilizando o IP da sua máquina ao invés de *localhost*.

No diretório raiz do projeto:
```bash
json-server server.json -p[PORT] --host=[LOCALIP]
```
**Lembre-se de editar as configurações de chamada ao JSON-SERVER**

# Bibliotecas
As bibliotecas(principais) utilizadas para fazer as animações foram:
* [react-navigation-shared-element](https://github.com/IjzerenHein/react-navigation-shared-element/tree/navigation-v5) **utiliza Navigation v5**;
* [react-native-animatable](https://github.com/oblador/react-native-animatable);
* [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated);
* [react-native-screens](https://github.com/software-mansion/react-native-screens);

# Créditos
A mídia utilizada no app como conteúdo foi retirada de um tutorial da [Rocketseat](https://www.youtube.com/channel/UCSfwM5u0Kce6Cce8_S72olg), que é um [clone de interface do instagram](https://www.youtube.com/watch?v=2nXsLpUCO20&ab_channel=Rocketseat) também (Mais precisamente, o conteúdo foi utilizado nos posts do app).
Algumas imagens também foram retiradas da [Unsplash](https://unsplash.com/), que serviram para popular as imagens dos avatares.

