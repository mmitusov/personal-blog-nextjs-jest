npm create sanity@latest 
npm i next-sanity (for connecting sanity  back with next.js front)

Сперва почистим проэкт. Удалим вся лишенее из стартовой страницы. Глобальные стили переместим в созданую нами папку 'styles'. А favicon.ico переместим в глобальную папку 'public'. Мы можем хранить favicon.ico как папке '/public', так и в корне папки '/app'. И так, и так - Next сможет считывать нашу картинку.

Далее подключим Sanity к нашему проекту. По стандарту, Sanity устанавливается как отдельная среда, но для удобства, мы сделаем ее частью нашего Next приложения. А для этого воспользуемся следующей хитростью:

1. Установливаем Sanity в отдельную папку вне нашего проэкта
2. Из package.json 'Sanity studio', копируем следующие зависимости и вставляем их package.json нашего Next приложения:
  "@sanity/vision": "^3.16.4",
  "sanity": "^3.16.4",
  "styled-components": "^5.3.9"
  "@sanity/eslint-config-studio": "^3.0.1"
3. Запускаем 'npm i'
4. Далее из папки 'Sanity studio' копируем слудующие файлы/папки, в вставляем либо в корень Next, либо в моем случае я создал отдельную папку 'sanity-config':
  schemas
  sanity.cli.ts
  sanity.config.ts
5. Проверяем чтобы не было сломаных импортов и все готово. Теперь 'Sanity studio' и Next объеденены вместе.

Далее создадим .env.local и перенесем туда часть переменных из 'sanity.config.ts' и 'sanity.cli.ts', после чего заменим их внутри этих файлов.

Теперь мы настроим так, чтобы мы подключались к бекенду 'Sanity studio', когда на фронте мы переходим на страницу "http://localhost:3000/stidio". Для этого, сперва в app дирректории создадим папки - `studio/[[...index]]`. И внутри них - page.tsx.

Теперь когда мы попробуем протестировать в браузере путь "/studio", то сперва мы получим ошибку - To access your content, you need to add the following URL as a CORS origin to your Sanity project. Но нужно просто перейти по ссылке на сайт Sanity и автоматически добавить CORS в наш профиль.