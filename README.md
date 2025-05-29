# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

```
YoutubeCloneReact
├─ .babelrc.json
├─ .eslintrc.cjs
├─ index.html
├─ jest.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ App.scss
│  ├─ assets
│  │  ├─ Icons
│  │  │  ├─ YouTubeLogo.png
│  │  │  ├─ YouTubeLogoDark.png
│  │  │  └─ YouTubeLogoIcon.png
│  │  └─ react.svg
│  ├─ components
│  │  ├─ AddFriendModal.jsx
│  │  ├─ ButtonList.jsx
│  │  ├─ ChatMessage.jsx
│  │  ├─ CommentsContainer.jsx
│  │  ├─ FavoriteVideos.jsx
│  │  ├─ Footer.jsx
│  │  ├─ Friends.jsx
│  │  ├─ Header.jsx
│  │  ├─ History.jsx
│  │  ├─ InviteModal.jsx
│  │  ├─ LiveChat.jsx
│  │  ├─ Login.jsx
│  │  ├─ Main.jsx
│  │  ├─ NotificationPopup.jsx
│  │  ├─ PlayVideo.jsx
│  │  ├─ SideBar.jsx
│  │  ├─ Signup.jsx
│  │  ├─ VideoCard.jsx
│  │  └─ VideoContainer.jsx
│  ├─ hooks
│  │  └─ useDarkMode.js
│  ├─ index.scss
│  ├─ main.jsx
│  ├─ scripts
│  │  └─ generate-reports.js
│  ├─ setupTests.js
│  ├─ utils
│  │  ├─ appSlice.js
│  │  ├─ chatSlice.js
│  │  ├─ constants.js
│  │  ├─ searchSlice.js
│  │  ├─ store.js
│  │  └─ userSlice.js
│  ├─ __mocks__
│  │  └─ fileMock.js
│  └─ __tests__
│     ├─ components
│     │  ├─ App.test.jsx
│     │  ├─ Main.test.jsx
│     │  └─ Router.test.jsx
│     └─ unit
│        ├─ App.test.jsx
│        └─ main.test.jsx
├─ tailwind.config.js
└─ vite.config.js

```