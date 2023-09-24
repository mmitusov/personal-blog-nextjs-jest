npm create sanity@latest 
npm i next-sanity (for connecting sanity  back with next.js front)
npm i react-portable-text

npm i -D jest ts-jest jest-environment-jsdom @testing-library/jest-dom @testing-library/react @testing-library/user-event
npm i -D eslint-plugin-jest-dom eslint-plugin-testing-library

# App development
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

Но чтобы подключаться к БД 'Sanity studio', нам необходимо сперва создать конфигурационный файл, "sanity.client.ts". После чего мы сможем делать квери запросы - `client.fetch(query)`. 

Однако теперь у нас нет типизации для данных что возвращает нам БД 'Sanity studio'. Поэтому в папке typings мы создадим дополнительный Declaration Files с расширением ".d.ts" - typings.d.ts.

Стоит заметить что 'Sanity studio' также пердоставляет и плагины/библиотеки для автоматического создания типов базируясь на классах БД схем, которые мы создавали для Sanity. То есть происходит Type Inference - TypeScript infers types of variables when there is no explicit information available in the form of type annotations. Sanity caled it Sanity Codegen - Generate TypeScript types from your Sanity schemas. Also includes a simple and tiny (<1kB) TypeScript powered client.

Далее продолжим работать над BlogList компонентом. Отрисуем посты которые нам приходят от 'Sanity studio'. Однако для отрисовки картинок через URL, нужно создать вспомогательную функцию/файл - imgUrl.ts.

Сперва создадим блог карточки. Дату создания блогпоста, наложим поверх картинки.

CSS 'group-hover' будет применяться только если родитель имеет className="group" (небольшая фишка от Tailwind):
```
<div key={post._id} className="group">
  <div className="group-hover:scale-105 transition-transform ease-out">
    ...
  </div>
</div>
```

Также, чтобы на беке добавить поле для описания поста (и дальнейшего его отображения на фронте), мы создадим дополнительное поле в БД таблице post.ts, и назовем это поле - name: "description".

После чего займемься динамическим роутингом, для каждого отдельного поста и создадим папки - post/[slug]. И по нашему {slug} id-шнику будем подтягивать, конкретный пост из 'Sanity studio'.

Основной текст который будет отрисовываться в каждом отдельном посте, мы будем стилизировать при помощи `react-portable-text`. Он был создан для Sanity, и стилизирует текст что приходит нам с бека, перед тем как отрисовать его на странице. Сами стили же мы отдельно храним в "reactPortableComponents".

Далее приступим к ускорению работы нашего Next.js пиложения. Делать мы это будем путем предварительной генерации страница на беке и хранении ее в кеше. После чего будем отдавать клиенту просто уже предварительно готовую, статическию HTML страницу. А обновление/ генерацию новой страницы будем делать 1 раз в час. Чтобы обновлять контент на странице, если мы что-то на ней поменяли.

То есть мы будем использовать (Incremental Static Regeneration (ISR))[https://www.freecodecamp.org/news/rendering-patterns/#static-site-generation-ssg-].

Новый SSR синтаксис в Next.js использует функцию "generateStaticParams" для этих задач.

А чтобы добавить ISR поведение, мы всего должны использовать разерезвированное в Next.js слово "revalidate" - `export const revalidate = 60;`. И теперь через 60 сек после презагрузки страницы мы увидим новый контент. Больше о 'revalidate' можно прочитать - (ТУТ)[https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data].

Но ISR работает только в продакшн версии приложения! Поэтому чтобы его протестировать, мы должны сперва создать билд приложения ("next run build"), и запустить уже продакшн версию ("next run start").

# Testing
Среда для тестировки в Next.js настраивается немнго заморочено. Поэтому мы сперва разберем как ее установить и настроить.

Для начала установим все выше перечисленные зависимости. Добавим пару новых команд для старта приложения в package.json. И создадим новый файл в корне проекта - jest.config.js.