import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.units import inch

pdf_path = os.path.join(r"c:\portfolio_org\assets", "resume.pdf")

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=A4,
    rightMargin=36,
    leftMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()

# Custom styles in nude/warm palette
title_style = ParagraphStyle(
    'TitleStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    alignment=1, # Center
    textColor=colors.HexColor('#302820')
)

subtitle_style = ParagraphStyle(
    'SubtitleStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=14,
    alignment=1,
    textColor=colors.HexColor('#806652')
)

contact_style = ParagraphStyle(
    'ContactStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=12,
    alignment=1,
    textColor=colors.HexColor('#555555')
)

section_heading_style = ParagraphStyle(
    'SectionHeadingStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=10.5,
    leading=13,
    textColor=colors.HexColor('#302820')
)

body_style = ParagraphStyle(
    'BodyStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.8,
    leading=12,
    textColor=colors.HexColor('#333333')
)

bold_body_style = ParagraphStyle(
    'BoldBodyStyle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8.8,
    leading=12,
    textColor=colors.HexColor('#222222')
)

meta_style = ParagraphStyle(
    'MetaStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11,
    alignment=2, # Right
    textColor=colors.HexColor('#666666')
)

bullet_style = ParagraphStyle(
    'BulletStyle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=8.5,
    leading=11.5,
    leftIndent=12,
    textColor=colors.HexColor('#333333')
)

elements = []

# Header
elements.append(Paragraph("MANASA", title_style))
elements.append(Spacer(1, 2))
elements.append(Paragraph("COMPUTER SCIENCE GRADUATE &nbsp;|&nbsp; ASPIRING DEVOPS ENGINEER", subtitle_style))
elements.append(Spacer(1, 4))
elements.append(Paragraph("+91 8891431898 &nbsp;•&nbsp; manasavenu88914@gmail.com &nbsp;•&nbsp; linkedin.com/in/manasa-5a795625b &nbsp;•&nbsp; github.com/manasavenu-2004", contact_style))
elements.append(Spacer(1, 8))
elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#806652'), spaceAfter=8))

# Function for section header
def add_section_header(title):
    elements.append(Paragraph(title.upper(), section_heading_style))
    elements.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#D7C3AE'), spaceBefore=2, spaceAfter=6))

# Career Objective
add_section_header("Career Objective")
elements.append(Paragraph(
    "Computer Science graduate with a solid foundation in Linux, systems engineering, programming, and core computer science fundamentals. Passionate about automation, cloud infrastructure, containerization, and building reliable CI/CD deployment pipelines. Motivated to contribute as an Aspiring DevOps Engineer while continuously expanding modern DevOps practices.",
    body_style
))
elements.append(Spacer(1, 8))

# Education
add_section_header("Education")

edu_data = [
    [
        Paragraph("<b>Vidya Academy of Science and Technology</b> — Thrissur, India", bold_body_style),
        Paragraph("2022 – 2026", meta_style)
    ],
    [
        Paragraph("Bachelor of Technology in Computer Science and Engineering — <b>CGPA: 9.09 / 10</b>", body_style),
        Paragraph("", meta_style)
    ],
    [
        Paragraph("<b>BHARATH VIDYA MANDIR</b> — Thrissur, India", bold_body_style),
        Paragraph("2020 – 2022", meta_style)
    ],
    [
        Paragraph("Class XII — CBSE — <b>79%</b>", body_style),
        Paragraph("", meta_style)
    ],
    [
        Paragraph("<b>BHARATH VIDYA MANDIR</b> — Thrissur, India", bold_body_style),
        Paragraph("2020", meta_style)
    ],
    [
        Paragraph("Class X — CBSE — <b>85.2%</b>", body_style),
        Paragraph("", meta_style)
    ]
]
t_edu = Table(edu_data, colWidths=[410, 110])
t_edu.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ('TOPPADDING', (0,0), (-1,-1), 1),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
]))
elements.append(t_edu)
elements.append(Spacer(1, 8))

# Certifications
add_section_header("Certifications")
cert_data = [
    [Paragraph("• <b>Red Hat Certified System Administrator (RHCSA)</b> — Red Hat", body_style)],
    [Paragraph("• <b>Python 3.4.3 Training</b> — IIT Bombay", body_style)],
    [Paragraph("• <b>SQL Programming</b> — Oracle", body_style)],
    [Paragraph("• <b>Python Programming</b> — Infosys Springboard", body_style)],
]
t_cert = Table(cert_data, colWidths=[520])
t_cert.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
    ('TOPPADDING', (0,0), (-1,-1), 1.5),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
]))
elements.append(t_cert)
elements.append(Spacer(1, 8))

