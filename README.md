# CLI_habitTracker for Android (widgets)

Green visual interface Habit Tracker in JS/HTML/CSS with Vite.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)

## Context

Productivity and habit tracking applications have become increasingly complex, often combining task management, calendars, notes, timers and other organizational tools into a single interface.

CLI Habit Tracker takes a different approach. The project focuses on reducing the interface to its essential elements while maintaining the functionality required for everyday use.

The visual design is inspired by Unix-like terminals, with an emphasis on minimalism, clarity and low visual noise.

## Stack

| Technology  | Role                          |
| ----------- | ----------------------------- |
| JavaScript  | Application logic             |
| HTML        | Application structure         |
| CSS         | Interface and styling         |
| Vite        | Development and build tooling |
| Capacitor   | Android integration           |
| Android SDK | Native Android tooling        |
| Gradle      | Android build system          |
| Java 21     | Android build environment     |
| ADB         | Device testing                |
| Git         | Version control               |

## Structure

```text
cli-home/
├── android/                # Android project
├── assets/
│   └── icon.svg
├── css/
│   ├── components.css
│   └── terminal.css
├── js/
│   ├── app.js
│   ├── eisenhower.js
│   ├── habits.js
│   ├── heatmap.js
│   ├── notes.js
│   └── storage.js
├── index.html
├── manifest.json
├── capacitor.config.json
├── package.json
├── package-lock.json
├── sw.js
└── README.md
```

`node_modules/` and `dist/` are intentionally excluded from version control.

## Application

The current application provides:

* [x] Task management
* [x] Eisenhower Matrix
* [x] Habit tracking
* [x] Habit heatmap
* [x] Notes
* [x] Local storage
* [x] Terminal-inspired interface



## Android

The web application is packaged as an Android application through Capacitor.

The Android project is maintained separately from the web layer so that platform-specific functionality can be developed without coupling it to the main application.

```text
Web
│
├── HTML
├── CSS
└── JavaScript
        │
        ▼
      Vite
        │
        ▼
    Capacitor
        │
        ▼
     Android
        │
        ├── Application
        └── Widgets
```

## Build

Install dependencies:

```bash
npm install
```

Build the web application:

```bash
npm run build
```

Synchronize the Android project:

```bash
npx cap sync android
```

Build the debug APK:

```bash
cd android
./gradlew assembleDebug
```

The resulting APK is located at:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Device Testing

With USB debugging enabled:

```bash
adb devices
```

Install the debug build:

```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

## Widgets

The `android-widgets` branch is intended for the development of native Android home-screen widgets.

The initial widget implementation will focus on exposing existing application data without duplicating the application's core logic.

### Current Areas of Development

* [ ] Widget architecture
* [ ] Task widget
* [ ] Habit widget
* [ ] Data synchronization
* [ ] Widget state updates
* [ ] Android lifecycle handling
* [ ] Minimalist task Calendar
* [ ] Calendar widget
* [ ] Mobile interface
* [ ] App Icon
      

## Development Environment

The Android build currently uses:

```text
Java 21
Gradle 8.14.3
Android SDK
Android Platform 36
Capacitor 8
```

Development and builds are performed from the command line without requiring Android Studio.

## Branches

`main` contains the primary application.

`android-widgets` contains the Android integration and widget development.

Changes developed in this branch will be merged into `main` once the Android implementation reaches a stable state.
