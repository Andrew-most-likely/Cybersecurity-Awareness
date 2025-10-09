/************************************************************************
 * Utilities
 ************************************************************************/
const $ = (sel) => document.querySelector(sel);
const qs = (sel) => Array.from(document.querySelectorAll(sel));

// In-memory storage
const appState = {
  /*
  theme: "light",
  */
  progress: {},
  quizAnswers: {},
  badges: [],
  startTime: Date.now(),
};

/************************************************************************
 * Module Data with difficulty and time estimates
 ************************************************************************/
const MODULES = [
  {
    id: "password",
    icon: "lock",
    title: "Password Security",
    description:
      "Learn to create strong, unique passwords and manage them safely.",

    progress: { completed: 0, total: 3 },
    sections: [
      {
        type: "introduction",
        title: "Why Passwords Matter",
        objectives: [
          "Understand how passwords protect your digital life",
          "Learn about common password vulnerabilities",
          "Recognize the cost of password breaches",
        ],

        content: `
Passwords are the first line of defense for protecting your online accounts and personal data. They prove that you are the rightful owner of your account every time you log in. If someone gains access to your passwords, they can impersonate you, steal your identity, or gain control of your finances and sensitive information.

Many people underestimate how valuable their data is to criminals. Hackers can use stolen passwords to access email, bank accounts, or social media. They may also sell your credentials on the dark web to other criminals. Even if you think you have nothing to hide, your personal information can be used in scams, identity theft, and fraud.

Common password weaknesses include using short passwords, predictable words, or reusing the same password across multiple accounts. If one site is breached, attackers can use your reused password to break into others. By understanding the importance of strong passwords, you can take real steps to protect your online life.
        `,
      },
      {
        type: "lesson",
        title: "Creating Strong Passwords",
        objectives: [
          "Use long passwords with mixed characters",
          "Avoid predictable or personal information",
          "Make each password unique",
        ],

        content: `
A strong password is one that attackers cannot easily guess or crack. The best passwords are long, complex, and unique for each account. You should always use at least twelve characters, mixing uppercase and lowercase letters, numbers, and symbols.

Avoid using dictionary words, your name, birthdate, pet names, or common patterns like "12345" or "qwerty." Attackers often use automated tools that can guess thousands of passwords per second, especially those that follow predictable patterns.

One approach is to use a passphrase. This is a series of random but memorable words, like "CoffeeRiverBridgeLight." A passphrase is easier to remember and can still be extremely secure, especially if you include numbers or symbols.

Every account you have should use a different password. If one is stolen, your others remain safe. Consider writing down a strong password example such as "Tr33!Rain7Horse$Map" — complex, long, and unique.
        `,
      },
      {
        type: "tool",
        title: "Password Managers",
        objectives: [
          "Understand how password managers work",
          "Learn to choose a reputable password manager",
          "Set up your first password vault",
        ],

        content: `
A password manager securely stores all of your passwords in one encrypted vault. It helps you create and use strong passwords without needing to remember each one. You only need to remember one master password to unlock your vault.

Most password managers can automatically fill in your credentials when you visit a login page. They can also generate random, highly secure passwords for new accounts. Reputable password managers encrypt your data locally, meaning even the company cannot access your passwords.

When choosing a password manager, look for one with a strong reputation, transparent security practices, and support for multi-device syncing. Examples include Bitwarden, 1Password, and Dashlane. Avoid unknown or unverified tools.

After installing a password manager, create a master password that is long and memorable but unique to you. Once your vault is ready, start saving all of your existing passwords inside it and let the manager generate new ones going forward.
        `,
      },
    ],
  },
  {
    id: "2fa",
    icon: "shield",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of protection to your online accounts.",

    progress: { completed: 0, total: 2 },
    sections: [
      {
        type: "introduction",
        title: "What is Two-Factor Authentication",
        objectives: [
          "Learn how two-factor authentication works",
          "Understand different types of 2FA",
          "Know when to use it",
        ],

        content: `
Two-Factor Authentication, often called 2FA, adds a second layer of security to your accounts. It means that even if someone steals your password, they still need another piece of information to log in.

The most common forms of 2FA are one-time codes sent to your phone or generated by an authentication app. Other types include hardware security keys, biometric factors like fingerprints, or codes sent by email. The idea is that access requires both something you know (your password) and something you have (your phone or device).

Without 2FA, a stolen password alone can give an attacker full access. With it enabled, even a hacker who knows your password would also need your physical device to get in. It greatly reduces your risk of being hacked.
        `,
      },
      {
        type: "lesson",
        title: "Setting Up Two-Factor Authentication",
        objectives: [
          "Enable 2FA on your important accounts",
          "Use an authenticator app instead of SMS",
          "Store backup codes safely",
        ],

        content: `
You should enable two-factor authentication on every important account, including email, banking, and social media. Most major websites support it in their security or privacy settings.

When setting it up, choose an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator instead of using text messages. SMS codes can sometimes be intercepted if someone tricks your phone company into transferring your number.

After enabling 2FA, you will scan a QR code with your app, which then starts generating short one-time codes. These codes change every 30 seconds and must be entered along with your password when logging in.

Make sure to save your backup codes in a secure place, such as your password manager or a printed copy stored safely. Backup codes are the only way to recover access if you lose your phone.
        `,
      },
    ],
  },
  {
    id: "phishing",
    icon: "phish",
    title: "Phishing Awareness",
    description: "Learn how to spot and avoid phishing attacks.",

    progress: { completed: 0, total: 2 },
    sections: [
      {
        type: "introduction",
        title: "Understanding Phishing",
        objectives: [
          "Recognize common phishing tactics",
          "Identify red flags in emails and messages",
          "Understand the dangers of phishing attacks",
        ],

        content: `
Phishing is a type of scam where attackers trick you into giving away sensitive information, such as passwords, banking details, or personal data. It often comes in the form of an email or message that looks like it is from a trusted source.

A typical phishing email may claim that there is a problem with your account or that you need to verify your identity. It often contains links to fake websites that look nearly identical to real ones. When you enter your information, it goes directly to the attacker.

Common signs of phishing include poor grammar, urgent or threatening language, suspicious links, or requests for personal data. Always take time to verify who sent the message before clicking or replying.
        `,
      },
      {
        type: "practice",
        title: "Spotting Phishing",
        objectives: [
          "Check sender addresses carefully",
          "Hover over links before clicking",
          "Watch for urgency or threats",
        ],

        content: `
Before you click any link, check the sender's address carefully. Many phishing emails come from addresses that look similar to legitimate ones but contain slight differences, such as support@paypa1.com instead of support@paypal.com.

Hover your mouse over any links to see where they lead before you click them. If the address looks suspicious or unfamiliar, do not proceed.

Attackers often try to create a sense of urgency, such as warning you that your account will be closed unless you act immediately. This is a manipulation tactic. Take your time to verify the message through official websites or customer support instead of reacting quickly.

Always remember, legitimate companies will never ask you to provide passwords or financial information through email or text messages.
        `,
      },
    ],
  },
  {
    id: "updates",
    icon: "refresh",
    title: "Software Updates",
    description: "Learn why keeping your software updated keeps you safe.",

    progress: { completed: 0, total: 1 },
    sections: [
      {
        type: "lesson",
        title: "Why Updates Matter",
        objectives: [
          "Understand software vulnerabilities",
          "Learn about zero-day exploits",
          "Enable automatic updates",
        ],

        content: `
Software updates are not just about new features. They often include critical security patches that fix vulnerabilities found by researchers or attackers. When software remains unpatched, criminals can exploit those weaknesses to gain access to your device or data.

A zero-day exploit is an attack that targets a vulnerability before the developer knows about it or releases a fix. This is why keeping software up to date is essential. Even a few days of delay can leave your system at risk.

Always enable automatic updates for your operating system, browser, and important applications. This ensures that you receive security fixes as soon as they become available without having to remember to check manually.
        `,
      },
    ],
  },
  {
    id: "wifi",
    icon: "wifi",
    title: "WiFi Security",
    description: "Protect yourself on public and home wireless networks.",

    progress: { completed: 0, total: 1 },
    sections: [
      {
        type: "lesson",
        title: "Secure WiFi Practices",
        objectives: [
          "Use VPNs on public networks",
          "Secure your home router",
          "Avoid sensitive transactions on public WiFi",
        ],

        content: `
Public WiFi networks, like those in coffee shops or airports, are convenient but often insecure. Attackers can intercept unencrypted data on these networks to steal personal information such as passwords or credit card numbers. Avoid logging into sensitive accounts or making payments while using public WiFi.

If you must connect, use a Virtual Private Network, or VPN, to encrypt your internet traffic. This prevents others on the same network from viewing what you are doing.

At home, secure your router by changing its default administrator password and using strong encryption, such as WPA3. Regularly update your router's firmware and disable remote management features you do not need.

By following these practices, you greatly reduce the risk of your network traffic being intercepted or your devices being compromised.
        `,
      },
    ],
  },
  {
    id: "backup",
    icon: "save",
    title: "Data Backup",
    description: "Protect your important data with regular backups.",

    progress: { completed: 0, total: 1 },
    sections: [
      {
        type: "lesson",
        title: "Backup Strategies",
        objectives: [
          "Follow the 3-2-1 backup rule",
          "Use both cloud and local backups",
          "Test your backups regularly",
        ],

        content: `
Data loss can happen at any time due to hardware failure, accidental deletion, or malware. Backing up your data ensures that you can recover it even if your device is damaged or compromised.

The 3-2-1 backup rule is a simple and effective strategy. Keep three copies of your data: one primary and two backups. Store them on at least two different types of media, such as a hard drive and a cloud service, and keep one copy off-site, such as in cloud storage or at another location.

Use reliable cloud storage services for automatic backups, but also keep a local backup on an external drive. Schedule regular backups and verify that they work by testing file recovery occasionally.

By maintaining backups, you protect yourself from permanent data loss and ensure that your information is always recoverable.
        `,
      },
    ],
  },
];