# Technical Skills
add_section_header("Technical Skills")
skills_data = [
    [Paragraph("<b>Languages:</b>", bold_body_style), Paragraph("Python, SQL", body_style)],
    [Paragraph("<b>Systems & Concepts:</b>", bold_body_style), Paragraph("Linux, Linux CLI, Operating Systems, Computer Networks, DBMS, Data Structures & Algorithms", body_style)],
    [Paragraph("<b>Development Tools:</b>", bold_body_style), Paragraph("VS Code, PyCharm, Linux CLI, Git, GitHub", body_style)],
    [Paragraph("<b>DevOps Learning Path:</b>", bold_body_style), Paragraph("Linux Administration, Git Workflows, Shell Scripting, AWS Cloud Fundamentals", body_style)],
    [Paragraph("<b>Soft Skills:</b>", bold_body_style), Paragraph("Adaptability, Teamwork, Time Management, Leadership, Analytical Thinking", body_style)],
]
t_skills = Table(skills_data, colWidths=[125, 395])
t_skills.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
    ('TOPPADDING', (0,0), (-1,-1), 1.5),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
]))
elements.append(t_skills)
elements.append(Spacer(1, 8))

# Projects
add_section_header("Projects")

proj1_hdr = [
    [Paragraph("<b>MediTrust — Intelligent Hospital and Drug Interaction Platform</b>", bold_body_style), Paragraph("2026", meta_style)]
]
t_p1 = Table(proj1_hdr, colWidths=[420, 100])
t_p1.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ('TOPPADDING', (0,0), (-1,-1), 1),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
]))
elements.append(t_p1)
elements.append(Paragraph("• Developed an AI-powered healthcare platform for drug interaction prediction, hospital management, and patient monitoring.", bullet_style))
elements.append(Paragraph("• Implemented a Graph Neural Network (GNN) using PyTorch to detect harmful drug-drug interactions and improve medication safety.", bullet_style))
elements.append(Paragraph("• Built web and mobile applications using Django and Flutter with MySQL backend database.", bullet_style))
elements.append(Paragraph("• <i>Technology Stack: Python, Django, Flutter, MySQL, PyTorch, GNN, Gemini AI.</i>", ParagraphStyle('TechStack', parent=body_style, fontSize=8, leftIndent=12, textColor=colors.HexColor('#555555'))))
elements.append(Spacer(1, 5))

proj2_hdr = [
    [Paragraph("<b>Predicting Smartphone Dependency — A Machine Learning Perspective</b>", bold_body_style), Paragraph("2025", meta_style)]
]
t_p2 = Table(proj2_hdr, colWidths=[420, 100])
t_p2.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ('TOPPADDING', (0,0), (-1,-1), 1),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
]))
elements.append(t_p2)
elements.append(Paragraph("• Built an ML-based web application to predict smartphone addiction using Decision Tree and Random Forest algorithms.", bullet_style))
elements.append(Paragraph("• Developed a Django-based interface for user input, prediction, and performance analysis.", bullet_style))
elements.append(Paragraph("• Analyzed datasets using Python and Pandas to identify patterns and evaluate model performance.", bullet_style))
elements.append(Paragraph("• <i>Technology Stack: Python, Django, Scikit-Learn, Pandas, HTML, CSS.</i>", ParagraphStyle('TechStack2', parent=body_style, fontSize=8, leftIndent=12, textColor=colors.HexColor('#555555'))))
elements.append(Spacer(1, 8))

# Internship Experience
add_section_header("Internship Experience")
intern_hdr = [
    [Paragraph("<b>Artificial Intelligence and Machine Learning Intern</b>", bold_body_style), Paragraph("ICT Academy of Kerala", meta_style)]
]
t_intern = Table(intern_hdr, colWidths=[380, 140])
t_intern.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ('TOPPADDING', (0,0), (-1,-1), 1),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
]))
elements.append(t_intern)
elements.append(Paragraph(
    "Developed strong hands-on skills in Python, data preprocessing, supervised and unsupervised machine learning algorithms, and AI applications. Gained practical experience through real-world projects and case studies involving predictive modeling, classification, and AI-based solutions.",
    body_style
))

# Build Document
doc.build(elements)
print("Resume PDF successfully generated at:", pdf_path)
