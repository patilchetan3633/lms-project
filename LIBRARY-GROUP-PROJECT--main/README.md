# 📖 Library Management Project
🚀 Introduction

This project is a Library Management System designed with two roles – Admin and Normal User.

# 🔐 Login System

If a user tries to access without logging in, an alert will appear: “Please login first”.

Normal User → Can only view the data (read-only access).

Admin → Has full control with CRUD operations.

# 👨‍💻 Admin Role (Full Access)

Manage Members (Add / Edit / Delete).

Manage Issues (track which book is issued to which member).

Manage Fines (apply or update fines).

Use Search in all modules (Books, Members, Issues, Fines).

# 👤 User Role (Limited Access)

Can only view the data.

Can use Search to quickly find Books, Members, or Issues.

Cannot perform any changes.

# 🔍 Search Feature

Books: Search by book name, author, or ID.

Members: Search by member name 

Issues: Search which book is issued to which member.

Fines: Search fines by member or book.

# 🛠️ Technologies Used

Frontend: React.js

State Management: Redux Toolkit (all data stored in the Redux store).

Backend: JSON Server / API (for fetching and updating data).