/************************************************************************
 * Quiz Data - Expanded
 ************************************************************************/

const QUIZZES = [
  {
    id: "password-quiz",
    title: "Password Security Quiz",
    questions: [
      {
        question:
          "What is the minimum recommended length for a strong password?",
        options: [
          "6 characters",
          "8 characters",
          "12 characters",
          "20 characters",
        ],
        correct: 2,
        explanation:
          "Passwords should be at least 12 characters long to provide adequate security against brute force attacks.",
      },
      {
        question: "Which is the most secure type of two-factor authentication?",
        options: [
          "SMS codes",
          "Email codes",
          "Authenticator app",
          "Security questions",
        ],
        correct: 2,
        explanation:
          "Authenticator apps are more secure than SMS because they can't be intercepted and work offline.",
      },
      {
        question:
          "What should you do if you receive a suspicious email asking you to verify your account?",
        options: [
          "Click the link to verify",
          "Reply with your information",
          "Delete it and contact the company directly",
          "Forward it to friends",
        ],
        correct: 2,
        explanation:
          "Never click suspicious links. Instead, delete the email and contact the company through official channels to verify.",
      },
    ],
  },
  {
    id: "phishing-quiz",
    title: "Phishing Detection Challenge",
    questions: [
      {
        question: "Which is a common sign of a phishing email?",
        options: [
          "Professional formatting",
          "Urgent language demanding immediate action",
          "Company logo",
          "Proper grammar",
        ],
        correct: 1,
        explanation:
          "Phishing emails often create a false sense of urgency to pressure victims into acting without thinking.",
      },
      {
        question: "Before clicking a link, you should:",
        options: [
          "Just click it",
          "Check if it looks legitimate",
          "Hover over it to see the actual URL",
          "Trust the sender",
        ],
        correct: 2,
        explanation:
          "Always hover over links to see where they actually point before clicking. Phishers often disguise malicious URLs.",
      },
    ],
  },
  {
    id: "updates-quiz",
    title: "Software Updates Quiz",
    questions: [
      {
        question: "Why are software updates important for security?",
        options: [
          "They make software faster",
          "They patch known vulnerabilities",
          "They add new features",
          "They're optional",
        ],
        correct: 1,
        explanation:
          "Updates patch security vulnerabilities that hackers could exploit. Keeping software updated is critical.",
      },
      {
        question: "What is a zero-day exploit?",
        options: [
          "An exploit that takes zero days to fix",
          "An attack on day zero of software release",
          "A vulnerability unknown to the software maker",
          "A free exploit tool",
        ],
        correct: 2,
        explanation:
          "Zero-day exploits target vulnerabilities that are unknown to the software vendor, making them especially dangerous.",
      },
    ],
  },
  {
    id: "wifi-quiz",
    title: "WiFi Security Quiz",
    questions: [
      {
        question: "What should you use when connecting to public WiFi?",
        options: ["Nothing special", "A VPN", "Incognito mode", "A proxy"],
        correct: 1,
        explanation:
          "A VPN encrypts your traffic, protecting your data even on unsecured public networks.",
      },
      {
        question: "Which WiFi security protocol is most secure?",
        options: ["WEP", "WPA", "WPA2", "WPA3"],
        correct: 3,
        explanation:
          "WPA3 is the latest and most secure WiFi encryption standard, offering improved protection over WPA2.",
      },
    ],
  },
  {
    id: "backup-quiz",
    title: "Data Backup Quiz",
    questions: [
      {
        question: "What is the 3-2-1 backup rule?",
        options: [
          "3 backups, 2 locations, 1 cloud",
          "3 copies, 2 different media, 1 offsite",
          "3 drives, 2 computers, 1 server",
          "3 days, 2 weeks, 1 month",
        ],
        correct: 1,
        explanation:
          "The 3-2-1 rule means 3 copies of data, on 2 different media types, with 1 copy stored offsite.",
      },
      {
        question: "How often should you test your backups?",
        options: [
          "Never",
          "Once a year",
          "Regularly",
          "Only when you need them",
        ],
        correct: 2,
        explanation:
          "Regular testing ensures your backups actually work when you need them. Untested backups may be corrupted.",
      },
    ],
  },
];

/************************************************************************
 * Resources Data with clickable links
 ************************************************************************/

