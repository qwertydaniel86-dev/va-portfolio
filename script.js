const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.getElementById('yr').textContent=new Date().getFullYear();

// Contact form -> FormSubmit -> Daniel's Gmail
(function () {
  var f = document.getElementById('cform'); if (!f) return;
  var st = document.getElementById('cstatus'), btn = f.querySelector('button');
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (f._honey.value) return;
    var d = { name: f.name.value.trim(), email: f.email.value.trim(), message: f.message.value.trim() };
    if (!d.name || !d.message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) { st.className = 'cstatus err'; st.textContent = 'Please fill in your name, a valid email, and a message.'; return; }
    btn.disabled = true; st.className = 'cstatus'; st.textContent = 'Sending…';
    fetch('https://formsubmit.co/ajax/qwertydaniel86@gmail.com', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: d.name, email: d.email, message: d.message, _replyto: d.email, _subject: 'VA inquiry from ' + d.name, _template: 'table', _captcha: 'false' })
    }).then(function (r) { return r.json().then(function (j) { if (!r.ok || String(j.success) !== 'true') throw new Error(j.message || 'failed'); }); })
      .then(function () { f.reset(); st.className = 'cstatus ok'; st.textContent = "Thanks! Your message was sent. I'll reply by email soon."; })
      .catch(function () { st.className = 'cstatus err'; st.innerHTML = 'Sorry, that didn\u2019t go through. Please email me at <a href="mailto:qwertydaniel86@gmail.com">qwertydaniel86@gmail.com</a>.'; })
      .finally(function () { btn.disabled = false; });
  });
})();
