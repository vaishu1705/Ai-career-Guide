"""Seeds the shared catalogue collections (courses, jobs, internships) once."""

from utils.timestamps import now

COURSES = [
    {"title": "Python Programming Masterclass", "provider": "Coursera", "level": "Beginner", "duration": "8 weeks", "rating": 4.8, "price": 0, "tags": ["programming", "python"]},
    {"title": "React — The Complete Guide", "provider": "Udemy", "level": "Intermediate", "duration": "10 weeks", "rating": 4.7, "price": 499, "tags": ["web", "react"]},
    {"title": "Machine Learning Specialization", "provider": "DeepLearning.AI", "level": "Advanced", "duration": "12 weeks", "rating": 4.9, "price": 0, "tags": ["ai", "ml"]},
    {"title": "Data Analysis with Pandas", "provider": "DataCamp", "level": "Beginner", "duration": "6 weeks", "rating": 4.6, "price": 299, "tags": ["data"]},
    {"title": "AWS Cloud Practitioner", "provider": "AWS", "level": "Beginner", "duration": "5 weeks", "rating": 4.5, "price": 0, "tags": ["cloud"]},
    {"title": "Ethical Hacking Bootcamp", "provider": "Udemy", "level": "Intermediate", "duration": "9 weeks", "rating": 4.6, "price": 599, "tags": ["cyber"]},
]

JOBS = [
    {"title": "Software Engineer", "company": "Infosys", "location": "Bengaluru", "remote": False, "salary_min": 800000, "salary_max": 1200000, "level": "Entry", "skills": ["Java", "SQL", "DSA"]},
    {"title": "Frontend Developer", "company": "Zoho", "location": "Chennai", "remote": True, "salary_min": 700000, "salary_max": 1100000, "level": "Entry", "skills": ["React", "CSS", "TypeScript"]},
    {"title": "Data Scientist", "company": "Flipkart", "location": "Bengaluru", "remote": False, "salary_min": 1400000, "salary_max": 2200000, "level": "Mid", "skills": ["Python", "ML", "SQL"]},
    {"title": "ML Engineer", "company": "Fractal", "location": "Pune", "remote": True, "salary_min": 1200000, "salary_max": 1900000, "level": "Mid", "skills": ["PyTorch", "MLOps"]},
    {"title": "Cloud Engineer", "company": "TCS", "location": "Hyderabad", "remote": False, "salary_min": 900000, "salary_max": 1500000, "level": "Entry", "skills": ["AWS", "Docker"]},
    {"title": "Security Analyst", "company": "Wipro", "location": "Remote", "remote": True, "salary_min": 850000, "salary_max": 1400000, "level": "Entry", "skills": ["SIEM", "Linux"]},
]

INTERNSHIPS = [
    {"role": "Web Development Intern", "company": "Zoho", "location": "Chennai", "remote": False, "duration": "6 months", "stipend": 25000, "skills": ["React", "Node"]},
    {"role": "Data Science Intern", "company": "Swiggy", "location": "Bengaluru", "remote": True, "duration": "3 months", "stipend": 35000, "skills": ["Python", "SQL"]},
    {"role": "AI Research Intern", "company": "IIT Madras", "location": "Chennai", "remote": False, "duration": "6 months", "stipend": 20000, "skills": ["ML", "Papers"]},
    {"role": "Cloud Intern", "company": "Freshworks", "location": "Remote", "remote": True, "duration": "4 months", "stipend": 30000, "skills": ["AWS"]},
]


def _seed(collection, docs):
    if collection.count_documents({}) == 0 and docs:
        ts = now()
        collection.insert_many([{**d, "created_at": ts, "updated_at": ts} for d in docs])


def seed_catalogue(db):
    _seed(db.courses, COURSES)
    _seed(db.jobs, JOBS)
    _seed(db.internships, INTERNSHIPS)
