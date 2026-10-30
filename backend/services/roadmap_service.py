"""Roadmap catalogue: levels -> modules -> class / notes / task / project / quiz."""

LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"]

TRACKS = {
    "software-engineer": [
        ("Programming Foundations", ["Variables & Types", "Control Flow", "Functions"]),
        ("Data Structures", ["Arrays & Strings", "Stacks & Queues", "Trees & Graphs"]),
        ("System Design Basics", ["Scalability", "Caching", "Databases"]),
        ("Production Engineering", ["Testing", "CI/CD", "Observability"]),
    ],
    "full-stack-developer": [
        ("Web Fundamentals", ["HTML & CSS", "JavaScript", "Responsive Layouts"]),
        ("Frontend with React", ["Components", "State", "Routing"]),
        ("Backend & APIs", ["Flask REST APIs", "MongoDB", "Authentication"]),
        ("Deployment", ["Docker", "Hosting", "Monitoring"]),
    ],
    "data-scientist": [
        ("Python for Data", ["NumPy", "Pandas", "Cleaning Data"]),
        ("Statistics", ["Distributions", "Hypothesis Testing", "Regression"]),
        ("Machine Learning", ["Supervised Models", "Evaluation", "Feature Engineering"]),
        ("Storytelling", ["Visualization", "Dashboards", "Case Study"]),
    ],
    "ai-engineer": [
        ("ML Foundations", ["Scikit-learn", "Model Training", "Validation"]),
        ("Deep Learning", ["Neural Networks", "CNNs", "Transformers"]),
        ("Applied AI", ["NLP", "Computer Vision", "LLM Apps"]),
        ("MLOps", ["Model Serving", "Pipelines", "Monitoring"]),
    ],
    "cyber-security-analyst": [
        ("Security Basics", ["Networking", "Linux", "Threat Models"]),
        ("Offensive Security", ["Recon", "Web Exploits", "Reporting"]),
        ("Defensive Security", ["SIEM", "Incident Response", "Hardening"]),
        ("Governance", ["Compliance", "Risk", "Audits"]),
    ],
    "cloud-engineer": [
        ("Cloud Basics", ["Compute", "Storage", "Networking"]),
        ("Containers", ["Docker", "Kubernetes", "Helm"]),
        ("Automation", ["Terraform", "CI/CD", "Scripting"]),
        ("Reliability", ["Monitoring", "Scaling", "Cost"]),
    ],
    "ui-ux-designer": [
        ("Design Foundations", ["Typography", "Color", "Layout"]),
        ("Product Thinking", ["User Research", "Personas", "Journeys"]),
        ("Prototyping", ["Figma", "Design Systems", "Handoff"]),
        ("Validation", ["Usability Testing", "Metrics", "Iteration"]),
    ],
}


def build_roadmap(career_slug):
    track = TRACKS.get(career_slug) or TRACKS["software-engineer"]
    roadmap = []
    for index, (title, topics) in enumerate(track):
        module_id = f"{career_slug}-m{index + 1}"
        roadmap.append({
            "module_id": module_id,
            "level": LEVELS[min(index, len(LEVELS) - 1)],
            "order": index + 1,
            "title": title,
            "topics": topics,
            "class": {"title": f"{title} — video class", "duration_min": 45},
            "notes": {"title": f"{title} — notes", "pages": 12},
            "practice_task": {"title": f"{title} — practice task"},
            "mini_project": {"title": f"{title} — mini project"},
            "quiz": {"questions": 10, "pass_score": 60},
            "locked": index > 0,
        })
    return roadmap


def module_by_id(career_slug, module_id):
    return next((m for m in build_roadmap(career_slug) if m["module_id"] == module_id), None)
