# memoir booth 🎀

A cute pastel-themed photobooth web app where you can snap photos, add filters, decorate with stickers, and print adorable photo strips.

## features

- 📷 auto-capture 4 shots with countdown timer
- ✨ filter selection — vintage, film, soft & more
- 🎀 sticker overlays & custom captions
- 🖨️ print-ready photo strips — vintage or normal style
- 💾 download your strip as an image

## tech stack

- [React](https://react.dev/) — UI framework
- [Vite](https://vite.dev/) — build tool & dev server
- [React Router DOM](https://reactrouter.com/) — client-side routing
- [Zustand](https://zustand-demo.pmnd.rs/) — global state management
- [React Webcam](https://github.com/mozmorris/react-webcam) — webcam access
- [React Konva](https://konvajs.org/docs/react/) — canvas rendering for photo strips
- [Poppins](https://fonts.google.com/specimen/Poppins) via `@fontsource/poppins` — typography

## pages

| Route      | Description                                  |
| ---------- | -------------------------------------------- |
| `/`        | Landing page                                 |
| `/start`   | Start photoshoot screen                      |
| `/capture` | Webcam + photo capture + filter selection    |
| `/print`   | Strip preview, stickers, captions & download |

## project structure

```
src/
├── pages/
│   ├── LandingPage.jsx
│   ├── StartPage.jsx
│   ├── CapturePage.jsx
│   └── PrintPage.jsx
├── components/
│   ├── camera/
│   ├── photostrip/
│   └── common/
├── constants/
├── App.jsx
├── main.jsx
└── index.css
```

---

made with ♡ by seanjoerick
