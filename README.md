# App Calculadora en JavaScript

Proyecto práctico del curso **JavaScript: Introducción a la programación** (Sección 6: *Poniendo en práctica lo aprendido: App Calculadora*).

**Autor:** René Antonio Arostegui Valle
**Universidad:** Universidad Nacional Héroes de San José de las Mulas
**Materia:** Programación web · **Carrera:** Ingeniería en Computación

## Qué hace

Calculadora web básica construida solo con HTML, CSS y JavaScript (sin librerías):

- Suma, resta, multiplicación y división.
- Operaciones encadenadas (`2 + 3 + 4`).
- Punto decimal, borrar último dígito (`⌫`) y limpiar todo (`C`).
- Manejo de la división entre cero.
- Historial de la operación sobre el visor.
- Soporte de teclado: números, `+ - * /`, `Enter` o `=` (resultado), `Backspace` (borrar), `Esc` (limpiar).

## Cómo abrirlo en Visual Studio Code

1. Descomprime el proyecto y abre la carpeta con **File → Open Folder…** (o desde la terminal: `code app-calculadora-js`).
2. Instala la extensión **Live Server** (VS Code te la recomendará al abrir la carpeta).
3. Clic derecho sobre `index.html` → **Open with Live Server**.

También funciona abriendo `index.html` directamente en el navegador.

## Estructura

```
app-calculadora-js/
├── index.html        # Lección 34: estructura (maquetado)
├── css/
│   └── styles.css    # Lección 35: estilos
├── js/
│   └── app.js        # Lecciones 36-38: DOM, eventos y funciones
├── .vscode/
│   └── extensions.json
├── .gitignore
└── README.md
```

## Relación con las lecciones del curso

| Lección | Aplicado en |
|---|---|
| 34. Maquetando la vista | `index.html` |
| 35. Aplicando los estilos | `css/styles.css` (grid, colores, hover) |
| 36. Seleccionando elementos del DOM | Inicio de `js/app.js` (`querySelector`, `querySelectorAll`) |
| 37. Agregar los eventos | `addEventListener` sobre botones y teclado |
| 38. Programar las funciones | `calcular`, `resolver`, `elegirOperador`, etc. |
| 39. Probar la aplicación | Pruebas manuales en el navegador |

## Subirlo a GitHub

```bash
git remote add origin https://github.com/<tu-usuario>/<tu-repositorio>.git
git branch -M main
git push -u origin main
```
