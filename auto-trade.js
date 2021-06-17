function start_new_bot(e, t, a, n, s, o, r, i, m, c) {
    function d() {
        var e = (new Date).getTime() + timecheck;
        timeend = 60 * Math.ceil((Math.ceil(e / 1e3) + 30) / 60) + 60 * (time - 1), !0 === auto ? l() : p();
        var t = Math.ceil(minamount / 100 * procent);
        if (balance < oldbalance) {
            switch (amount = Math.ceil(summ / procent * 100), strategy) {
                case 1:
                    summ += amount;
                    break;
                case 2:
                    summ = summ + amount + t
            }
            u()
        }
        if (balance > oldbalance) switch (amount = minamount, strategy) {
            case 1:
                summ = amount + t;
                break;
            case 2:
                summ = amount + t + t
        }
        balance >= maxdohod && f(y.maxdohod), 
		procent < minper && f(y.minper), 
		amount > maxstavka && (amount = minamount), 
		amount > balance && (amount = balance), 
		ref += 1, 
		oldbalance = balance, 
		amount = (parseInt(amount/100, 10)+1)*100,
	    amount = amount - 100,
		ws.send('{"topic":"base","event":"create_deal","payload":{"demo":true,"asset":"' + asset + '","expire_at":' + timeend + ',"amount":' + amount + ',"source":"mouse","trusted":false,"created_at":' + e + ',"option_type":"turbo","deal_type":"' + type + '","tournament_id":null,"trend":"' + trend + '"},"ref":"' + ref + '","join_ref":"1"}')
    }

    function u() {
        trend = "call" == trend ? "put" : "call"
    }

    function l() {
        switch (date_server.getUTCDay()) {
            case 1:
                e = "mon";
                break;
            case 2:
                e = "tue";
                break;
            case 3:
                e = "wed";
                break;
            case 4:
                e = "thu";
                break;
            case 5:
                e = "fri";
                break;
            case 6:
                e = "sat";
                break;
            case 0:
                var e = "sun"
        }
        var t = date_server.getUTCHours() + ":" + date_server.getUTCMinutes(),
            a = new XMLHttpRequest;
        a.open("GET", "https://binomo-webtrade.com/api/assets?device=web&locale=en", !1), 
		a.send(), 
		200 != a.status && alert(a.status + ": " + a.statusText);
        var n = JSON.parse(a.responseText);
        procent = n.data.assets[paraid].payment_rate_turbo, asset = n.data.assets[paraid].ric, 0 == n.data.assets[paraid].active && (procent = 10);
        for (key in n.data.assets) procent < n.data.assets[key].payment_rate_turbo && 1 == n.data.assets[key].active && 1 == n.data.assets[key].enabled_for_demo && t > n.data.assets[key].schedule[e][0][0] && t < n.data.assets[key].schedule[e][0][1] && (procent = n.data.assets[key].payment_rate_turbo, asset = n.data.assets[key].ric, paraid = key)
    }

    function p() {
        var e = new XMLHttpRequest;
        e.open("GET", "https://binomo-webtrade.com/api/assets?device=web&locale=en", !1), 
		e.send(), 
		200 != e.status && alert(e.status + ": " + e.statusText), 
		pairs = JSON.parse(e.responseText), procent = pairs.data.assets[paraid].payment_rate_turbo, asset = pairs.data.assets[paraid].ric
    }

    function f(e) {
        ref = 1, 
		summ = minamount, 
		ws.close(), 
		swal({
            title: y.stop,
            text: e,
            type: "error",
            confirmButtonText: "OK",
            html: !0
        })
    }
	
    if (-1 !== document.documentElement.innerHTML.indexOf("data-config") && (info = JSON.parse(document.documentElement.innerHTML.split('data-config="')[1].split('"')[0].replace(/\&quot;/gi, '"'))), 1 !== ref) 
	    swal({
        title: y.alstart,
        text: y.alstart2,
        type: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#2cac40"
    })
    else {
        type = !0 === c ? "demo" : "real", 
		auto = !0 === s, 
		!0 === o && (strategy = 1), 
		!0 === r && (strategy = 2), 
		paraid = n, 
		time = a, 
		maxdohod = 100 * Number(m), 
		minper = Number(i), 
		maxstavka = 100 * Number(t), 
		minamount = 100 * Number(e), 
		summ = minamount, 
		amount = minamount;
        var b = new XMLHttpRequest;
        b.open("GET", "https://binomo-webtrade.com/api/profile?device=web&locale=en", !0), 
		b.send(), 
		b.onreadystatechange = function() {
            4 == b.readyState && (200 != b.status || (balance = "demo" == type ? JSON.parse(b.responseText).data.demo_balance : JSON.parse(b.responseText).data.balance, (ws = new WebSocket("wss://ws.binomo-webtrade.com/?authtoken=" + info.auth_key + "&device=web&device_id=" + info.deviceId + "&v=2&vsn=2.0.0")).onopen = function() {
                ws.send('{"topic":"base","event":"phx_join","payload":{},"ref":"' + ref + '","join_ref":"1"}'), 1 == ref && swal({
                    title: y.start,
                    text: y.start2,
                    type: "success",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#2cac40"
                }), ref += 1, 
				    ws.send('{"topic":"base","event":"ping","payload":{},"ref":"' + ref + '","join_ref":"1"}'), 
					timerId = setInterval(function() {
                    ref += 1, 
					ws.send('{"topic":"base","event":"ping","payload":{},"ref":"' + ref + '","join_ref":"1"}'), 
					ref += 1, 
					ws.send('{"topic":"phoenix","event":"heartbeat","payload":{},"ref":"' + ref + '"}')
                }, 6e4)
            }, ws.onclose = function(e) {
                e.wasClean ? ref = 1 : swal({
                    title: "Oops...",
                    text: "Internet connection is missing.",
                    type: "error",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#2cac40"
                })
            }, ws.onmessage = function(e) {
                void 0 !== (mes = JSON.parse(e.data)).payload.response && void 0 !== mes.payload.response.now && (date_server = new Date(mes.payload.response.now), timecheck = date_server.getTime() - (new Date).getTime(), 2 == mes.ref && d()), "change_balance" == mes.event && (balance = "demo" == type ? mes.payload.demo_balance : mes.payload.balance, (new Date).getTime() + timecheck >= 1e3 * timeend && (clearTimeout(timerIdStavka), timerIdStavka = setTimeout(function() {
                    d()
                }, 5e3))), "error" === mes.payload.status && f("Error: " + mes.payload.response.reasons[0].validation)
            }, ws.onerror = function(e) {}))
        }
    }
    if ("id" == lang.valueOf()) y = {
        stop: "Robotnya berhenti!",
        start: "Robot diluncurkan!",
        start2: "Anda dapat membuka tab lain, tetapi tidak menutup platform.",
        alstart: "Robot sudah berjalan!",
        alstart2: "Hentikan robot dengan menekan tombol Stop dan restart.",
        maxdohod: "Robot telah mencapai jumlah maksimum. Aktifkan robot untuk menghapus batasan ini.",
        minper: "Persentase kemenangan turun di bawah filter yang ditetapkan."
    };
    else var y = {
        stop: "Robot is stopped!",
        start: "Robot is running!",
        start2: "You can open another tab, but do not close the platform.",
        alstart: "The robot is already running!",
        alstart2: "Click the stop button and you can start it again.",
        maxdohod: "The robot reached the maximum balance. Activate the robot to remove this restriction.",
        minper: "The percentage of winnings fell below the allowable. Change the settings or wait for the percentage to increase."
    }
}
