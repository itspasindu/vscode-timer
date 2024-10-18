
# Coding Timer Extension for VS Code

This **Coding Timer Extension** helps developers track the time spent coding in Visual Studio Code. It allows you to start, pause, stop a timer, and generate reports for your daily, weekly, and monthly coding activity.

## Features
- **Start, Pause, and Stop Timer**: Easily manage your coding sessions using intuitive buttons or commands.
- **Real-time Timer Display**: The time spent coding is displayed in the status bar.
- **Daily, Weekly, and Monthly Reports**: Get insights into your coding habits with detailed time reports.
- **Persistent Session Logs**: All coding sessions are logged in a JSON file for future reference.

## Installation

### Prerequisites
- **Visual Studio Code**: Ensure you have VS Code installed on your machine. [Download here](https://code.visualstudio.com/).


### Starting, Pausing, and Stopping the Timer
Once the extension is installed, you can start tracking your coding time:

- **Start Timer**: 
  - Click the `$(play) Start Timer` button in the status bar or use the Command Palette (`Ctrl+Shift+P`), then type `Start Timer`.
  
- **Pause Timer**: 
  - Click the `$(debug-pause) Pause Timer` button or type `Pause Timer` in the Command Palette.

- **Stop Timer**: 
  - Click the `$(debug-stop) Stop Timer` button or type `Stop Timer` in the Command Palette.

### Viewing Time Reports
To see how much time you've spent coding:

- **Daily Report**: 
  - Use `Ctrl+Shift+P`, type `Get Daily Coding Report`, and press Enter. A popup will show your total coding time for the day.
  
- **Weekly Report**: 
  - Use `Ctrl+Shift+P`, type `Get Weekly Coding Report`, and press Enter to see the total coding time for the current week.

- **Monthly Report**: 
  - Use `Ctrl+Shift+P`, type `Get Monthly Coding Report`, and press Enter to view the total time spent coding this month.

### Status Bar Timer
The current coding session's elapsed time is displayed in the status bar as you code, like `$(clock) 00:25` (for 25 minutes).

### Customize Keyboard Shortcuts
You can assign keyboard shortcuts to the commands for starting, pausing, and stopping the timer:
1. Go to **File > Preferences > Keyboard Shortcuts**.
2. Search for the following commands:
   - `Start Timer`
   - `Pause Timer`
   - `Stop Timer`
3. Set your preferred shortcuts.

## Persistent Data
The extension logs your coding sessions in a JSON file (`coding-time-log.json`). This file is used to generate your daily, weekly, and monthly reports.

### Example Log File (`coding-time-log.json`):
```json
[
  {
    "date": "2024-10-18T10:20:30.123Z",
    "duration": 25.5
  },
  {
    "date": "2024-10-19T09:15:10.456Z",
    "duration": 40
  }
]
```
- **Date**: The date and time the coding session was logged.
- **Duration**: Duration of the coding session in minutes.


## Contributing
Feel free to fork this repository and submit pull requests if you'd like to contribute improvements.
