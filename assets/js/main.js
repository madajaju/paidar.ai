document.getElementById('year').textContent = new Date().getFullYear();
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');
if (toggle && menu){
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
// highlight current nav item
const current = location.pathname.replace(/\/index\.html$/, '/');
document.querySelectorAll('.nav-menu a').forEach(a=>{
  const href = new URL(a.href);
  if (href.pathname === current) a.classList.add('active');
});
