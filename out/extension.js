"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
let interval;
let timerStatusBarItem;
let startButton;
let pauseButton;
let stopButton;
let seconds = 0;
let minutes = 0;
let isRunning = false;
const logFilePath = path.join(__dirname, 'coding-time-log.json');
function activate(context) {
    // Create buttons
    timerStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    startButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 99);
    pauseButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 98);
    stopButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 97);
    updateTimerStatus();
    updateButtonStates();
    // Register commands
    context.subscriptions.push(vscode.commands.registerCommand('codingTimer.start', startTimer), vscode.commands.registerCommand('codingTimer.pause', pauseTimer), vscode.commands.registerCommand('codingTimer.stop', stopTimer), vscode.commands.registerCommand('codingTimer.dailyReport', generateDailyReport), vscode.commands.registerCommand('codingTimer.weeklyReport', generateWeeklyReport), vscode.commands.registerCommand('codingTimer.monthlyReport', generateMonthlyReport));
    // Setup buttons
    startButton.text = "$(play) Start Timer";
    startButton.command = "codingTimer.start";
    startButton.show();
    pauseButton.text = "$(debug-pause) Pause Timer";
    pauseButton.command = "codingTimer.pause";
    pauseButton.show();
    stopButton.text = "$(debug-stop) Stop Timer";
    stopButton.command = "codingTimer.stop";
    stopButton.show();
}
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(() => {
            seconds++;
            if (seconds >= 60) {
                minutes++;
                seconds = 0;
            }
            updateTimerStatus();
        }, 1000);
        updateButtonStates();
    }
}
function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
        logSession();
    }
    updateButtonStates();
}
function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(interval);
        logSession();
        seconds = 0;
        minutes = 0;
        updateTimerStatus();
    }
    updateButtonStates();
}
function updateTimerStatus() {
    const formattedTime = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    timerStatusBarItem.text = `$(clock) ${formattedTime}`;
    timerStatusBarItem.show();
}
function updateButtonStates() {
    if (isRunning) {
        startButton.hide();
        pauseButton.show();
    }
    else {
        startButton.show();
        pauseButton.hide();
    }
}
function logSession() {
    const sessionDuration = minutes + seconds / 60;
    const logData = {
        date: new Date().toISOString(),
        duration: sessionDuration // in minutes
    };
    // Read the existing log file or create a new one
    let logFileContent = [];
    if (fs.existsSync(logFilePath)) {
        const existingData = fs.readFileSync(logFilePath, 'utf-8');
        logFileContent = JSON.parse(existingData);
    }
    logFileContent.push(logData);
    fs.writeFileSync(logFilePath, JSON.stringify(logFileContent, null, 2));
}
function generateDailyReport() {
    const report = generateReport('day');
    vscode.window.showInformationMessage(`Today's coding time: ${report} minutes.`);
}
function generateWeeklyReport() {
    const report = generateReport('week');
    vscode.window.showInformationMessage(`This week's coding time: ${report} minutes.`);
}
function generateMonthlyReport() {
    const report = generateReport('month');
    vscode.window.showInformationMessage(`This month's coding time: ${report} minutes.`);
}
function generateReport(period) {
    if (!fs.existsSync(logFilePath)) {
        return 0;
    }
    const logData = JSON.parse(fs.readFileSync(logFilePath, 'utf-8'));
    const now = new Date();
    let totalMinutes = 0;
    logData.forEach((entry) => {
        const entryDate = new Date(entry.date);
        if (isInSamePeriod(entryDate, now, period)) {
            totalMinutes += entry.duration;
        }
    });
    return totalMinutes;
}
function isInSamePeriod(date1, date2, period) {
    if (period === 'day') {
        return date1.toDateString() === date2.toDateString();
    }
    else if (period === 'week') {
        const startOfWeek = new Date(date2.setDate(date2.getDate() - date2.getDay()));
        return date1 >= startOfWeek && date1 <= new Date();
    }
    else if (period === 'month') {
        return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    }
    return false;
}
function deactivate() {
    clearInterval(interval);
}
//# sourceMappingURL=extension.js.map