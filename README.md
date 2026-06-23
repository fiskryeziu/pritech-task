# Expo Tasks App

A simple task management mobile app built with Expo, React Native, and Expo Router.  
It allows users to create, filter, search, toggle, and delete tasks with a minimal UI.

---

https://github.com/user-attachments/assets/4dea9f28-3be9-431b-bab4-16c132b50d77

## Features

- Create tasks
- Toggle task status (pending / completed)
- Delete tasks
- Filter tasks by status (all / pending / completed)
- Search tasks by title
- Empty state handling
- Loading state handling
- Floating action button for navigation
- Context-based state management
- NativeWind styling

---

## Tech Stack

- Expo
- React Native
- Expo Router
- TypeScript
- React Context API
- NativeWind
- Ionicons

---

## Project Structure

```txt
app/
  +html.tsx
  +not-found.tsx
  _layout.tsx

  (tabs)/
    _layout.tsx
    index.tsx

  task/
    new.tsx
    [id].tsx

components/
  filter-btn.tsx
  search-empty.tsx
  task-card.tsx
  checkbox.tsx

store/
  context.tsx
```

## Setup Instructions

### Prerequisites

- Node.js (LTS version recommended)
- npm
- Expo CLI (optional)

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-name>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npx expo start
```

### 4. Run the application

After the Expo development server starts:

- Press `a` to open the Android emulator
- Press `i` to open the iOS simulator (macOS only)
- Press `w` to run the web version
- Scan the QR code with the Expo Go app on your mobile device

## State Management

Tasks are managed using a React Context (`useTasks`) that centralizes task-related state and actions across the application.

Available values and methods:

- `tasks` – List of all tasks
- `loading` – Loading state indicator
- `toggleTask(id)` – Toggle a task between pending and completed
- `deleteTask(id)` – Remove a task
- `addTask({test,description})` – Add a task


---

## Filtering

Tasks can be filtered using:

- Status filter: `all`, `pending`, or `completed`
- Search filter: case-insensitive match against the task title

Both filters are applied before rendering the task list.

---

## UI Behavior

- Displays a loading state while data is being initialized
- Displays an empty state when no tasks exist
- Displays a "No matches" message when filters return no results
- Provides a floating action button for quick task creation
- Navigates users to the task creation screen when the button is pressed

---

## Navigation

Navigation is implemented using Expo Router.

Available routes:

- `/` → Task list screen
- `/task/new` → Create task screen
- `/task/[id]` → Task details/edit screen

