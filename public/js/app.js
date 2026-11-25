const contactForm=document.getElementById("contactForm");
const formStatus=document.getElementById("formStatus");
const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");

if(menuToggle&&navLinks){
  menuToggle.addEventListener("click",()=>{
    const isOpen=navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded",String(isOpen));
  });
  document.querySelectorAll(".nav-links a").forEach(link=>link.addEventListener("click",()=>{
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded","false");
  }));
}

// Reveal sections as they enter the viewport.
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

// Interactive eye tracking: the character looks toward the pointer.
const girlStage=document.getElementById("girlStage");
const girlCharacter=document.getElementById("girlCharacter");
const pupils=document.querySelectorAll(".girl-eye i");
if(girlStage&&girlCharacter){
  girlStage.addEventListener("pointermove",event=>{
    const rect=girlStage.getBoundingClientRect();
    const x=((event.clientX-rect.left)/rect.width-.5)*2;
    const y=((event.clientY-rect.top)/rect.height-.5)*2;
    pupils.forEach(pupil=>pupil.style.transform=`translate(${Math.max(-5,Math.min(5,x*5))}px,${Math.max(-4,Math.min(4,y*4))}px)`);
    girlCharacter.style.setProperty("--look-x",x.toFixed(2));
    girlCharacter.style.setProperty("--look-y",y.toFixed(2));
  });
  girlStage.addEventListener("pointerleave",()=>pupils.forEach(pupil=>pupil.style.transform=""));
}

// Subtle ambient star particles, with a reduced-motion fallback.
const canvas=document.getElementById("starfield");
if(canvas){
  const ctx=canvas.getContext("2d");
  const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars=[],w=0,h=0,raf=0;
  function resize(){
    const dpr=Math.min(window.devicePixelRatio||1,2);
    w=window.innerWidth;h=window.innerHeight;
    canvas.width=w*dpr;canvas.height=h*dpr;
    canvas.style.width=w+"px";canvas.style.height=h+"px";
    ctx.setTransform(dpr,0,0,dpr,0,0);
    stars=Array.from({length:Math.min(95,Math.floor(w*h/14000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.25+.25,a:Math.random()*.5+.12,s:(Math.random()*.12+.025)}));
    draw();
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const star of stars){
      ctx.beginPath();ctx.arc(star.x,star.y,star.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(211,198,255,${star.a})`;ctx.fill();
      if(!reduceMotion){star.y-=star.s;if(star.y<0){star.y=h;star.x=Math.random()*w;}}
    }
    if(!reduceMotion)raf=requestAnimationFrame(draw);
  }
  window.addEventListener("resize",resize,{passive:true});
  resize();
  if(reduceMotion)cancelAnimationFrame(raf);
}

if(contactForm){
  contactForm.addEventListener("submit",async event=>{
    event.preventDefault();
    const submitButton=contactForm.querySelector("button[type=submit]");
    const formData=new FormData(contactForm);
    const payload=Object.fromEntries(formData.entries());
    formStatus.textContent="Sending your message...";
    submitButton.disabled=true;
    try{
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const result=await response.json();
      formStatus.textContent=result.message||"Thanks! Your message has been received.";
      if(response.ok&&result.success)contactForm.reset();
    }catch(error){
      formStatus.textContent="Could not send the message right now. Please try again.";
    }finally{
      submitButton.disabled=false;
    }
  });
}
