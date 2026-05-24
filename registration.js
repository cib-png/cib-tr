import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* firebase */

const firebaseConfig = {
  apiKey: "AIzaSyBxnGDLZGE4kR9I0MOqpPbWkRFdXJEHqgE",
  authDomain: "ciiib-a14e0.firebaseapp.com",
  projectId: "ciiib-a14e0",
  storageBucket: "ciiib-a14e0.firebasestorage.app",
  messagingSenderId: "158984305803",
  appId: "1:158984305803:web:47a8326e751b95bcd1a88e",
  measurementId: "G-CWFPE6QTJ3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/* your original logic */

const form = document.getElementById('regForm');

form.addEventListener('submit', async function(e){

    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();

    const idNumber = document.getElementById('idNumber').value.trim();

    const phoneNumber = document.getElementById('phoneNumber').value.trim();

    let valid = true;

    document.getElementById('nameError').textContent = '';

    document.getElementById('idError').textContent = '';

    document.getElementById('phoneError').textContent = '';

    if(fullName.length < 3){

        document.getElementById('nameError').textContent =
        'يرجى إدخال الاسم الكامل';

        valid = false;

    }

    if(idNumber.length !== 14){

        document.getElementById('idError').textContent =
        'الرقم القومي يجب أن يكون 14 رقم';

        valid = false;

    }

    if(phoneNumber.length !== 11){

        document.getElementById('phoneError').textContent =
        'رقم الهاتف يجب أن يكون 11 رقم';

        valid = false;

    }

    if(!valid) return;

    /* keep your localStorage */

    localStorage.setItem('demoUser', JSON.stringify({

        fullName,
        idNumber,
        phoneNumber

    }));

    /* firebase save */

    try{

        const userId =
    encodeURIComponent(phoneNumber);

await setDoc(doc(db,"users",userId),{

    name: fullName,

    nationalId: idNumber,

    phone: phoneNumber,

    status: "pending",


    createdAt: Date.now()

},{ merge:true });

localStorage.setItem("userId", userId);

    }catch(error){

        console.log(error);

    }

    /* keep your loader */

    document
        .getElementById('loadingOverlay')
        .classList.add('active');

    setTimeout(() => {

        window.location.href = 'login.html';

    }, 2000);

});