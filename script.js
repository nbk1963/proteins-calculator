// Food database with protein content
const foodDatabase = [
    { name: 'Chicken Breast', protein: 31, unit: '100g', emoji: '🍗' },
    { name: 'Eggs', protein: 6, unit: 'per egg', emoji: '🥚' },
    { name: 'Lentils', protein: 9, unit: '100g', emoji: '🥣' },
    { name: 'Greek Yogurt', protein: 10, unit: '100g', emoji: '🥛' },
    { name: 'Tofu', protein: 8, unit: '100g', emoji: '🧈' },
    { name: 'Salmon', protein: 25, unit: '100g', emoji: '🐟' },
    { name: 'Lean Beef', protein: 26, unit: '100g', emoji: '🥩' },
    { name: 'Almonds', protein: 21, unit: '100g', emoji: '🌰' },
    { name: 'Milk', protein: 8, unit: '250ml', emoji: '🥛' },
    { name: 'Cottage Cheese', protein: 11, unit: '100g', emoji: '🧀' },
    { name: 'Whey Protein', protein: 24, unit: 'per scoop', emoji: '💪' },
    { name: 'Chickpeas', protein: 8, unit: '100g', emoji: '🫘' }
];

// App State
let currentUser = null;
let currentProteinGoal = null;

// DOM Elements
const proteinForm = document.getElementById('proteinForm');
const resultsSection = document.getElementById('resultsSection');
const proteinResult = document.getElementById('proteinResult');
const foodGrid = document.getElementById('foodGrid');
const recalculateBtn = document.getElementById('recalculateBtn');
const authModal = document.getElementById('authModal');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const closeModal = document.querySelector('.close');
const authForm = document.getElementById('authForm');
const authSwitchBtn = document.getElementById('authSwitchBtn');
const authSwitchText = document.getElementById('authSwitchText');
const modalTitle = document.getElementById('modalTitle');
const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
const authSubmit = document.getElementById('authSubmit');
const dashboardFeatures = document.getElementById('dashboardFeatures');
const userDashboard = document.getElementById('userDashboard');
const savePlanBtn = document.getElementById('savePlanBtn');
const setReminderBtn = document.getElementById('setReminderBtn');
const currentGoal = document.getElementById('currentGoal');
const dailyProgress = document.getElementById('dailyProgress');
const savedPlans = document.getElementById('savedPlans');

// Check if user is logged in (simulated)
function checkAuthStatus() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForAuth();
    }
}

// Update UI based on authentication
function updateUIForAuth() {
    if (currentUser) {
        loginBtn.textContent = 'Dashboard';
        signupBtn.textContent = 'Logout';
        userDashboard.style.display = 'block';
        updateDashboard();
    } else {
        loginBtn.textContent = 'Login';
        signupBtn.textContent = 'Sign Up';
        userDashboard.style.display = 'none';
    }
}

// Update dashboard with user data
function updateDashboard() {
    if (!currentUser) return;
    
    const savedGoal = localStorage.getItem(`proteinGoal_${currentUser.email}`);
    if (savedGoal) {
        currentGoal.textContent = `${savedGoal}g per day`;
        currentProteinGoal = parseInt(savedGoal);
    }
    
    // Simulate daily progress
    const progress = Math.floor(Math.random() * 100);
    dailyProgress.textContent = `${progress}%`;
    
    displaySavedPlans();
}

// Display saved plans
function displaySavedPlans() {
    if (!currentUser) return;
    
    const plans = JSON.parse(localStorage.getItem(`savedPlans_${currentUser.email}`) || '[]');
    savedPlans.innerHTML = '<h4>Saved Plans</h4>';
    
    if (plans.length === 0) {
        savedPlans.innerHTML += '<p>No saved plans yet.</p>';
        return;
    }
    
    plans.forEach((plan, index) => {
        const planElement = document.createElement('div');
        planElement.className = 'food-item';
        planElement.innerHTML = `
            <h5>${plan.gender}, ${plan.weight}kg</h5>
            <p>${plan.protein}g protein/day</p>
            <small>${new Date(plan.date).toLocaleDateString()}</small>
        `;
        savedPlans.appendChild(planElement);
    });
}

// Protein calculation function
function calculateProtein(gender, weight) {
    const proteinPerKg = gender === 'male' ? 1.0 : 0.8;
    return Math.round(weight * proteinPerKg);
}

