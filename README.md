# JEE Architect Pro: Precision Timetable & Persistence Engine

The Mission

The JEE Architect Pro is not a "todo list." It is a clinical execution environment designed for high-stakes exam preparation. It operates on the principle of extreme accountability: your failures (uncompleted tasks) aren't forgotten—they are forcefully carried forward into the next week until they are dealt with.

🛠 Core Architectural Features

1. Sunday Night Rollover (Automated)

The system is hard-wired to the calendar. Every Monday at 00:00:00, the system triggers a structural shift:

Completed Tasks: Purged to maintain a clean workspace.

Incomplete Tasks: Cloned and migrated to the next week with a BACKLOG tag.

Week Counter: Automatically increments to reflect the progression of time.

2. Mission 2027 Countdown

A high-precision countdown timer fixed on January 10th, 2027. It tracks Days, Hours, Minutes, and Seconds. It is a constant visual reminder of the diminishing window for preparation.

3. Persistence & Cloud Sync

Built with a Firebase/Firestore backend, your schedule is synced in real-time. Whether you access it from a desktop or mobile, your backlog follows you.

4. The "Surrender" Protocol (Delete Logic)

Deletion is treated as a form of surrender. To remove a task or a backlog, you must interact with a specialized modal that forces you to confirm you are giving up on that specific objective.

5. Undo & Hard Reset

A 20-step history buffer allows for immediate recovery from accidental edits, while the Hard Reset menu allows for a total system purge if a complete strategy overhaul is required.

🚀 How to Use

Deployment: click on 🔗https://naman1511.github.io/jee-study-timetable/. The system will automatically authenticate you via a secure anonymous cloud token.

Strategy Entry: Click into any cell (Time, Subject, or Topic) to edit your strategy for the week.

Execution: As you finish tasks, check the status box. The row will dim, signifying a completed objective.

The Monday Reality: Open the app every Monday to see your "Backlog" list—these are the ghosts of your previous week. Prioritize them.

Syncing: Use the 'Sync' button to force a cloud backup, ensuring your data is never lost to local browser cache issues.

⚖️ Technical Stack

Frontend: HTML5, Tailwind CSS, Space Grotesk Typography.

Logic: Vanilla JavaScript (ES6 Modules).

Backend: Firebase Auth & Firestore.

Time Engine: Native JS Date/Time API with rollover listeners.

Built for those who prefer the hard truth over comfortable lies.
