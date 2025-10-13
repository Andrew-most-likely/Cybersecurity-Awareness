# Cybersecurity Awareness Dashboard - Contribution Guide

Thank you for your interest in contributing to the Cybersecurity Awareness Dashboard! This document outlines the current TODO list, implementation status, and guidelines for contributing.

## How to Contribute

We welcome contributions in the following areas:

1. **Code contributions** – Bug fixes, new features, or improvements.
2. **Content contributions** – Adding or improving module content, quizzes, or resources.
3. **Design and UX contributions** – Improving user experience, styling, and accessibility.
4. **Testing** – Reporting bugs, testing new features, and ensuring cross-browser and mobile compatibility.

**Steps to contribute:**

1. Fork the repository.
2. Create a new branch for your work (`git checkout -b feature/your-feature-name`).
3. Make your changes or additions.
4. Commit your changes (`git commit -m "Add your message"`).
5. Push to your fork (`git push origin feature/your-feature-name`).
6. Open a Pull Request to the main repository.

Please ensure that your code follows the existing style and includes proper documentation where applicable.

---

# LearnCyberSafety.org — Vision & Development Roadmap

This roadmap represents a vision for **LearnCyberSafety.org** to become a fully engaging, credible, and user-friendly cybersecurity education platform.

---

## GitHub & Legal Transparency
- ✅ **Privacy & Terms:**  
  Include standalone `privacy.html` and `terms.html` pages with clear language for all users.
- ✅ **Policy Popup:**  
  Show a first-time modal to inform users about site policies, consent, and responsible use.
- ✅ **Footer Integration:**  
  Always-visible links in the footer for Privacy, Terms, and License.

---

## User Experience (UX)
- ✅ **Open Exploration:**  
  Let visitors browse lessons, previews, and modules without signing in, building trust and accessibility.
- [ ] **Personalized Learning Paths:**  
  Prompt users to choose their type of education: Everyday Safety, Student, Professional, or Instructor.  
  Use this to tailor content dynamically.
- ✅ **Interactive Learning Hub:**  
  Develop a visually rich dashboard (`learn.html`) with:
  - Module cards with hover effects and icons  
  - Progress tracking bars  
  - “Continue Learning” buttons that restore saved progress  
  - Consistent theme colors and clean, modern design

---

## Certifications & Verification
- [ ] **PDF Certificates:**  
  Generate automated, personalized certificates with:
  - Learner name, course title, completion date  
  - Unique SHA-256 hash  
  - QR code linking to verification
- [ ] **Hash Storage:**  
  Store certificate hashes securely in Firestore or MySQL for authenticity checks.
- [ ] **Verification Portal:**  
  Enable organizers, teachers, or employers to verify certificates quickly via hash or QR code input.

---

## Email & Notifications
- ✅ **Reliable Emails:**  
  Configure SPF, DKIM, and DMARC to prevent spam issues.
- ✅ **Onboarding Emails:**  
  Send a warm welcome and guidance email to new users.
- ✅ **Password Management:**  
  Implement a full **Forgot Password** and **Reset Password** flow for all users, with clear UI feedback.

---

## Mission Statement & About Us
- ✅ **Create About Page:**
  Create visualy cohesive page that will hold Mission Statement & About Us
- [ ] **About Page:**  
  Clearly explain the purpose, vision, and educational goals of LearnCyberSafety.org.
- [ ] **Mission Statement:**  
  Provide accessible, practical, and free cybersecurity education to empower users to recognize and prevent online threats.
- [ ] **Why We Exist:**  
  Fill the gap in cybersecurity awareness by creating interactive, engaging, and open learning resources for students, professionals, and everyday internet users.

---