// Generate food suggestions
function generateFoodSuggestions(proteinGoal) {
    foodGrid.innerHTML = '';
    
    // Sort foods by protein density and select diverse options
    const sortedFoods = [...foodDatabase].sort((a, b) => b.protein - a.protein);
    const selectedFoods = sortedFoods.slice(0, 8);
    
    selectedFoods.forEach(food => {
        const servings = Math.ceil(proteinGoal / food.protein);
        const foodElement = document.createElement('div');
        foodElement.className = 'food-item';
        foodElement.innerHTML = `
            <h5>${food.emoji} ${food.name}</h5>
            <p>${food.protein}g per ${food.unit}</p>
            <small>≈ ${servings} ${food.unit.toLowerCase()} for goal</small>
        `;
        foodGrid.appendChild(foodElement);
    });
}

// Event Listeners
proteinForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    
    if (!gender || !weight) {
        alert('Please fill in all fields');
        return;
    }
    
    const proteinNeeds = calculateProtein(gender, weight);
    currentProteinGoal = proteinNeeds;
    
    // Display results
    proteinResult.textContent = `Your recommended daily protein intake is: ${proteinNeeds} grams.`;
    generateFoodSuggestions(proteinNeeds);
    resultsSection.style.display = 'block';
    
    // Show dashboard features if logged in
    if (currentUser) {
        dashboardFeatures.style.display = 'block';
    }
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
});

recalculateBtn.addEventListener('click', function() {
    resultsSection.style.display = 'none';
    proteinForm.reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Authentication Modal
loginBtn.addEventListener('click', function() {
    if (currentUser) {
        userDashboard.scrollIntoView({ behavior: 'smooth' });
    } else {
        showLoginModal();
    }
});

signupBtn.addEventListener('click', function() {
    if (currentUser) {
        // Logout
        localStorage.removeItem('currentUser');
        currentUser = null;
        updateUIForAuth();
        dashboardFeatures.style.display = 'none';
    } else {
        showSignupModal();
    }
});

closeModal.addEventListener('click', function() {
    authModal.style.display = 'none';
});

authSwitchBtn.addEventListener('click', function() {
    const isLogin = modalTitle.textContent === 'Login to Protein Planner';
    if (isLogin) {
        showSignupModal();
    } else {
        showLoginModal();
    }
});

authForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const isSignup = modalTitle.textContent === 'Create Your Account';
    
    if (isSignup) {
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    }
    
    // Simulate authentication (in real app, this would call an API)
    if (email && password) {
        currentUser = { email, name: email.split('@')[0] };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        authModal.style.display = 'none';
        updateUIForAuth();
        alert(isSignup ? 'Account created successfully!' : 'Login successful!');
        
        // If we have a current protein goal, show dashboard features
        if (currentProteinGoal) {
            dashboardFeatures.style.display = 'block';
        }
    }
});

// Save plan functionality
savePlanBtn.addEventListener('click', function() {
    if (!currentUser || !currentProteinGoal) return;
    
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    
    const plan = {
        gender,
        weight,
        protein: currentProteinGoal,
        date: new Date().toISOString()
    };
    
    // Save to localStorage
    const savedPlansKey = `savedPlans_${currentUser.email}`;
    const existingPlans = JSON.parse(localStorage.getItem(savedPlansKey) || '[]');
    existingPlans.push(plan);
    localStorage.setItem(savedPlansKey, JSON.stringify(existingPlans));
    
    // Save current goal
    localStorage.setItem(`proteinGoal_${currentUser.email}`, currentProteinGoal);
    
    updateDashboard();
    alert('Plan saved to your dashboard!');
});

// Set reminder functionality
setReminderBtn.addEventListener('click', function() {
    if (!currentUser) return;
    
    // In a real app, this would integrate with an email service
    alert('Daily reminder set! You\'ll receive an email reminder to hit your protein target.');
});

// Modal display functions
function showLoginModal() {
    modalTitle.textContent = 'Login to Protein Planner';
    authSubmit.textContent = 'Login';
    authSwitchText.textContent = 'Don\'t have an account?';
    authSwitchBtn.textContent = 'Sign up';
    confirmPasswordGroup.style.display = 'none';
    authModal.style.display = 'block';
    authForm.reset();
}

function showSignupModal() {
    modalTitle.textContent = 'Create Your Account';
    authSubmit.textContent = 'Sign Up';
    authSwitchText.textContent = 'Already have an account?';
    authSwitchBtn.textContent = 'Login';
    confirmPasswordGroup.style.display = 'block';
    authModal.style.display = 'block';
    authForm.reset();
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});