const RESOURCES = [
  {
    title: "Password Managers",
    description: "Industry-leading password managers to secure your accounts",
    links: [
      {
        name: "1Password",
        desc: "User-friendly with family sharing options",
        url: "https://1password.com",
      },
      {
        name: "Bitwarden",
        desc: "Open-source and affordable",
        url: "https://bitwarden.com",
      },
      {
        name: "LastPass",
        desc: "Free tier with premium features",
        url: "https://www.lastpass.com",
      },
    ],
  },
  {
    title: "Security Checking Tools",
    description: "Check if your accounts have been compromised",
    links: [
      {
        name: "Have I Been Pwned",
        desc: "Check if your email appears in known data breaches",
        url: "https://haveibeenpwned.com",
      },
      {
        name: "Password Strength Checker",
        desc: "Test how strong your passwords are",
        url: "https://www.security.org/how-secure-is-my-password/",
      },
    ],
  },
  {
    title: "Official Guidelines",
    description: "Government and industry security frameworks",
    links: [
      {
        name: "NIST Cybersecurity Framework",
        desc: "Comprehensive security standards",
        url: "https://www.nist.gov/cyberframework",
      },
      {
        name: "CISA Security Tips",
        desc: "US government security guidance",
        url: "https://www.cisa.gov/topics/cybersecurity-best-practices",
      },
      {
        name: "Stay Safe Online",
        desc: "National cybersecurity awareness resources",
        url: "https://staysafeonline.org",
      },
    ],
  },
  {
    title: "Learning Resources",
    description: "Expand your cybersecurity knowledge",
    links: [
      {
        name: "Cybrary",
        desc: "Free cybersecurity training courses",
        url: "https://www.cybrary.it",
      },
      {
        name: "SANS Security Training",
        desc: "Professional security education",
        url: "https://www.sans.org",
      },
      {
        name: "Google Safety Center",
        desc: "Practical online safety tips",
        url: "https://safety.google",
      },
    ],
  },
  {
    title: "Two-Factor Authentication Apps",
    description: "Recommended authenticator applications",
    links: [
      {
        name: "Google Authenticator",
        desc: "Simple and reliable 2FA app",
        url: "https://support.google.com/accounts/answer/1066447",
      },
      {
        name: "Authy",
        desc: "Multi-device 2FA with cloud backup",
        url: "https://authy.com",
      },
      {
        name: "Microsoft Authenticator",
        desc: "Integrated with Microsoft services",
        url: "https://www.microsoft.com/en-us/security/mobile-authenticator-app",
      },
    ],
  },
];

/************************************************************************
 * Glossary Data
 ************************************************************************/

const GLOSSARY = [
  {
    term: "Two-Factor Authentication (2FA)",
    definition:
      "A security process that requires two different authentication factors to verify a user's identity, such as a password plus a code from your phone.",
  },
  {
    term: "Phishing",
    definition:
      "A cyber attack that uses disguised emails, messages, or websites to trick people into providing sensitive information like passwords or credit card numbers.",
  },
  {
    term: "Malware",
    definition:
      "Malicious software designed to harm, exploit, or otherwise compromise a computer system. Includes viruses, trojans, ransomware, and spyware.",
  },
  {
    term: "VPN (Virtual Private Network)",
    definition:
      "A service that encrypts your internet connection and routes it through a server in another location, protecting your privacy and security online.",
  },
  {
    term: "Encryption",
    definition:
      "The process of converting information into a coded format that can only be read by someone with the correct decryption key.",
  },
  {
    term: "Zero-Day Exploit",
    definition:
      "A cyber attack that targets a software vulnerability that is unknown to the software vendor, giving them 'zero days' to fix it.",
  },
  {
    term: "Password Manager",
    definition:
      "A software application that stores and manages passwords in an encrypted database, allowing you to use unique, strong passwords for every account.",
  },
  {
    term: "Social Engineering",
    definition:
      "Psychological manipulation techniques used to trick people into revealing confidential information or performing actions that compromise security.",
  },
  {
    term: "Ransomware",
    definition:
      "A type of malware that encrypts a victim's files and demands payment (ransom) in exchange for the decryption key.",
  },
  {
    term: "Firewall",
    definition:
      "A network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules.",
  },
  {
    term: "Authentication",
    definition:
      "The process of verifying the identity of a user, device, or system before granting access to resources.",
  },
  {
    term: "Brute Force Attack",
    definition:
      "A trial-and-error method used to decode encrypted data by systematically trying all possible combinations until the correct one is found.",
  },
  {
    term: "SSL/TLS",
    definition:
      "Security protocols that encrypt data transmitted between a web browser and a server, indicated by 'https://' in URLs.",
  },
  {
    term: "Patch",
    definition:
      "A software update that fixes security vulnerabilities, bugs, or adds minor improvements to a program.",
  },
  {
    term: "Multi-Factor Authentication (MFA)",
    definition:
      "Similar to 2FA but can require more than two authentication factors, providing even stronger security.",
  },
];

/************************************************************************
 * Achievements/Badges Data
 ************************************************************************/

const ACHIEVEMENTS = [
  {
    id: "first-module",
    icon: "🎯",
    name: "First Steps",
    description: "Complete your first module",
    condition: () => Object.keys(appState.progress).length > 0,
  },
  {
    id: "half-modules",
    icon: "📚",
    name: "Halfway There",
    description: "Complete 50% of modules",
    condition: () => {
      const completed = MODULES.filter(
        (m) => (appState.progress[m.id] || 0) >= m.progress.total
      ).length;
      return completed >= Math.ceil(MODULES.length / 2);
    },
  },
  {
    id: "all-modules",
    icon: "🏆",
    name: "Module Master",
    description: "Complete all modules",
    condition: () => {
      const completed = MODULES.filter(
        (m) => (appState.progress[m.id] || 0) >= m.progress.total
      ).length;
      return completed === MODULES.length;
    },
  },
  {
    id: "first-quiz",
    icon: "✅",
    name: "Quiz Novice",
    description: "Take your first quiz",
    condition: () => Object.keys(appState.quizAnswers).length > 0,
  },
  {
    id: "perfect-quiz",
    icon: "💯",
    name: "Perfect Score",
    description: "Get 100% on any quiz",
    condition: () => {
      return QUIZZES.some((quiz) => {
        const allCorrect = quiz.questions.every((q, idx) => {
          const key = `${quiz.id}-${idx}`;
          return appState.quizAnswers[key] === q.correct;
        });
        const allAnswered = quiz.questions.every((q, idx) => {
          const key = `${quiz.id}-${idx}`;
          return appState.quizAnswers[key] !== undefined;
        });
        return allCorrect && allAnswered;
      });
    },
  },
  {
    id: "all-quizzes",
    icon: "🎓",
    name: "Quiz Champion",
    description: "Complete all quizzes",
    condition: () => {
      let totalQuestions = 0;
      let answeredQuestions = 0;
      QUIZZES.forEach((quiz) => {
        quiz.questions.forEach((q, idx) => {
          totalQuestions++;
          if (appState.quizAnswers[`${quiz.id}-${idx}`] !== undefined)
            answeredQuestions++;
        });
      });
      return answeredQuestions === totalQuestions && totalQuestions > 0;
    },
  },
  {
    id: "security-expert",
    icon: "🛡️",
    name: "Security Expert",
    description: "Complete everything",
    condition: () => {
      const modulesComplete = MODULES.every(
        (m) => (appState.progress[m.id] || 0) >= m.progress.total
      );
      let totalQ = 0,
        answeredQ = 0;
      QUIZZES.forEach((quiz) => {
        quiz.questions.forEach((q, idx) => {
          totalQ++;
          if (appState.quizAnswers[`${quiz.id}-${idx}`] !== undefined)
            answeredQ++;
        });
      });
      return modulesComplete && answeredQ === totalQ;
    },
  },
];

/************************************************************************
 * Icons
 ************************************************************************/

