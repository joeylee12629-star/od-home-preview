/* 共享驱动:Generate 按钮重放生成阶段;brand chip 切换设计系统变量 */
function demo(stages, opts) {
  opts = opts || {};
  var gen = document.querySelector('.gen');
  var logEl = document.querySelector('.log');
  var timers = [];
  function clearTimers(){ timers.forEach(clearTimeout); timers = []; }
  function run(){
    clearTimers();
    gen.classList.add('busy');
    document.querySelectorAll('.el').forEach(function(e){ e.classList.remove('in'); });
    if (logEl) logEl.querySelectorAll('div').forEach(function(d){ d.classList.remove('show'); });
    var t = 250;
    stages.forEach(function(st, i){
      timers.push(setTimeout(function(){
        (st.els || []).forEach(function(sel){
          document.querySelectorAll(sel).forEach(function(e){ e.classList.add('in'); });
        });
        if (logEl && st.log){
          var d = logEl.children[i];
          if (d){ d.textContent = st.log; d.className = 'ok show'; }
        }
        if (st.fn) st.fn();
        if (i === stages.length - 1) gen.classList.remove('busy');
      }, t));
      t += (st.wait || 650);
    });
  }
  gen.addEventListener('click', run);
  document.querySelectorAll('.chip').forEach(function(c){
    c.addEventListener('click', function(){
      document.querySelectorAll('.chip').forEach(function(x){ x.classList.remove('on'); });
      c.classList.add('on');
      var r = document.documentElement.style;
      if (c.classList.contains('c-acid'))  { r.setProperty('--b1','#63fe13'); r.setProperty('--b2','#262626'); }
      if (c.classList.contains('c-coral')) { r.setProperty('--b1','#ff6a3d'); r.setProperty('--b2','#1f1f38'); }
      if (c.classList.contains('c-blue'))  { r.setProperty('--b1','#3b82f6'); r.setProperty('--b2','#0f172a'); }
      if (opts.onBrand) opts.onBrand();
    });
  });
  run();
}
