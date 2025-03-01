## classNames - как использовать и как с ним работать

это почти та же библиотека clsx только самописсная и имеет меньший размер, в ней можно динамически менять стили и делать тоже самое, что и на clsx 

## API

### Импорт

```typescript
import classNames, { Mods } from './classNames';
```

### Сигнатура функции

```typescript
function classNames(
    cls: string,
    mods: Mods = {},
    additional: (string | undefined)[] = [],
): string;
```

### Аргументы

1. **`cls`** (обязательный):
    
    - Тип: `string`
    - Базовый класс, который всегда присутствует в итоговой строке.
2. **`mods`** (опциональный):
    
    - Тип: `Record<string, boolean | string | undefined>` (экспортируется как `Mods`)
    - Объект модификаторов, где ключи — это имена классов (обычно берутся из CSS-модуля), а значения — их состояния. Если значение `true` или непустая строка, класс будет добавлен в итоговую строку. Если `false` или `undefined`, класс игнорируется.
3. **`additional`** (опциональный):
    
    - Тип: `(string | undefined)[]`
    - Массив дополнительных классов. Значения `undefined` игнорируются.

### Возвращаемое значение

- Тип: `string`
- Итоговая строка классов, разделённая пробелами.

---

## Примеры использования

### Пример 1: Простой компонент с модификаторами (CSS-модули)

```typescript
import classNames, { Mods } from './classNames';
import cls from './Button.module.scss';

export const Button = (props: ButtonProps) => {
    const {
        className,
        children,
        theme = 'outline',
        square,
        disabled,
        size = 'medium',
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls[size]]: true,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};
```

**Пояснение:**

- `cls`: базовый класс из CSS-модуля, например, `cls.Button`.
- `mods`: динамические модификаторы, зависящие от пропсов компонента, также взятые из CSS-модуля.
- `additional`: массив дополнительных классов, переданных через `props.className`.

---

### Пример 2: Динамическое создание классов

```typescript
import cls from './Alert.module.scss';

const isActive = true;
const isError = false;

const result = classNames(cls.alert, {
    [cls.active]: isActive,
    [cls.error]: isError,
}, ['custom-class']);

console.log(result); // 'alert active custom-class'
```

**Пояснение:**

- Если `isActive` равно `true`, добавляется класс `cls.active`.
- Класс `cls.error` игнорируется, так как `isError` равно `false`.
- Класс `'custom-class'` добавляется из массива `additional`.

---

### Пример 3: Использование с динамическими пропсами

```typescript
import cls from './Input.module.scss';

const size = 'large';
const isDisabled = true;

const inputClass = classNames(cls.input, {
    [cls[size]]: true, // cls.large
    [cls.disabled]: isDisabled,
});

console.log(inputClass); // 'input large disabled'
```

**Пояснение:**

- Класс `cls.large` добавляется, так как значение переменной `size` равно `'large'`.
- Класс `cls.disabled` добавляется, так как `isDisabled` равно `true`.

---

### Пример 4: Генерация модификаторов программно

```typescript
import cls from './Element.module.scss';

const states = ['active', 'focused', 'hovered'];

const mods: Mods = Object.fromEntries(
    states.map((state) => [cls[state], true])
);

const result = classNames(cls.element, mods);

console.log(result); // 'element active focused hovered'
```

**Пояснение:**

- Модификаторы `cls.active`, `cls.focused` и `cls.hovered` добавляются программно, так как их значения `true`.

---

## Что умеет утилита

### 2. **Работа с модификаторами (`mods`)**

- Ключи объекта `mods` — это классы из CSS-модуля.
- Значения определяют, добавлять класс в итоговую строку или нет:
    - `true` — класс добавляется.
    - `false` — класс игнорируется.
    - `string` — класс добавляется, если строка непустая.
    - `undefined` — класс игнорируется.

### 3. **Фильтрация дополнительных классов (`additional`)**

- Все `undefined` значения в массиве `additional` автоматически удаляются с помощью `filter(Boolean)`.

### 4. **Поддержка шаблонов именования классов**

- Использование шаблонных строк позволяет динамически создавать имена классов, например:
    
    ```typescript
    const size = 'large';
    classNames(cls.input, { [cls[size]]: true });
    // Результат: 'input large'
    ```
    

---

## Когда использовать

-  мы будем использовать ее при создании новых компонентов в главном div/section, вот пример

```typescript
import classNames from "shared/lib/classNames/ClassNames"
import { AppRouter } from "./providers/router"
import { Theme, useTheme } from "./providers/ThemeProvider"

// это простой корневой компонент, нужно обратить внимание на главный div

function App() {

  const { toggleTheme, theme } = useTheme()
  return (
  // у нас есть класс app, если в стилях написать .app то мы сможем взаимодействовать с ним, так же есть 
    <div className={classNames('app', {}, [theme])}>
   
    <button onClick={toggleTheme}>{theme === Theme.DARK ? 'Light' : 'Dark'} 
    </button>
      <AppRouter />
    </div>

  )

}

export default App
```