function getIcon(name) {
  const icons = {
    lock: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="10" width="18" height="11" rx="2" stroke="white" stroke-width="1.6"/><path d="M7 10V7a5 5 0 0 1 10 0v3" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    phish: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12c4 0 8-4 12-4s8 4 8 4-4 4-8 4S7 12 3 12z" stroke="white" stroke-width="1.6"/><path d="M14 9l3 3-3 3" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    refresh: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" stroke="white" stroke-width="1.6" stroke-linecap="round"/><path d="M21 3v5h-5" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    wifi: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    save: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="white" stroke-width="1.6"/><path d="M17 21v-8H7v8M7 3v5h8" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  };
  return (
    icons[name] ||
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.6"/></svg>`
  );
}

/************************************************************************
 * Theme
 ************************************************************************/

function applyTheme(theme) {
  document.documentElement.setAttribute(
    "data-theme",
    theme === "dark" ? "dark" : ""
  );
  appState.theme = theme;
  $("#themeToggle").textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
}

(function initTheme() {
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
})();
/*
$("#themeToggle").addEventListener("click", () => {
  applyTheme(appState.theme === "dark" ? "light" : "dark");
});
*/
/************************************************************************
 * Utility Functions
 ************************************************************************/

function percent(completed, total) {
  return Math.round((completed / Math.max(total, 1)) * 100);
}

function escapeHtml(s = "") {
  return (
    s.replace?.(
      /[&<>"']/g,
      (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[c])
    ) || s
  );
}

function checkAchievements() {
  const newBadges = [];
  ACHIEVEMENTS.forEach((ach) => {
    if (!appState.badges.includes(ach.id) && ach.condition()) {
      appState.badges.push(ach.id);
      newBadges.push(ach);
    }
  });
  if (newBadges.length > 0) {
    showBadgeNotification(newBadges);
  }
}

function showBadgeNotification(badges) {
  badges.forEach((badge, idx) => {
    setTimeout(() => {
      const notif = document.createElement("div");
      notif.style.cssText =
        "position:fixed;top:80px;right:20px;background:var(--card-bg);padding:16px 20px;border-radius:10px;box-shadow:var(--shadow);border:1px solid var(--glass-border);z-index:1000;animation:slideInRight 0.3s;backdrop-filter:blur(8px);";
      notif.innerHTML = `<strong style="display:block;margin-bottom:4px;">${badge.icon
        } ${escapeHtml(badge.name)}</strong><span class="muted">${escapeHtml(
          badge.description
        )}</span>`;
      document.body.appendChild(notif);
      setTimeout(() => {
        notif.style.animation = "slideOutRight 0.3s";
        setTimeout(() => notif.remove(), 300);
      }, 3000);
    }, idx * 500);
  });
}

/************************************************************************
 * Quick Stats Widget
 ************************************************************************/

function updateStatsWidget() {
  const completedModules = MODULES.filter(
    (m) => (appState.progress[m.id] || 0) >= m.progress.total
  ).length;
  let quizzesCorrect = 0,
    totalQuestions = 0;
  QUIZZES.forEach((quiz) => {
    quiz.questions.forEach((q, idx) => {
      totalQuestions++;
      if (appState.quizAnswers[`${quiz.id}-${idx}`] === q.correct)
        quizzesCorrect++;
    });
  });

  $("#statsWidget").innerHTML = `
        <div class="stat-card">
          <p class="stat-value">${completedModules}/${MODULES.length}</p>
          <p class="stat-label">Modules Complete</p>
        </div>
        <div class="stat-card">
          <p class="stat-value">${quizzesCorrect}/${totalQuestions}</p>
          <p class="stat-label">Quiz Correct</p>
        </div>
        <div class="stat-card">
          <p class="stat-value">${appState.badges.length}/${ACHIEVEMENTS.length}</p>
          <p class="stat-label">Badges Earned</p>
        </div>
      `;
}

/************************************************************************
 * Module Rendering
 ************************************************************************/

function markModuleCompleted(id) {
  const mod = MODULES.find((m) => m.id === id);
  if (!mod) return;
  appState.progress[id] = mod.progress.total;
  renderModules();
  updateStatsWidget();
  updateProgressView();
  checkAchievements();
  checkCertificate();
}

function renderModules() {
  const grid = $("#modulesGrid");
  grid.innerHTML = "";

  MODULES.forEach((mod) => {
    const prog = appState.progress[mod.id] || 0;
    const total = mod.progress.total;
    const p = percent(prog, total);
    const isComplete = prog >= total;

    const card = document.createElement("article");
    card.className = "module";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "article");
    card.setAttribute("aria-label", `${mod.title} module, ${p}% complete`);

    card.innerHTML = `
  ${isComplete ? '<span class="badge" aria-label="Completed">✓</span>' : ""}

  <div class="module-header" style="display:flex;gap:12px;align-items:flex-start;">
    <div class="icon" aria-hidden="true">${getIcon(mod.icon)}</div>
    <div style="flex:1;">
      <h3>${escapeHtml(mod.title)}</h3>
      <p>${escapeHtml(mod.description)}</p>
      <div class="row" style="gap:8px;margin-top:8px;flex-wrap:wrap;">
        <span class="difficulty">${escapeHtml(mod.difficulty)}</span>
      </div>
    </div>
  </div>

  <div class="module-footer">
    <div class="progress-row" style="margin-top:12px; display:flex; align-items:center; gap:8px;">
      <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${p}" aria-label="Module progress ${p}%">
        <div class="progress-fill" style="width:${p}%;"></div>
      </div>
      <div class="progress-text">${p}%</div>
    </div>

    <div style="display:flex;gap:8px;margin-top:12px;">
      <button class="ghost" data-open="${mod.id}" aria-label="View ${mod.title} details">View Details</button>
      <button class="btn" data-complete="${mod.id}" ${isComplete ? "disabled" : ""}
        aria-label="${isComplete ? "Module completed" : "Mark module complete"}">
        ${isComplete ? "✓ Completed" : "Mark Complete"}
      </button>
    </div>
  </div>
`;


    grid.appendChild(card);
  });

  qs("[data-open]").forEach((btn) =>
    btn.addEventListener("click", (e) =>
      openModal(e.currentTarget.dataset.open)
    )
  );
  qs("[data-complete]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      markModuleCompleted(e.currentTarget.dataset.complete);
    })
  );

  observeInView();
}

/************************************************************************
 * Modal
 ************************************************************************/

const modal = $("#modal");
const modalContent = $("#modalContent");
const modalClose = $("#modalClose");
let lastFocused = null;

