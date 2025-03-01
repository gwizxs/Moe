
### внедрение новой темы

для внедрения новой темы на сайте нужно зайти в папку useTheme и добавить новую тему в switch case, а потом добавить стили для самой темы в [файле](./src/app/styles/themes/)

---

### Пример

создаем файл с названием темы 

`yellow.scss` - 
```css
.app_yellow_theme {
    --bg-color:rgb(247, 255, 178);
    --inverted-bg-color:rgb(251, 255, 0);
    --primary-color: #dadada;
    --box-shadow: rgba(202, 255, 142, 0.2)
}
```

заходим в useTheme где уже будем добавлять тему в тернарный оператор 
