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

Далее создадим .env.local и перенесем туда часть переменных из 'sanity.config.ts' и 'sanity.cli.ts', после чего заменим их внутри этих файлов. P.S. При помощи Sanity "projectId" мы можем подгружить нужный нам бекенд. То есть каждый отдельный Id отвечает за отдельный бек и БД.

Теперь мы настроим так, чтобы мы подключались к бекенду 'Sanity studio', когда на фронте мы переходим на страницу "http://localhost:3000/stidio". Для этого, сперва в app дирректории создадим папки - `studio/[[...index]]`. И внутри них - page.tsx.

Теперь когда мы попробуем протестировать в браузере путь "/studio", то сперва мы получим ошибку - To access your content, you need to add the following URL as a CORS origin to your Sanity project. Но нужно просто перейти по ссылке на сайт Sanity и автоматически добавить CORS в наш профиль. После чего путь станет доступным.

После чего мы перейдем на "/studio" и залогинимся, чтобы создать пару постов, которые мы будем отображать в нашем Next приложении.

Если мы хотим кастомизировать цветовую палитру 'Sanity studio', то внутри sanity-config мы создадим "theme.ts" и укажем там параметры цветовой темы. после чего импортируем ее в sanity.config.ts.

Помимо цветов, мы таже можем кастомизировать разные компоненты 'Sanity studio'. Для этого в sanity.config.ts нужно добавть объект в котором мы укажем, что мы хотим изменить и какие лично созданные (кастомные) компоненты мы будем для этого использовать: 
```
studio: {
  components: {
    logo: StudioCustomLogo,
    navbar: StudioCustomNavbar
  }
}
```

Не забываем, что чтобы использовать Tailwind для компонентов в папке "sanity-config", то нам нужно указать ее в tailwind.config.ts - `'./sanity-config/components/**/*.{js,ts,jsx,tsx,mdx}',`.

Далее приступим к фронтенд части нашего NextJS рпиложения. Для удобства, сперва создадим группу для 'Sanity studio' пути внутри /app папке: (admin). Так нам будет понятнее, какие пути там будут лежать и за что они будут отвечать. При чем это нам также может расширить возможности нашего лейаута. Так как внутри каждой такой групирующей папки мы можем создавать multiple layouts (layout.tsx). И каждый из них будет применяться только внутри своей группы. Детальне об этом можно почитать в Next документации про Route Groups.

Создадим <Header /> и <Banner />.

Далее разберем такой концепт в Next.js как Preview Mode. Он создан специально для того чтобы to help applications that rely on a CMS to display draft information for admin before it gets published online. Так мы можем сперва тестировать данные со стороны CMS перед тем как заливать их в прод. В нашем случае в качестве CMS мы используем 'Sanity studio'.

Однако сейчас он абсолютно сломан и не работает. И его переименовали с Draft Mode на Preview Mode. Чтобы потренироваться я создал пару api: preview и exit-preview. Хоть код внутри них и не рабочий, но api пути в новой версии Next.js, должны выглядеть именно так. Поэтому все связаное с Preview Mode я создавать не буду, а лишь потренеруюсь с новой api структурой . P.S. Крайний туториал от Sanity, о том как подключить Preview Mode, что я нашел: https://www.sanity.io/guides/nextjs-live-preview. Но на момент интеграции не работал.

groq - это кастомный query язык для 'Sanity studio', который мы используем для фетчинга данных из него. В каком-то смысле это GraphQL альтернатива для 'Sanity studio'. Сама логика квери запроса дожна быть прописаны в обратных скобках -  const query = groq`...`;.