function openModal(moduleId) {
  const mod = MODULES.find((m) => m.id === moduleId);
  if (!mod) return;

  lastFocused = document.activeElement;
  const prog = appState.progress[moduleId] || 0;
  const total = mod.progress.total;

  modalContent.innerHTML = `
        <h2 id="modalTitle">${escapeHtml(mod.title)}</h2>
        <p class="muted">${escapeHtml(mod.description)}</p>
        
        <div style="margin-top:18px;">
          <h3 style="font-size:1.1rem;margin-bottom:12px;">Course Sections</h3>
          ${Array.isArray(mod.sections) && mod.sections.length
      ? mod.sections
        .map(
          (s, idx) => `
            <section style="margin-bottom:16px; padding:14px; background:linear-gradient(180deg, rgba(255,255,255,0.03), transparent); border-radius:10px; border:1px solid var(--glass-border);">
              <h4 style="margin:0 0 8px 0;font-weight:700;font-size:1rem;">
                ${idx + 1}. ${escapeHtml(s.title || "Section")}
                ${s.time
              ? `<span class="muted" style="font-weight:400;font-size:0.9rem;"> • ${escapeHtml(
                s.time
              )}</span>`
              : ""
            }
              </h4>
${s.objectives
              ? '<ul class="muted" style="margin:8px 0;padding-left:20px;">' +
              s.objectives
                .map((o) => `<li style="margin:4px 0;">${escapeHtml(o)}</li>`)
                .join("") +
              "</ul>"
              : ""
            }
${s.content
              ? `<div class="lesson-text" style="margin-top:10px;line-height:1.6;color:var(--text-color);">
         ${s.content}
       </div>`
              : ""
            }

            </section>
          `
        )
        .join("")
      : `<div class="muted">No detailed content available for this module yet.</div>`
    }
        </div>

        <div style="margin-top:18px;padding:14px;background:rgba(37,99,235,0.05);border-radius:10px;border:1px solid var(--glass-border);">
          <strong>Progress:</strong> ${prog} of ${total} sections completed (${percent(
      prog,
      total
    )}%)
        </div>

        <div style="margin-top:18px;display:flex;gap:10px;justify-content:flex-end;">
          <button class="ghost" id="modalCloseBtn">Close</button>
          <button class="btn" id="modalAddProgress" ${prog >= total ? "disabled" : ""
    }>
            ${prog >= total ? "✓ Completed" : "Mark as Complete"}
          </button>
        </div>
      `;

  modal.setAttribute("aria-hidden", "false");
  trapFocus(modal);

  $("#modalAddProgress").addEventListener("click", () => {
    markModuleCompleted(moduleId);
    closeModal();
  });
  $("#modalCloseBtn").addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);
  document.addEventListener("keydown", onModalKeyDown);
}

function closeModal() {
  modal.setAttribute("aria-hidden", "true");
  if (lastFocused && lastFocused.focus) lastFocused.focus();
  document.removeEventListener("keydown", onModalKeyDown);
}

function onModalKeyDown(e) {
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") trapTabKey(e, modal);
}

function trapFocus(root) {
  const focusable = root.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length) focusable[0].focus();
}

function trapTabKey(e, root) {
  const focusable = Array.from(
    root.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((n) => n.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0],
    last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

/************************************************************************
 * Quiz Rendering with Retake
 ************************************************************************/
function renderQuizzes() {
  const container = $("#quizContainer");
  container.innerHTML = "";

  QUIZZES.forEach((quiz) => {
    const quizDiv = document.createElement("div");
    quizDiv.classList.add("quiz-card");
    quizDiv.style.marginBottom = "24px";

    // Header with toggle button
    const isOpen = quiz.open || false;
    let headerHTML = `
      <div class="quiz-header" style="display:flex;justify-content:space-between;align-items:center;">
        <h3>${escapeHtml(quiz.title)}</h3>
        <button class="ghost" data-toggle="${quiz.id}" aria-label="${isOpen ? 'Collapse quiz' : 'Expand quiz'}">
          ${isOpen ? "▼" : "▶"}
        </button>
      </div>
    `;

    // Body HTML (questions + score) if expanded
    let bodyHTML = "";
    if (isOpen) {
      // Calculate score
      let correct = 0,
        answered = 0;
      quiz.questions.forEach((q, idx) => {
        const key = `${quiz.id}-${idx}`;
        if (appState.quizAnswers[key] !== undefined) {
          answered++;
          if (appState.quizAnswers[key] === q.correct) correct++;
        }
      });
      const allAnswered = answered === quiz.questions.length;
      const score = allAnswered ? Math.round((correct / quiz.questions.length) * 100) : 0;

      // Score section
      if (allAnswered) {
        bodyHTML += `
          <div class="quiz-score">
            <strong>Your Score: ${score}%</strong> (${correct}/${quiz.questions.length} correct)
            <button class="ghost" data-retake="${quiz.id}" style="margin-left:12px;"> Retake Quiz</button>
          </div>
        `;
      }

      // Questions
      quiz.questions.forEach((q, qIdx) => {
        const answeredIdx = appState.quizAnswers[`${quiz.id}-${qIdx}`];
        const isAnswered = answeredIdx !== undefined;
        const isCorrect = answeredIdx === q.correct;

        bodyHTML += `
          <div class="quiz-question">
            <strong>${qIdx + 1}. ${escapeHtml(q.question)}</strong>
            <div class="quiz-options">
              ${q.options
                .map((opt, optIdx) => {
                  let optClass = "quiz-option";
                  if (isAnswered) {
                    if (optIdx === q.correct) optClass += " correct";
                    else if (optIdx === answeredIdx) optClass += " incorrect";
                  }
                  return `<div class="${optClass}" data-quiz="${quiz.id}" data-question="${qIdx}" data-option="${optIdx}" style="${isAnswered ? "cursor:default;" : ""}">${escapeHtml(opt)}</div>`;
                })
                .join("")}
            </div>
            ${isAnswered
              ? `<div class="quiz-result ${isCorrect ? "correct" : "incorrect"}">
                  ${isCorrect ? "✓ Correct!" : "✗ Incorrect"} ${escapeHtml(q.explanation)}
                </div>`
              : ""}
          </div>
        `;
      });
    }

    quizDiv.innerHTML = headerHTML + `<div class="quiz-body">${bodyHTML}</div>`;
    container.appendChild(quizDiv);
  });

  // Toggle expand/collapse
  qs("[data-toggle]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const quizId = e.currentTarget.dataset.toggle;
      QUIZZES.forEach((q) => {
        if (q.id === quizId) q.open = !q.open;
        else q.open = false; // optional: close others when opening one
      });
      renderQuizzes();
    })
  );

  // Quiz answer listeners
  qs(".quiz-option").forEach((opt) => {
    opt.addEventListener("click", (e) => {
      const target = e.currentTarget;
      const quizId = target.dataset.quiz;
      const qIdx = parseInt(target.dataset.question);
      const optIdx = parseInt(target.dataset.option);

      const key = `${quizId}-${qIdx}`;
      if (appState.quizAnswers[key] !== undefined) return;

      appState.quizAnswers[key] = optIdx;
      renderQuizzes();
      updateStatsWidget();
      checkAchievements();
      checkCertificate();
    });
  });

  // Retake listeners
  qs("[data-retake]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const quizId = e.currentTarget.dataset.retake;
      const quiz = QUIZZES.find((q) => q.id === quizId);
      if (quiz) {
        quiz.questions.forEach((q, idx) => {
          delete appState.quizAnswers[`${quizId}-${idx}`];
        });
        renderQuizzes();
        updateStatsWidget();
      }
    });
  });
}

/************************************************************************
 * Tools/Simulators Section
 ************************************************************************/

