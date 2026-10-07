from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pypdf import PdfReader
import os
import json
import time
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel, Field


load_dotenv()
my_api_key=os.getenv("GROQ_API_KEY")

if not my_api_key:
    raise ValueError("no API KEY")

client=Groq(api_key=my_api_key)
model = "openai/gpt-oss-120b"


app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



#parsing the resume

class Experience(BaseModel):
    company: str | None = None
    role: str | None = None
    duration: str | None = None
    description: str | None = None
    skills_used: list[str] = []

class Resume(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None

    total_experience_years: float | None = None

    skills: list[str] = []
    experiences: list[Experience] = []
    education: list[str] = []
    projects: list[str] = []
    certifications: list[str] = []
resume_schema = Resume.model_json_schema()


class ChatRequest(BaseModel):
    question : str

def ask_candidate(question: str, resume: Resume):
    system_prompt = f"""
    You are an expert recruiter.

    You have the following resume information:

    {resume.model_dump_json(indent=2)}

    Answer the candidate's question based on the resume information.
    If the answer is not available in the resume, respond with "I don't know".
    """
    user_prompt = f"""
    Candidate's question: {question}
    """
    message_system={
        "role" : "system",
        "content" : system_prompt
    }
    message_user={
        "role" : "user",
        "content" : user_prompt
    }
    messages=[message_system, message_user]
    response=client.chat.completions.create(model=model, messages=messages)
    answer = response.choices[0].message.content
    return answer


def parse_resume(resume_text):
    system_prompt = f"""
    You are an expert resume parser.

    Extract information from the resume based on its meaning,
    not only based on exact section headings.

    Different resumes may use different headings.

    For example:
    - Experience
    - Professional Experience
    - Work History
    - Employment
    - Internships

    These may all contain relevant experience.

    Skills may also appear in the skills section, work experience,
    internships or projects.

    Return ONLY valid JSON matching this schema:

    {resume_schema}

    Important rules:

    1. Do not invent information.
    2. If a value is not available, return null.
    3. If a list has no information, return an empty list.
    4. Include internships inside experiences.
    5. Extract skills mentioned across the entire resume.
    """
    user_prompt = f"""
    Parse the following resume:

    {resume_text}
    """
    message_system={
        "role" : "system",
        "content" : system_prompt
    }
    message_user={
        "role" : "user",
        "content" : user_prompt
    }
    messages=[message_system, message_user]
    response_format={
        "type": "json_object"
    }
    response=client.chat.completions.create(model=model, messages=messages, response_format=response_format)
    raw_output = response.choices[0].message.content
    data = json.loads(raw_output)
    resume = Resume(**data)
    return resume



#pdf extraction
def read_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text        


@app.get("/")
def home():
    resume_text = read_pdf(Path("RESUME2K26.pdf"))
    resume = parse_resume(resume_text)
    print(resume.model_dump_json(indent=2))
    return{
        "message" : "resume parser is running"
    }


@app.post("/chat")
def chat(request: ChatRequest):
    resume_text = read_pdf(Path("RESUME2K26.pdf"))
    resume = parse_resume(resume_text)
    answer = ask_candidate(request.question, resume)
    return {
        "answer" : answer
    }