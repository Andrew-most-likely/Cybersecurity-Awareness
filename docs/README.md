# LearnCyberSafety

<img width="1916" height="905" alt="BG" src="https://github.com/user-attachments/assets/0c9351fa-68ea-46bf-93b7-7ee72426afdb" />

An interactive cybersecurity awareness platform built for everyone no technical background required. Learn practical online safety through bite-sized lessons, hands-on tools, and real-world scenarios.

**Live at:** [learncybersafety.org](https://learncybersafety.org/)

---

## The Problem

Cyber threats are constantly evolving, yet most people don't know how to protect themselves. Passwords get hacked. Phishing emails fool millions. A single mistake can lead to identity theft, financial loss, or compromised accounts.

But here's the thing: You don't need to be a security expert to stay safe. You just need to know what actually matters.

---

## What You'll Learn

### Password Security
Create strong, unique passwords and understand why password managers are essential to staying secure.

### Two-Factor Authentication
Add a second layer of protection to your accounts so a stolen password alone can't compromise you.

### Phishing Awareness
Spot social engineering tactics before they trick you into giving away sensitive information.

### Software Updates
Understand vulnerabilities and why staying updated is your best defense against known exploits.

### WiFi Security
Navigate public networks safely and secure your home connection from unauthorized access.

### Data Backup
Follow the 3-2-1 backup rule to ensure you never lose critical files to hardware failure or ransomware.

---

## Interactive Tools & Features

**Password Strength Tester**
See in real-time exactly how strong your passwords are and get actionable tips to improve them.

**Phishing Email Detector**
Practice identifying red flags in realistic phishing emails. Learn what to look for before it's too late.

**2FA Simulator**
Experience how two-factor authentication works and understand why it's so effective.

**Cybersecurity Glossary**
Quick reference for security terms and concepts you encounter in the real world.

**Progress Tracking**
Monitor your learning journey with detailed stats on completed modules, quiz scores, and achievements.

**Achievement Badges**
Earn badges as you hit milestones from "First Steps" all the way to "Security Expert."

**Data Export**
Download your progress as a clean JSON file for verification, sharing, or your own records.

**Cloud Sync**
Your learning follows you across devices. Start on desktop, continue on mobile automatically synced.

---

## Tech Stack

- **Frontend:** Vanilla JavaScript, HTML5, CSS3 (lightweight, fast, no framework bloat)
- **Authentication:** Firebase Auth (Email/Password + Google OAuth)
- **Database:** Firestore for secure user data and progress tracking
- **Design:** Custom glassmorphism UI with accessibility built in
- **Hosting:** GitHub Pages

---

## Getting Started

### For Users

Head to [learncybersafety.org](https://learncybersafety.org/), create an account, and start learning.

### For Developers

**Prerequisites**
- Modern browser and text editor
- Node.js or Python (optional, for local testing)
- Firebase account for configuration

**Setup**

1. Clone the repository:
```bash
git clone https://github.com/Andrew-most-likely/Cybersecurity-Awareness.git
cd Cybersecurity-Awareness
```

2. Configure Firebase:
   - Create a project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password and Google OAuth)
   - Enable Firestore Database
   - Update credentials in `firebase.js` and `login.html`

3. Run locally:
```bash
# Using Python 3
python -m http.server 8000

# Or using Node
npx http-server

# Then visit http://localhost:8000
```

4. Deploy to GitHub Pages or your preferred host

**File Structure**
```
├── index.html          Main dashboard
├── login.html          Authentication pages
├── about.html          About and mission
├── scripts.js          Core application logic
├── firebase.js         Firebase configuration
└── Assets/             Images and icons
```

---

## What Makes This Different

**Accessible** - Starts from absolute basics with zero assumptions

**Practical** - Focuses on what actually protects you, not theory

**Digestible** - Learn at your own pace without overwhelming information dumps

**Interactive** - Practice with real scenarios, not just read about concepts

**Free & Open** - Anyone can learn, use, and contribute

---

## Roadmap

- Advanced modules (incident response, privacy protection)
- Video lessons and visual tutorials
- Community forums for peer learning
- Multi-language support
- Mobile applications (iOS/Android)
- Offline mode for learning anywhere
- Instructor tools for educators and trainers

---

## Support

**Found a bug?** Open a GitHub issue with details about what happened.

**Have a question?** Email andrewcappelli13@gmail.com

**Want to suggest a feature?** Create an issue or reach out directly.

---

## Contributing

Found something to improve? Want to add a module? The project welcomes contributions.

**Areas where help is needed:**
- New cybersecurity topics and modules
- Interactive tool ideas
- Design and UX improvements
- Translations for different languages
- Testing and bug reports
- Documentation improvements

**To contribute:**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-idea`)
3. Make your changes and test thoroughly
4. Commit with a clear message (`git commit -m 'Add feature description'`)
5. Push to your branch (`git push origin feature/your-idea`)
6. Open a pull request with details about what you've added

---

## License

MIT License — Use this code for your own projects however you see fit.

---

## Acknowledgments

Built with Firebase for reliable infrastructure. Security guidance from NIST Cybersecurity Framework and CISA. Icons from Font Awesome. Inspired by the fundamental need for better cybersecurity awareness.

---

**The internet is safer when everyone knows how to protect themselves.** If you found this helpful, share it with someone who could benefit from learning these skills.

---

**Questions?** Open an issue or reach out at andrewcappelli13@gmail.com