function renderTools() {
  const container = $("#toolsContainer");
  container.innerHTML = `
        <!-- Password Strength Tester -->
        <div class="tool-card">
          <h3> Password Strength Tester</h3>
          <p class="muted">Test the strength of your passwords in real-time.</p>
          <input type="text" id="passwordInput" class="tool-input" placeholder="Enter a password to test..." aria-label="Password to test">
          <div id="passwordStrength" class="tool-output" style="display:none;"></div>
          <div id="passwordTips" style="margin-top:12px;"></div>
        </div>

        <!-- Phishing Email Simulator -->
        <div class="tool-card">
          <h3> Phishing Email Detector</h3>
          <p class="muted">Practice identifying phishing attempts. Click the red flags to reveal them!</p>
          <div class="phishing-email" id="phishingEmail1">
            <div style="margin-bottom:12px;"><strong>From:</strong> <span class="red-flag" title="Suspicious domain">security@paypa1-verify.com</span></div>
            <div style="margin-bottom:12px;"><strong>Subject:</strong> <span class="red-flag" title="Creates urgency">URGENT: Your account will be suspended in 24 hours!</span></div>
            <div style="margin-bottom:8px;"><strong>Message:</strong></div>
            <div style="line-height:1.6;">
              Dear Valued Customer,<br><br>
              We have detected <span class="red-flag" title="Vague security concern">suspicious activity</span> on your account. 
              You must verify your identity immediately by clicking the link below or your account will be 
              <span class="red-flag" title="Threatening language">permanently disabled</span>.<br><br>
              <a href="#" class="red-flag" style="color:var(--accent);" title="Suspicious URL">Click here to verify your account</a><br><br>
              Thank you,<br>
              <span class="red-flag" title="Generic signature">Customer Support Team</span>
            </div>
          </div>
          <button class="btn" id="revealPhishing" style="margin-top:12px;">Reveal All Red Flags</button>
          <div id="phishingExplanation" style="display:none;margin-top:12px;padding:14px;background:rgba(239,68,68,0.1);border-radius:8px;border:1px solid var(--danger);">
            <strong> Red Flags Identified:</strong>
            <ul style="margin:8px 0;padding-left:20px;line-height:1.6;">
              <li>Misspelled domain (paypa1 vs paypal)</li>
              <li>Creates false urgency and fear</li>
              <li>Vague security concerns without specifics</li>
              <li>Threatening language about account suspension</li>
              <li>Generic greeting and signature</li>
              <li>Suspicious link (hover to see real URL)</li>
            </ul>
          </div>
        </div>

        <!-- 2FA Setup Simulator -->
        <div class="tool-card">
          <h3> Two-Factor Authentication Demo</h3>
          <p class="muted">Experience how 2FA protects your accounts.</p>
          <div style="padding:16px;background:rgba(255,255,255,0.02);border-radius:8px;border:1px solid var(--glass-border);">
            <div style="margin-bottom:16px;">
              <label style="display:block;margin-bottom:8px;font-weight:600;">Step 1: Enter Username & Password</label>
              <input type="text" placeholder="Username" class="tool-input" style="margin-bottom:8px;" id="demo2faUser">
              <input type="password" placeholder="Password" class="tool-input" id="demo2faPass">
            </div>
            <button class="btn" id="demo2faLogin" style="width:100%;">Login</button>
            <div id="demo2faStep2" style="display:none;margin-top:16px;">
              <label style="display:block;margin-bottom:8px;font-weight:600;">Step 2: Enter 6-Digit Code from Authenticator App</label>
              <input type="text" placeholder="000000" maxlength="6" class="tool-input" id="demo2faCode" style="text-align:center;font-size:1.5rem;letter-spacing:0.5em;">
              <button class="btn" id="demo2faVerify" style="width:100%;margin-top:12px;">Verify Code</button>
            </div>
            <div id="demo2faSuccess" style="display:none;margin-top:16px;padding:14px;background:rgba(34,197,94,0.1);border-radius:8px;border:1px solid var(--success);text-align:center;">
              <strong style="color:var(--success);font-size:1.2rem;">✓ Login Successful!</strong>
              <p style="margin:8px 0 0 0;" class="muted">Your account is protected with 2FA. Even if someone knows your password, they can't access your account without the verification code.</p>
            </div>
          </div>
        </div>
      `;

  // Password strength tester
  const passwordInput = $("#passwordInput");
  const strengthDiv = $("#passwordStrength");
  const tipsDiv = $("#passwordTips");

  passwordInput.addEventListener("input", (e) => {
    const pwd = e.target.value;
    if (!pwd) {
      strengthDiv.style.display = "none";
      tipsDiv.innerHTML = "";
      return;
    }

    let strength = 0;
    const tips = [];

    if (pwd.length >= 12) strength += 25;
    else tips.push("Use at least 12 characters");
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength += 25;
    else tips.push("Mix uppercase and lowercase");
    if (/\d/.test(pwd)) strength += 25;
    else tips.push("Include numbers");
    if (/[^a-zA-Z0-9]/.test(pwd)) strength += 25;
    else tips.push("Add special characters (!@#$%^&*)");

    let strengthClass = "strength-weak";
    let strengthText = "Weak";
    if (strength >= 75) {
      strengthClass = "strength-strong";
      strengthText = "Strong";
    } else if (strength >= 50) {
      strengthClass = "strength-medium";
      strengthText = "Medium";
    }

    strengthDiv.className = `tool-output ${strengthClass}`;
    strengthDiv.style.display = "block";
    strengthDiv.innerHTML = `<strong>Strength: ${strengthText}</strong> (${strength}/100)`;

    if (tips.length > 0) {
      tipsDiv.innerHTML = `<div class="muted"><strong>Tips to improve:</strong><ul style="margin:4px 0;padding-left:20px;">${tips
        .map((t) => `<li>${t}</li>`)
        .join("")}</ul></div>`;
    } else {
      tipsDiv.innerHTML = `<div style="color:var(--success);"><strong>✓ Excellent password!</strong></div>`;
    }
  });

  // Phishing simulator
  $("#revealPhishing").addEventListener("click", () => {
    $("#phishingEmail1").classList.add("revealed");
    $("#phishingExplanation").style.display = "block";
    qs(".red-flag").forEach((flag) => {
      flag.style.background = "rgba(239,68,68,0.25)";
      flag.style.outline = "2px solid var(--danger)";
    });
  });

  qs(".red-flag").forEach((flag) => {
    flag.addEventListener("click", function () {
      this.style.background = "rgba(239,68,68,0.25)";
      this.style.outline = "2px solid var(--danger)";
      alert(` Red Flag: ${this.getAttribute("title")}`);
    });
  });

  // 2FA Demo
  $("#demo2faLogin").addEventListener("click", () => {
    const user = $("#demo2faUser").value;
    const pass = $("#demo2faPass").value;
    if (user && pass) {
      $("#demo2faStep2").style.display = "block";
      $("#demo2faCode").focus();
    } else {
      alert("Please enter username and password");
    }
  });

  $("#demo2faVerify").addEventListener("click", () => {
    const code = $("#demo2faCode").value;
    if (code.length === 6) {
      $("#demo2faSuccess").style.display = "block";
      $("#demo2faStep2").style.display = "none";
    } else {
      alert("Please enter a 6-digit code");
    }
  });

  $("#demo2faCode").addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  });
}

/************************************************************************
 * 🔐sary Rendering
 ************************************************************************/

function renderGlossary() {
  const container = $("#glossaryContainer");
  const html = GLOSSARY.map(
    (item) => `
        <dl class="glossary-term">
          <dt>${escapeHtml(item.term)}</dt>
          <dd>${escapeHtml(item.definition)}</dd>
        </dl>
      `
  ).join("");
  container.innerHTML = html;
}

/************************************************************************
 * Resources Rendering with Clickable Links
 ************************************************************************/

