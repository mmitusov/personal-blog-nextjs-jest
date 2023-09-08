npm create sanity@latest 
npm i next-sanity (for connecting sanity  back with next.js front)

Сперва почистим проэкт. Удалим вся лишенее из стартовой страницы. Глобальные стили переместим в созданую нами папку 'styles'. А favicon.ico переместим в глобальную папку 'public'. Мы можем хранить favicon.ico как папке '/public' так и в корне папки '/app'. И так, и так Next сможет считывать нашу картинку.

Dependencies below were copied from 'sanity studio' for injecting it into our project
"@sanity/vision": "^3.16.4",
"sanity": "^3.16.4",
"styled-components": "^5.3.9"
"@sanity/eslint-config-studio": "^3.0.1"