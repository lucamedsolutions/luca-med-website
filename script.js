// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Form validation and fake submission
const form = document.getElementById('signupForm');
const alertBox = document.getElementById('formAlert');

function showError(input, message){
  const group = input.closest('.form__group');
  const error = group.querySelector('.error');
  if (error){
    error.textContent = message;
    error.style.display = 'block';
  }
  input.setAttribute('aria-invalid', 'true');
}
function clearError(input){
  const group = input.closest('.form__group');
  const error = group.querySelector('.error');
  if (error){
    error.style.display = 'none';
  }
  input.removeAttribute('aria-invalid');
}

function validateEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    alertBox.hidden = true;
    alertBox.className = 'alert';

    const fields = ['pharmacyName','contactName','email','phone','locations','monthlyVolume'];
    let valid = true;

    fields.forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      clearError(input);

      if (!input.value) {
        showError(input, 'This field is required.');
        valid = false;
        return;
      }

      if (id === 'email' && !validateEmail(input.value)) {
        showError(input, 'Please enter a valid email address.');
        valid = false;
      }

      if (id === 'phone' && !/^[0-9+()\-\s]{7,}$/.test(input.value)) {
        showError(input, 'Please enter a valid phone number.');
        valid = false;
      }
    });

    const terms = document.getElementById('terms');
    if (!terms.checked) {
      valid = false;
      alertBox.textContent = 'Please agree to the Terms and Privacy Policy.';
      alertBox.classList.add('alert--error');
      alertBox.hidden = false;
      return;
    }

    if (!valid) {
      alertBox.textContent = 'Please correct the highlighted fields.';
      alertBox.classList.add('alert--error');
      alertBox.hidden = false;
      return;
    }

    // Simulated submission; replace with real endpoint as needed
    try {
      // Example: await fetch('/api/signup', { method:'POST', body: new FormData(form) })
      await new Promise(res => setTimeout(res, 800));
      form.reset();
      alertBox.textContent = 'Thanks! Your request has been received. We will reach out shortly.';
      alertBox.classList.add('alert--success');
      alertBox.hidden = false;
    } catch (err) {
      alertBox.textContent = 'Something went wrong. Please try again.';
      alertBox.classList.add('alert--error');
      alertBox.hidden = false;
    }
  });
}
