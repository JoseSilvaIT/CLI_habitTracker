# CLI_habitTracker for Android (widgets)

Green visual interface Habit Tracker in JS/HTML/CSS with Vite.

![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![Capacitor](https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white)
![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-8.14.3-02303A?style=for-the-badge&logo=gradle&logoColor=white)
![Android SDK](https://img.shields.io/badge/Android%20SDK-36-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Git](https://img.shields.io/badge/Git-181717?style=for-the-badge&logo=git&logoColor=white)

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
