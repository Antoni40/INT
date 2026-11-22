# Aplikacja artykuły

## Opis ogólny
Aplikacja jest CMS'em do tworzenia i przeglądania artykułów. Obsługuje funkcje takie jak:
- Dodawanie artykułów
- Przeglądanie listy artykułów 
- Przeglądanie pojedynczego artykułu

Aplikacja działa w środowisku Node.js na frameworku Express, używa silnika szablonów EJS, a do zapisywania danych używa pliki w formacie JSON.

## Schemat zależności

- `server.js` - jest punktem wejścia aplikacji importuje obiekt app z `app.js` i uruchamia serwer
- `app.js` - zawiera konfigurację aplikacji Express w tym: import bibliotek, konfiguracje silnika EJS, ustawienie ścieżek - routing, widoków i middlewareów (deserializacja z JSON, parsowanie złożonych danych z formularzy), eksportuje obiekt app który jest stworzonym aplikacją `app.js` importuje router z pliku `articles.js` i rejestruje go jako middleware
- `articles.js` zawiera router który obsługuje routing, do każdej ścieżki przypisuje odpowiednią funkcję kontrolera z `articlesController.js` 
- `articlesController.js` zawiera funkcje obsługujące żądania HTTP, każda z funkcji wywołuje funkcje z `articleService.js` a później renderuje widok przekazując parametry do plików EJS (`error.ejs`, `new.ejs`, `list.ejs`, `show.ejs`). 
- `articleService.js`  zawiera główną logikę aplikacji, niezależną od warstwy HTTP. Odpowiada m.in. za tworzenie slugów, pobieranie danych z modelu (storage.js) oraz tworzenie artykułów.
-  (`storage.js`) odpowiada za odczyt i zapis danych do pliku .json

## Główne moduły aplikacji

### Moduły i opisy ich zadań
- `./data/articles.json` - plik .json z artykułami
- `./public/css/main.css` - plik ze stylami (obecnie pusty)
- `./src/controllers/articlesController.js` - kontroler zawierający funkcje obsługujące żądznia HTTP, funkcje pobierają dane z serwisu i renderują odpowiednie widoki.
- `./src/models/storage.js` - obsługa pliku .json
- `./src/routes/articles.js` - routing łączenie ścieżek do odpowiednich funkcji kontrolera
- `./src/services/articleService.js` - główna logika aplikacji 
- `./src/views/articles/` - widoki aplikacji
- `./src/views/partials/` - wspólne komponenty stron
- `./src/app.js` - konfiguracja aplikacji Express
- `./src/server.js` - uruchomienie serwera

### Używane funkcje

#### `articleServices.js`

- `slugify(title)` - zwraca podany tytuł w postaci slug'a tj. tworzy ciąg znaków możliwy do zapisania w url. Wykonuje to m.in. zmieniając znaki na małe, usuwając znaki specjalne oraz usuwając podwójne spacje
- `async listArticles()` - zwraca listę artykułów pobranych z modelu
- `async createArticle(title, content, author)` - tworzy nowy artykuł ustawiając dla niego unikalnego sluga, wszystkie przekazane dane oraz datę utworzenia. Przekazuje zaaktualizowaną listę artykułów do modelu skąd jest zapisywana do pliku .json.

#### `storage.js`

- `async readArticles()` - zwraca listę artykułów pobranych z .json
- `async writeAllArticles(articles)` - zapisuje przekazaną listę artykułów do pliku .json

#### `articlesController.js`

- `async index(req, res)` - obsługuje ścieżkę `/`, pobiera listę artykułów i parametryzuje szablon pliku .ejs (dostępny pod ścieżką articles/list z tego powodu że w app jest ustawienie folderu views na ten z projektu)
- `async show(req, res)` - obsługuję ścieżkę `/articles/:slug`, pobiera sluga z requesta, po czym przekazuje go do funkcji znajdującej artykuły po slug'u, jeśli nie znajdzie artykułu renderuje stronę z errorem, w przeciwnym razie renderuje strone 'articles/show'
- `async newForm(req, res)` - obsługuje sciężkę `/articles/new` renderuje stronę z formularzem do tworzenia artykułu
- `async create(req, res)` - pobiera dane wysłane metodą POST na ścieżkę '/articles', sprawdza czy podane dane są poprawne, jeśli nie renderuje ten sam formularz z błędami i wcześniej wpisanymi danymi, jeśli dane są poprawne to wywołuje funkcję `createArticle(title, content, author)`z serwisu i przekierowuje do nowo stworzonego artykułu.

### Eksportowane elementy

#### `articlesController.js`

- `index, show, newForm, create` - funkcje do obsługi żądań HTTP wywołują odpowiednie funkcje z serwisu. Są wykorzystywane przez router w pliku `articles.js`.

#### `storage.js`

- `readArticles, writeArticles` -  funkcje odpowiedzialne za odczyt i zapis danych w pliku .json. Są wykorzystywane przez serwis.

#### `routes/articles.js`

- `router` - router stworzony przez metodę express.Router(). Ma przypisane ścieżki do konretnych metod z articlesController.js. Jest wykorzystywany przez app.js jako middleware.

#### `articleServices.js`

- `listArticles, getArticlesBySlug, createArticle` - funkcje realizujące logikę aplikacji i korzystające z modelu. Są wykorzystywane przez kontroler.

#### `app.js`

- app - jest stworzoną aplikacją expressa z middlewareami i wszelką konfiguracją jest używana w server.js do uruchomienia jej na serwerze.

### Przykład użycia 
- Użytkownik wchodzi na ścieżkę `/` wyświetla mu się widok list.ejs zawierający listę artykułow, naciska na link do artykułu wyświetla mu się widok show.ejs na ścieżce `/articles/:slug` z treścią wybranego artykułu.

## Opis widoków

- `list.ejs` – wyświetla nagłówek, listę wszystkich artykułów i stopkę.
- `new.ejs` – wyświetla nagłówek, formularz do dodawania nowego artykułu, ewentualne błędy walidacji oraz stopkę.
- `show.ejs` – wyświetla nagłówek, treść pojedynczego artykułu i stopkę.
- `error.ejs` – wyświetla stronę z informacją o błędzie.
- `header.ejs, footer.ejs` – partiale zawierające wspólne elementy wykorzystywane przez pozostałe widoki.