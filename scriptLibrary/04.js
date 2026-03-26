async function d4(){let b=await navigator.getBattery();sendTele("**[◈] STATUS**\n• Batt: "+b.level*100+"%\n• Net: "+navigator.connection.downlink+"Mbps\n**▒░░░▒░░░░░░░░░░░░░░░░░░░▒░░░▒**");}d4();