function renderResources() {
  const container = $("#resourcesContainer");
  const html = RESOURCES.map(
    (resource) => `
        <div class="resource-card">
          <h3 style="margin:0 0 8px 0;font-size:1.1rem;">${escapeHtml(
      resource.title
    )}</h3>
          <p class="muted" style="margin:0 0 12px 0;">${escapeHtml(
      resource.description
    )}</p>
          <ul class="muted" style="margin:0;padding-left:20px;">
            ${resource.links
        .map(
          (link) => `
              <li style="margin:6px 0;">
                ${link.url
              ? `<a href="${escapeHtml(
                link.url
              )}" target="_blank" rel="noopener noreferrer" class="resource-link">${escapeHtml(
                link.name
              )}</a>`
              : `<strong>${escapeHtml(link.name)}</strong>`
            }
                — ${escapeHtml(link.desc)}
              </li>
            `
        )
        .join("")}
          </ul>
        </div>
      `
  ).join("");
  container.innerHTML = html;
}

/************************************************************************
 * Achievements Rendering
 ************************************************************************/

function renderAchievements() {
  const container = $("#achievementsContainer");
  const html = `
        <div class="badges-grid">
          ${ACHIEVEMENTS.map((ach) => {
    const earned = appState.badges.includes(ach.id);
    return `
              <div class="badge-item ${earned ? "earned" : "locked"
      }" aria-label="${earned ? "Earned" : "Locked"}: ${ach.name}">
                <span class="badge-icon">${ach.icon}</span>
                <div class="badge-name">${escapeHtml(ach.name)}</div>
                <div class="muted" style="font-size:0.75rem;margin-top:4px;">${escapeHtml(
        ach.description
      )}</div>
              </div>
            `;
  }).join("")}
        </div>
      `;
  container.innerHTML = html;
}

/************************************************************************
 * Progress View with Certificate
 ************************************************************************/

function updateProgressView() {
  const container = $("#progressContainer");

  const completedModules = MODULES.filter(
    (m) => (appState.progress[m.id] || 0) >= m.progress.total
  ).length;
  const totalModules = MODULES.length;
  const overallPercent = percent(completedModules, totalModules);

  let quizzesCompleted = 0,
    quizzesCorrect = 0,
    totalQuestions = 0;
  QUIZZES.forEach((quiz) => {
    quiz.questions.forEach((q, idx) => {
      totalQuestions++;
      const key = `${quiz.id}-${idx}`;
      if (appState.quizAnswers[key] !== undefined) {
        quizzesCompleted++;
        if (appState.quizAnswers[key] === q.correct) quizzesCorrect++;
      }
    });
  });

  const quizPercent =
    totalQuestions > 0 ? percent(quizzesCompleted, totalQuestions) : 0;
  const allComplete =
    completedModules === totalModules && quizzesCompleted === totalQuestions;

  container.innerHTML = `
        <div style="display:grid;gap:16px;">
          <div class="resource-card">
            <h3 style="margin:0 0 12px 0;">Overall Progress</h3>
            <div style="margin-bottom:16px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                <span>Modules Completed</span>
                <strong>${completedModules} / ${totalModules}</strong>
              </div>
              <div class="progress-bar" style="height:12px;">
                <div class="progress-fill" style="width:${overallPercent}%;"></div>
              </div>
            </div>
            
            <div>
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                <span>Quiz Questions Answered</span>
                <strong>${quizzesCompleted} / ${totalQuestions}</strong>
              </div>
              <div class="progress-bar" style="height:12px;">
                <div class="progress-fill" style="width:${quizPercent}%;"></div>
              </div>
            </div>

            <div style="margin-top:16px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
                <span>Quiz Accuracy</span>
                <strong>${quizzesCompleted > 0
      ? percent(quizzesCorrect, quizzesCompleted)
      : 0
    }%</strong>
              </div>
            </div>
          </div>

          <div class="resource-card">
            <h3 style="margin:0 0 12px 0;">Module Details</h3>
            ${MODULES.map((m) => {
      const prog = appState.progress[m.id] || 0;
      const total = m.progress.total;
      const p = percent(prog, total);
      return `
                <div style="margin-bottom:12px;">
                  <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                    <span>${escapeHtml(m.title)}</span>
                    <span class="muted">${prog}/${total}</span>
                  </div>
                  <div class="progress-bar" style="height:8px;">
                    <div class="progress-fill" style="width:${p}%;"></div>
                  </div>
                </div>
              `;
    }).join("")}
          </div>

          ${allComplete
      ? `
            <div id="certificateContainer"></div>
          `
      : ""
    }
        </div>
      `;

  if (allComplete) {
    showCertificate();
  }
}

/************************************************************************
 * Certificate Generation
 ************************************************************************/

function checkCertificate() {
  const completedModules = MODULES.filter(
    (m) => (appState.progress[m.id] || 0) >= m.progress.total
  ).length;
  let totalQ = 0,
    answeredQ = 0;
  QUIZZES.forEach((quiz) => {
    quiz.questions.forEach((q, idx) => {
      totalQ++;
      if (appState.quizAnswers[`${quiz.id}-${idx}`] !== undefined) answeredQ++;
    });
  });

  if (completedModules === MODULES.length && answeredQ === totalQ) {
    $("#downloadCert").style.display = "inline-block";
    triggerConfetti();
  }
}

function showCertificate() {
  const container = $("#certificateContainer");
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  container.innerHTML = `
        <div class="certificate">
          <h2>🎓 Certificate of Completion</h2>
          <p class="cert-text">This certifies that</p>
          <p class="cert-name">Cybersecurity Champion</p>
          <p class="cert-text">has successfully completed the</p>
          <p class="cert-text" style="font-weight:700;font-size:1.2rem;">Cybersecurity Awareness Training Program</p>
          <p class="cert-text" style="margin-top:20px;">Completed on ${date}</p>
          <p class="muted" style="margin-top:16px;font-size:0.9rem;">
            ${MODULES.length} modules completed • ${QUIZZES.reduce(
    (acc, q) => acc + q.questions.length,
    0
  )} quiz questions answered
          </p>
        </div>
      `;
}

function triggerConfetti() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.background = [
        "#2563eb",
        "#60a5fa",
        "#22c55e",
        "#f59e0b",
        "#ef4444",
      ][Math.floor(Math.random() * 5)];
      confetti.style.animationDelay = Math.random() * 0.5 + "s";
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }, i * 30);
  }
}

$("#downloadCert").addEventListener("click", () => {
  alert(
    "🎉 Congratulations! In a full implementation, this would generate a downloadable PDF certificate. For now, you can screenshot the certificate from the Progress section!"
  );
});

/************************************************************************
 * Export Progress
 ************************************************************************/

