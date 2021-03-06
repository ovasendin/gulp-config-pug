# gulp-config-pug

```html
git clone https://github.com/ovasendin/gulp-config-pug.git
```

#### Gulp конфигурация для PUG верстки

- Шаблонизатор PUG + `@zoxon/emitty`
- Препроцессор SASS/SCSS
- Автопрефиксер + минимизация CSS
- Объединение @media запросов
- Настраиваемое сжатие изображений
- Создание .webp изображений
- Создание SVG спрайта

#### Некоторые плагины

- `@zoxon/emitty` - PUG | позволяет компилировать только те `pug`-файлы, которые были изменены
- `gulp-plumber` - PUG, SASS | предотвращает прерывание `watch` из-за ошибок gulp-плагинов
- `browserify` - JS | позволяет использовать модули при написании javascript
- `babelify` - JS | работает вместе с `browserify`, преобразует JS-код в старый формат для браузеров
- `vinyl-source-stream`, `vinyl-buffer` - JS | позволяют продолжить работать с gulp-плагинами после использования `browserify` (в этой сборке нужны для `gulp-sourcemaps` и `gulp-uglify`).
- `gulp-changed` - IMG | переносит только изменённые файлы

#### Команды

- `npm i` - установка пакетов
- `npm run dev` - запуск проекта (watch)
- `npm run build:dev` - сборка проекта (dev)
- `npm run build:prod` - сборка проекта (prod)

#### Нужно добавить (заметки)

- **Линтеры и поддержку ES6**:
- ~~`@babel`~~ - добавлено
- `eslint` + `airbnb`
- `pug-lint`
- `stylelint`

#### Требуются расширения для VS Code

- `EditorConfig for VS Code`
- `pug (jade) formatter` - форматирование PUG

### Заметки

**Решена проблема**: при удалении файлов из рабочей папки `app` в процессе `watch`, файлы **не удаляются** из папки `build`. Удалось решить это с помощью `gulp-changed`, `fs` и событий `gulp.watch`. Решение применяется для папок `images` и `svg`. Папка `fonts` очищается полностью, если возникают изменения в файлах `app/files/assets/fonts` - для шрифтов это допустимо. Обработка событий:

- С `add` прекрасно справляется `gulp-changed`,
- `change` работает замечательно,
- `unlink` предоставляет путь `path`, по которому файл ищется в папке `build` и удаляется с помощью `fs`.

**imagemin**: для сжатия изображений необходимы плагины конкретных версий:

- `imagemin@^7.1.0`
- `imagemin-webp@^6.0.0`
