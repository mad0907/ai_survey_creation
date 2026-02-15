# 🧠 AI Survey Generator using LangChain + Gemini + Google Forms

This project automatically creates **Google Forms** using **Natural Language Input** from a user.  
You simply describe your survey, and the system generates questions and publishes a live Google Form with linked Google Sheet.

---

## 🚀 Features

- Natural language survey creation
- Automatic Google Form generation
- Google Sheet auto-linking
- Edit Form link return
- Tool-based AI Agent workflow
- Uses Google Gemini LLM + LangChain Agent

---

## 🏗️ Tech Stack

- **Python**
- **LangChain**
- **Google Gemini LLM**
- **Google Apps Script**
- **Requests**
- **dotenv**
- **Jupyter Notebook**

---

## 📦 Installation

Clone the repository:

Install required libraries:

pip install -qU \
langchain \
langchain-google-genai \
langchain-core \
python-dotenv \
requests \
pydantic

## 🔐 Environment Variables
Create a .env file in the root directory.

APIKEY=your_google_api_key_here
MODEL=gemini-2.5-flash

Important:
Do NOT push .env to GitHub. Add it to .gitignore.

▶️ Running the Notebook
Start Jupyter Notebook:

jupyter notebook
Open the notebook file and run cells sequentially.

🤖 Model Used
gemini-2.5-flash
You can change the model in .env if needed.

🔧 Google Apps Script Setup
In the repo, you will find a JavaScript (.js) file.

Copy the entire code.

Go to Google Apps Script Console.

Create a New Project.

Paste the code.

Click Deploy → New Deployment → Web App.

Set:

Access: Anyone

Execute As: Me

Copy the Deployment URL.

Replace the APPS_SCRIPT_URL in Python code.

🔄 How the Flow Works
Step-by-Step Flow
User Input

User provides survey topic, tone, and number of questions.

LangChain Agent

Acts like a smart robot.

Understands user intent.

Gemini LLM

Generates survey JSON configuration.

Creates structured questions.

Tool 1 – Generate Survey Config

Converts natural language into JSON.

Tool 2 – Call Google Form API

Sends JSON to Google Apps Script.

Google Apps Script

Creates Google Form.

Links Google Sheet.

Publishes form.

Output Returned

Form Link

Sheet Link

Edit Form Link

📁 Project Structure
project/
│
├── notebook.ipynb
├── appscript.js
├── .env
└── README.md

## ⚠️ Notes
Ensure API key is valid.

Ensure Apps Script is deployed as Web App.

Internet connection required.

Do not expose API keys publicly.

## 💡 Example Input
Survey Topic: AI in Education
Tone: Fun
Questions: 5

## 🎯 Output
Google Form Link

Linked Google Sheet

Editable Form Link