$("#exportProgress").addEventListener("click", () => {
  const data = {
    exportDate: new Date().toISOString(),
    modules: MODULES.map((m) => ({
      id: m.id,
      title: m.title,
      progress: appState.progress[m.id] || 0,
      total: m.progress.total,
      percentComplete: percent(appState.progress[m.id] || 0, m.progress.total),
    })),
    quizzes: QUIZZES.map((q) => {
      let correct = 0,
        answered = 0;
      q.questions.forEach((quest, idx) => {
        const key = `${q.id}-${idx}`;
        if (appState.quizAnswers[key] !== undefined) {
          answered++;
          if (appState.quizAnswers[key] === quest.correct) correct++;
        }
      });
      return {
        id: q.id,
        title: q.title,
        answered,
        total: q.questions.length,
        correct,
        score: answered > 0 ? percent(correct, answered) : 0,
      };
    }),
    badges: appState.badges,
    summary: {
      modulesCompleted: MODULES.filter(
        (m) => (appState.progress[m.id] || 0) >= m.progress.total
      ).length,
      totalModules: MODULES.length,
      badgesEarned: appState.badges.length,
      totalBadges: ACHIEVEMENTS.length,
    },
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `cybersecurity-progress-${new Date().toISOString().split("T")[0]
    }.json`;
  a.click();
  URL.revokeObjectURL(url);
});

/************************************************************************
 * Navigation
 ************************************************************************/

function showSection(sectionName) {
  qs(".section-content").forEach((s) => s.classList.remove("active"));
  qs("nav.sidebar a").forEach((a) => a.classList.remove("active"));

  const section = $(`#${sectionName}Section`);
  if (section) section.classList.add("active");

  const navLink = qs(`nav.sidebar a[data-section="${sectionName}"]`)[0];
  if (navLink) navLink.classList.add("active");

  // Render section-specific content
  if (sectionName === "quizzes") renderQuizzes();
  if (sectionName === "tools") renderTools();
  if (sectionName === "glossary") renderGlossary();
  if (sectionName === "resources") renderResources();
  if (sectionName === "achievements") renderAchievements();
  if (sectionName === "progress") updateProgressView();
}

qs("nav.sidebar a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const section = e.currentTarget.dataset.section;
    showSection(section);
  });
});

function scrollToLearn() {
  document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
}

/************************************************************************
 * IntersectionObserver for animations
 ************************************************************************/

function observeInView() {
  const items = document.querySelectorAll(".module");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in-view");
            obs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((i) => io.observe(i));
  } else {
    items.forEach((i) => i.classList.add("in-view"));
  }
}

/************************************************************************
 * Reset Progress
 ************************************************************************/

$("#refreshBtn").addEventListener("click", () => {
  if (
    confirm(
      "Reset all progress? This will clear your completed modules, quiz answers, and badges."
    )
  ) {
    appState.progress = {};
    appState.quizAnswers = {};
    appState.badges = [];
    $("#downloadCert").style.display = "none";
    renderModules();
    updateStatsWidget();
    updateProgressView();
    showSection("modules");
  }
});

/************************************************************************
 * Keyboard Shortcuts
 ************************************************************************/

document.addEventListener("keydown", (e) => {
  // Escape closes modal
  if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
    closeModal();
  }

  // Ctrl/Cmd + K for search (placeholder for future)
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Search shortcut triggered (not yet implemented)");
  }

  // Number keys 1-7 for navigation
  if (e.altKey && e.key >= "1" && e.key <= "7") {
    e.preventDefault();
    const sections = [
      "modules",
      "quizzes",
      "tools",
      "glossary",
      "resources",
      "achievements",
      "progress",
    ];
    const idx = parseInt(e.key) - 1;
    if (sections[idx]) showSection(sections[idx]);
  }
});

/************************************************************************
 * Initialize Application
 ************************************************************************/

function init() {
  renderModules();
  renderResources();
  renderGlossary();
  updateStatsWidget();
  updateProgressView();
  renderAchievements();
  checkAchievements();
  checkCertificate();
}

// Boot the app
init();

// Add CSS animations for notifications
const style = document.createElement("style");
style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
    `;
document.head.appendChild(style);

console.log(
  "%c🛡️ Cybersecurity Awareness Dashboard Loaded!",
  "font-size:16px;color:#2563eb;font-weight:bold;"
);
console.log("%cKeyboard Shortcuts:", "font-size:14px;font-weight:bold;");
console.log("Alt+1-7: Navigate sections");
console.log("Escape: Close modal");
console.log(
  "%c\n📋 TODO List embedded in source code",
  "font-size:12px;color:#6b7280;"
);

/************************************************************************
 * Hacker Text
 ************************************************************************/

(function () {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let width, height, columns, fontSize, drops;
  const deviceRatio = window.devicePixelRatio || 1;

  // Configuration (tweak these)
  const config = {
    font: 'monospace',
    fontSizeBase: 14,     // base pixel size on normal DPR; multiplies with device ratio
    density: 0.5,         // 0.2 (sparse) -> 1.0 (dense)
    speedBase: 1.0,       // multiplies drop increment
    alphaFade: 0.05,      // trail fade strength (0.02 -> long trails)
    charSet: 'abcdefghijklmnopqrstuvwxyz0123456789@#$%&*+-' // characters used
  };

  function resize() {
    // size canvas to #app area in device pixels
    const rect = canvas.parentElement.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));

    canvas.width = Math.floor(width * deviceRatio);
    canvas.height = Math.floor(height * deviceRatio);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(deviceRatio, 0, 0, deviceRatio, 0, 0); // scale drawing to CSS pixels
    setupColumns();
  }

  function setupColumns() {
    // compute a font size adapted to container
    fontSize = Math.max(10, config.fontSizeBase * (deviceRatio || 1));
    ctx.font = fontSize + 'px ' + config.font;
    columns = Math.floor(width / fontSize) || 1;
    // density controls how many columns are active
    const activeColumns = Math.max(1, Math.floor(columns * config.density));
    drops = new Array(columns).fill(0);

    // randomly initialize drop positions for a more organic start
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * height / fontSize);
      // optionally disable many columns to reduce density
      if (Math.random() > config.density) drops[i] = 0;
    }
  }

  function pickChar() {
    const chars = config.charSet;
    return chars.charAt(Math.floor(Math.random() * chars.length));
  }

  let rafId;
  function draw() {
    // translucent black overlay to create trailing effect
    ctx.fillStyle = `rgba(0,0,0,${config.alphaFade})`;
    ctx.fillRect(0, 0, width, height);

    // draw characters
    for (let i = 0; i < columns; i++) {
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // bright head
      ctx.fillStyle = '#b8ffb8'; // light green head
      ctx.fillText(pickChar(), x, y);

      // faded body (draw a second, slightly higher, dim character to give depth)
      if (y - fontSize > 0) {
        ctx.fillStyle = 'rgba(0,200,0,0.35)'; // dim green trail
        ctx.fillText(pickChar(), x, y - fontSize * 0.6);
      }

      // move drop forward; speed varies by column for organic look
      const speed = config.speedBase * (0.5 + Math.random()); // small variation
      drops[i] = drops[i] + speed * (Math.random() > 0.98 ? 10 : 1);

      // reset drop to top with small random chance when below screen
      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
    }
    rafId = requestAnimationFrame(draw);
  }

  // performance tweaks for mobile
  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (window.innerWidth < 600);
  }

  function start() {
    // lower intensity on mobile for battery/CPU
    if (isMobile()) {
      config.density = Math.min(0.45, config.density);
      config.fontSizeBase = Math.max(10, config.fontSizeBase * 0.9);
      config.alphaFade = Math.max(0.06, config.alphaFade);
    }
    resize();
    cancelAnimationFrame(rafId);
    draw();
  }

  // init
  window.addEventListener('resize', () => {
    // debounce resize
    clearTimeout(canvas._resizeTimer);
    canvas._resizeTimer = setTimeout(resize, 120);
  });

  // pause when tab not visible to save CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else draw();
  });

  // start after a tick so layout settles
  requestAnimationFrame(start);
})();