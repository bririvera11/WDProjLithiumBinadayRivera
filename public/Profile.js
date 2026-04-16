window.addEventListener("DOMContentLoaded", () => {
    switchTab('signup');
    const settings = document.querySelector('.settings');
    if (settings) settings.classList.add('hidden');
});

function switchTab(type) {
    const signForm = document.getElementById('signForm');
    const logForm = document.getElementById('logForm');
    const hCreate = document.getElementById('hCreate');
    const hLogin = document.getElementById('hLogin');

    if (type === 'signup') {
        signForm.classList.remove('hidden');
        logForm.classList.add('hidden');
        hCreate.classList.add('active');
        hLogin.classList.remove('active');
    } else {
        signForm.classList.add('hidden');
        logForm.classList.remove('hidden');
        hCreate.classList.remove('active');
        hLogin.classList.add('active');
    }
}

function signUp() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('pass').value;
    const choice = document.getElementById('choice').value;

    if (!username || !password || !choice) {
        alert('Please fill in all fields.');
        return;
    }

    const account = {
        username,
        password,
        kingdom: choice,
        choice
    };

    localStorage.setItem('currentAccount', JSON.stringify(account));
    alert('Account created successfully! Please log in.');
    switchTab('login');
}

function logIn() {
    const usernameLogin = document.getElementById('usernameLogin').value.trim();
    const passwordLogin = document.getElementById('passLogin').value;
    const saved = localStorage.getItem('currentAccount');

    if (!saved) {
        alert('No account found. Please sign up first.');
        switchTab('signup');
        return;
    }

    const account = JSON.parse(saved);
    console.log('Profile logIn', { usernameLogin, passwordLogin, savedAccount: account });
    if (account.username === usernameLogin && account.password === passwordLogin) {
        alert('Login successful!');
        showPopUp();
    } else {
        alert('Incorrect username or password. Please try again.');
    }
}
function showPopUp() {

    const modal = document.getElementById("popup");
    const img = document.getElementById("popupImage");
    const text = document.getElementById("popupText");
    const saved = localStorage.getItem("currentAccount");
    if (!modal || !img || !text) {
        console.error('Profile popup element missing', { modal, img, text });
        alert('Popup markup is missing or has wrong IDs. Check Profile.html.');
        return;
    }
    if (!saved) {
        alert("No account found. Please sign up first.");
        return;
    }
    const account = JSON.parse(saved);
    const popUp = {

        "Hathoria": {
            img: "../assets/ThePirena.png",
            text: "Hathoria is the kingdom of fire, known for its determined warriors and passionate people."
        },
        "Lireo": {
            img: "../assets/TheAmihan.png",
            text: "Lireo is the kingdom of air where royalties reside."
        },
        "Sapiro": {
            img: "../assets/TheDanaya.png",
            text: "Sapiro is the kingdom of earth, renowned for its strong and resilient inhabitants."
        },
        "Adamya": {
            img: "../assets/TheAlena.png",
            text: "Adamya is the kingdom of water, home to unique inhabitants fitting for the environment."
        }
    };
    const kingdom = account.kingdom || account.choice;
    console.log('Profile showPopUp', { account, kingdom, modal, img, text });
    const selected = popUp[kingdom];
    if (!selected) {
        alert("No kingdom selected. Please sign up again with a kingdom.");
        return;
    }
    img.src = selected.img;
    text.textContent = selected.text;
    modal.classList.remove('hidden');
    modal.hidden = false;
    modal.style.display = "flex";
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.style.zIndex = "9999";

    const settings = document.querySelector('.settings');
    if (settings) {
        settings.classList.remove('hidden');
        settings.classList.add('visible');
    }
    const auth = document.querySelector('.auth');
    if (auth) auth.classList.add('hidden');
}

// close popup
function closePopUp() {
    const modal = document.getElementById("popup");
    modal.classList.add('hidden');
    modal.style.display = "none";
}

const fileInput = document.getElementById('fileInput');
const avatar = document.getElementById('avatar');

fileInput.addEventListener('change', function() {
     const file = this.files ? this.files[0] : null;
     if (file && avatar) {
         const reader = new FileReader();
         reader.onload = function(e) {
             avatar.src = e.target.result;
         };
         reader.readAsDataURL(file);
     }
});

document.getElementById('clearAvatar').addEventListener('click', function() {
    avatar.src = "";
    fileInput.value = "";
});

function simulateLogin() {
     const dummy = {
          username: "Danaya",
          email: "danaya@example.com",
          bio: "Tagapangalaga ako ng brilyante",
          kingdom: "Sapiro"
     };
     const usernameLogin = document.getElementById('usernameLogin');
     if (usernameLogin) usernameLogin.value = dummy.username;
     const displayUsername = document.getElementById('displayUsername');
     if (displayUsername) displayUsername.innerText = dummy.username;
     const emailInput = document.getElementById('emailInput');
     if (emailInput) emailInput.value = dummy.email;
     const aboutInput = document.getElementById('aboutInput');
     if (aboutInput) aboutInput.value = dummy.bio;
     const kingdomLabel = document.getElementById('kingdomLabel');
     if (kingdomLabel) kingdomLabel.innerText = dummy.kingdom;
}
window.onload = simulateLogin;
