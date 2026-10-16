const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.getElementById('yr').textContent=new Date().getFullYear();

// Contact form -> FormSubmit -> Daniel's Gmail
(function () {
  var f = document.getElementById('cform'); if (!f) return;
  var st = document.getElementById('cstatus'), btn = f.querySelector('button[type=submit]'), done = document.getElementById('cdone');
  var cnt = document.getElementById('ccount');
  f.message.addEventListener('input', function () { cnt.textContent = f.message.value.length; });
  ['name', 'email', 'message'].forEach(function (n) { f.elements[n].addEventListener('input', function () { f.elements[n].classList.remove('bad'); }); });
  document.getElementById('cagain').addEventListener('click', function () { done.hidden = true; f.hidden = false; f.name.focus(); });
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (f._honey.value) return;
    var d = { name: f.name.value.trim(), email: f.email.value.trim(), service: f.service.value, message: f.message.value.trim() };
    var bad = [];
    if (!d.name) bad.push('name');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) bad.push('email');
    if (!d.message) bad.push('message');
    if (bad.length) { bad.forEach(function (n) { f.elements[n].classList.add('bad'); }); f.elements[bad[0]].focus(); st.className = 'cstatus err'; st.textContent = 'Please fill in your name, a valid email, and a message.'; return; }
    btn.disabled = true; btn.textContent = 'Sending…'; st.className = 'cstatus'; st.textContent = '';
    fetch('https://formsubmit.co/ajax/qwertydaniel86@gmail.com', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: d.name, email: d.email, 'help with': d.service, message: d.message, _replyto: d.email, _subject: 'VA inquiry: ' + d.service + ' from ' + d.name, _template: 'table', _captcha: 'false' })
    }).then(function (r) { return r.json().then(function (j) { if (!r.ok || String(j.success) !== 'true') throw new Error(j.message || 'failed'); }); })
      .then(function () { f.reset(); cnt.textContent = '0'; f.hidden = true; done.hidden = false; })
      .catch(function () { st.className = 'cstatus err'; st.innerHTML = 'Sorry, that didn\u2019t go through. Please email me at <a href="mailto:qwertydaniel86@gmail.com">qwertydaniel86@gmail.com</a>.'; })
      .finally(function () { btn.disabled = false; btn.textContent = 'Send message \u2192'; });
  });
})();
