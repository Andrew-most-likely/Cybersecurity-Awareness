import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getFirestore, doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgHnpzIhUtno43U3fo6rL51I-OUvyKf3U",
  authDomain: "learncybersafety.firebaseapp.com",
  projectId: "learncybersafety",
  storageBucket: "learncybersafety.firebasestorage.app",
  messagingSenderId: "793441232155",
  appId: "1:793441232155:web:32cbcaa870b173f1ee9fbe",
  measurementId: "G-2LK0NYMBHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check authentication state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log('User authenticated:', user.email);

    // Load user's progress from Firestore
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.data) {
          syncProgressFromFirebase(userData.data);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }

    updateHeaderWithUser(user);
  }
});

// Function to sync Firebase data with local state
function syncProgressFromFirebase(firebaseData) {
  // Sync modules progress
  if (firebaseData.modules) {
    firebaseData.modules.forEach(module => {
      appState.progress[module.id] = module.progress;
    });
  }

  if (firebaseData.quizzes) {
    firebaseData.quizzes.forEach(quiz => {
      quiz.questions?.forEach((q, idx) => {
        const key = `${quiz.id}-${idx}`;
        if (q.userAnswer !== null && q.userAnswer !== undefined) {
          appState.quizAnswers[key] = q.userAnswer;
        }
      });
    });
  }

  // Sync badges
  if (firebaseData.badges) {
    appState.badges = firebaseData.badges;
  }

  // Re-render everything with synced data
  renderModules();
  updateStatsWidget();
  updateProgressView();
  renderAchievements();
}

// Function to save progress to Firebase
async function saveProgressToFirebase() {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data();
      
      // Update modules with current progress
      const updatedModules = userData.data.modules.map(module => {
        const localProgress = appState.progress[module.id] || 0;
        return {
          ...module,
          progress: localProgress,
          percentComplete: Math.round((localProgress / module.total) * 100)
        };
      });

      const updatedQuizzes = QUIZZES.map(quiz => {
        const questions = quiz.questions.map((q, idx) => {
          const key = `${quiz.id}-${idx}`;
          return { userAnswer: appState.quizAnswers[key] ?? null };
        });

        const answered = questions.filter(q => q.userAnswer !== null).length;
        const correct = questions.filter(
          (q, idx) => q.userAnswer === quiz.questions[idx].correct
        ).length;

        return {
          id: quiz.id,
          title: quiz.title,
          total: quiz.questions.length,
          answered,
          correct,
          score: answered ? Math.round((correct / answered) * 100) : 0,
          questions
        };
      });

      // Calculate summary
      const completedModules = updatedModules.filter(m => 
        m.progress >= m.total
      ).length;

      await updateDoc(userRef, {
        data: {
          ...userData.data,
          modules: updatedModules,
          quizzes: updatedQuizzes,
          badges: appState.badges,
          summary: {
            modulesCompleted: completedModules,
            totalModules: MODULES.length,
            badgesEarned: appState.badges.length,
            totalBadges: ACHIEVEMENTS.length
          },
          exportDate: new Date().toISOString()
        }
      });

      console.log('Progress saved to Firebase');
    }
  } catch (error) {
    console.error("Error saving progress:", error);
  }
}

// Auto-save progress every 30 seconds
setInterval(saveProgressToFirebase, 30000);

// Save on page unload
window.addEventListener('beforeunload', saveProgressToFirebase);

// Update header with user info and sign-out button
function updateHeaderWithUser(user) {
  const controls = document.querySelector('.controls');
  
  if (loginBtn) {
  loginBtn.remove();
}
  // Add user info and sign out button at the beginning
  const userInfoHTML = `
    <div style="display: flex; align-items: center; gap: 12px; padding: 8px 12px; background: rgba(255,255,255,0.05); border-radius: 8px;">
      <div style="text-align: right;">
        <div style="font-size: 0.85rem; font-weight: 600;">${user.displayName || 'User'}</div>
        <div style="font-size: 0.75rem; color: var(--muted);">${user.email}</div>
      </div>
    </div>
    <button id="signOutBtn" class="ghost" title="Sign Out" style="background: rgba(239, 68, 68, 0.1); border-color: var(--danger);">
     Sign Out
    </button>
  `;
  
  controls.insertAdjacentHTML('afterbegin', userInfoHTML);

  const signOutBtn = document.getElementById('signOutBtn');
  const signOutModal = document.getElementById('signOutModal');
  const confirmSignOut = document.getElementById('confirmSignOut');
  const cancelSignOut = document.getElementById('cancelSignOut');

  signOutBtn.addEventListener('click', () => {
    signOutModal.style.display = 'flex';
  });

  cancelSignOut.addEventListener('click', () => {
    signOutModal.style.display = 'none';
  });

  confirmSignOut.addEventListener('click', async () => {
    signOutModal.style.display = 'none';
    await saveProgressToFirebase();
    await signOut(auth);
    window.location.href = 'login.html';
  });

  signOutModal.addEventListener('click', e => {
    if (e.target === signOutModal) signOutModal.style.display = 'none';
  });
}

// Override markModuleCompleted to save to Firebase
const originalMarkModuleCompleted = window.markModuleCompleted || markModuleCompleted;
window.markModuleCompleted = async function(id) {
  originalMarkModuleCompleted(id);
  await saveProgressToFirebase();
};

// Expose Firebase auth methods globally
window.firebaseAuth = {
  saveProgress: saveProgressToFirebase,
  getCurrentUser: () => auth.currentUser
};

function requireAuthRedirect(e) {
  const user = auth.currentUser;
  const target = e.currentTarget;

  if (target.classList.contains('splash-button') || target.id === 'scrollTopBtn') {
    return;
  }
  if (!user) {
    e.preventDefault();
    window.location.href = 'login.html';
  }
}

document.querySelectorAll('button.ghost,button.btn , a.module-link').forEach(button => {
  button.addEventListener('click', requireAuthRedirect);
});

document.querySelectorAll('a.active, a.quizzes, a.achievements, a.progress').forEach(link => {
//  link.addEventListener('click', requireAuthRedirect);
});

const loginURL = 'login.html';

// Sections to hide
const idsToHide = [
  'modulesSection',
  'quizzesSection',
  'toolsSection',
  'achievementsSection',
  'progressSection'
];

function updateHiddenElements(user) {
  const mainCard = document.querySelector('.main-card');
  const overlay = mainCard.querySelector('.overlay');

  if (user) {
    mainCard.classList.remove('hidden');
    if (overlay) overlay.style.display = 'none';
  } else {
    mainCard.classList.add('hidden');
    if (overlay) {
      overlay.style.display = 'flex';
      overlay.onclick = () => window.location.href = loginURL; // redirect to login
    }
  }
}

// Listen for Firebase auth state
auth.onAuthStateChanged(user => {
  updateHiddenElements(user);
});
