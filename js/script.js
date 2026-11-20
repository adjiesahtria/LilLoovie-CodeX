// menu mobile
const menu=document.getElementById('menu'),burger=document.getElementById('burger');
const setMenu=o=>{menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.innerHTML='<i class="fa-solid '+(o?'fa-xmark':'fa-bars')+'"></i>'};
burger.onclick=()=>setMenu(!menu.classList.contains('open'));
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>setMenu(false));
// tahun
document.getElementById('yr').textContent=new Date().getFullYear();
// reveal + skill bar (sekali saja, lalu berhenti diamati)
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');
    e.target.querySelectorAll('.bar i').forEach(b=>b.style.transform='scaleX('+b.dataset.w/100+')');
    io.unobserve(e.target)}
}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
// counter (requestAnimationFrame, 1 kali)
document.querySelectorAll('[data-n]').forEach(el=>{
  const t=+el.dataset.n,d=1400,s=performance.now();
  const f=n=>{const p=Math.min((n-s)/d,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3)))+'+';if(p<1)requestAnimationFrame(f)};
  requestAnimationFrame(f);
});
// nav aktif lewat IntersectionObserver (tanpa hitung di setiap scroll)
const links=[...menu.querySelectorAll('a')];
const so=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));
}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section[id]').forEach(s=>so.observe(s));
// tombol ke atas (throttle rAF)
const topBtn=document.getElementById('top');let tick=false;
addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{topBtn.classList.toggle('show',scrollY>600);tick=false})},{passive:true});
topBtn.onclick=()=>scrollTo({top:0,behavior:'smooth'});
// hentikan marquee saat tab tidak aktif
document.addEventListener('visibilitychange',()=>{document.querySelector('.track').style.animationPlayState=document.hidden?'paused':'running'});