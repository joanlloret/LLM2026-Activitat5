let intervalAntiguitat = null;

function canviarPestanya(pestanya) {
    document.getElementById("form-login").classList.add("ocult");
    document.getElementById("form-registre").classList.add("ocult");
    document.getElementById("form-recuperar").classList.add("ocult");

    document.getElementById("tab-login").classList.remove("activa");
    document.getElementById("tab-registre").classList.remove("activa");
    document.getElementById("tab-recuperar").classList.remove("activa");

    document.getElementById("form-" + pestanya).classList.remove("ocult");
    document.getElementById("tab-" + pestanya).classList.add("activa");
}

function registrarSoci(event) {
    event.preventDefault();
    const nom = document.getElementById("reg-nom").value.trim();
    const email = document.getElementById("reg-email").value.trim().toLowerCase();
    const pass = document.getElementById("reg-pass").value;

    if (pass.length < 8) {
        alert("ERROR: La contrasenya ha de tenir com a mínim 8 caràcters.");
        return;
    }

    let socis = JSON.parse(localStorage.getItem("fcb_socis_db")) || [];
    if (socis.some(s => s.email === email)) {
        alert("Aquest correu electrònic ja està registrat. Inicia sessió o recupera la contrasenya.");
        return;
    }

    const nouSoci = {
        nom: nom,
        email: email,
        password: pass,
        numeroSoci: Math.floor(100000 + Math.random() * 899999),
        dataAlta: new Date().toISOString()
    };

    socis.push(nouSoci);
    localStorage.setItem("fcb_socis_db", JSON.stringify(socis));
    localStorage.setItem("fcb_soci_actiu", email);

    alert("Benvingut/da al FC Barcelona, " + nom + "! El teu compte de soci s'ha creat correctament.");
    mostrarPanellPrivat(nouSoci);
}

function iniciarSessioSoci(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const pass = document.getElementById("login-pass").value;

    const socis = JSON.parse(localStorage.getItem("fcb_socis_db")) || [];
    const sociTrobat = socis.find(s => s.email === email && s.password === pass);

    if (!sociTrobat) {
        alert("ERROR: Correu electrònic o contrasenya incorrectes. Si no tens compte, registra't a 'Fer-se Soci'.");
        return;
    }

    localStorage.setItem("fcb_soci_actiu", email);
    mostrarPanellPrivat(sociTrobat);
}

function recuperarContrasenya(event) {
    event.preventDefault();
    const email = document.getElementById("rec-email").value.trim().toLowerCase();
    const socis = JSON.parse(localStorage.getItem("fcb_socis_db")) || [];
    const sociTrobat = socis.find(s => s.email === email);
    const caixaInfo = document.getElementById("resultat-recuperacio");

    caixaInfo.classList.remove("ocult");
    if (!sociTrobat) {
        caixaInfo.innerHTML = "<strong>No s'ha trobat cap soci</strong> registrat amb el correu <em>" + email + "</em>.";
        return;
    }

    caixaInfo.innerHTML = "<strong>Compte verificat!</strong> Hola " + sociTrobat.nom + ", la teva contrasenya actual és: <strong>" + sociTrobat.password + "</strong>. Ja pots iniciar sessió i canviar-la des del teu perfil.";
}

function mostrarPanellPrivat(soci) {
    document.getElementById("panell-autenticacio").classList.add("ocult");
    document.getElementById("panell-privat-soci").classList.remove("ocult");

    document.getElementById("carnet-nom").textContent = soci.nom;
    document.getElementById("carnet-email").textContent = soci.email;
    document.getElementById("carnet-numero").textContent = soci.numeroSoci.toLocaleString("ca-ES");

    const dataAlta = new Date(soci.dataAlta);
    document.getElementById("carnet-data-alta").textContent = dataAlta.toLocaleDateString("ca-ES", {
        day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
    });

    if (intervalAntiguitat) clearInterval(intervalAntiguitat);
    actualitzarAntiguitat(dataAlta);
    intervalAntiguitat = setInterval(() => actualitzarAntiguitat(dataAlta), 1000);
}

function actualitzarAntiguitat(dataAlta) {
    const ara = new Date();
    const diferenciaMs = ara - dataAlta;

    const segonsTotals = Math.floor(diferenciaMs / 1000);
    const dies = Math.floor(segonsTotals / 86400);
    const hores = Math.floor((segonsTotals % 86400) / 3600);
    const minuts = Math.floor((segonsTotals % 3600) / 60);
    const segons = segonsTotals % 60;

    const textAntiguitat = dies + " dies, " + hores + " hores, " + minuts + " minuts i " + segons + " segons";
    const spanComptador = document.getElementById("comptador-antiguitat");
    if (spanComptador) {
        spanComptador.textContent = textAntiguitat;
    }
}

function tancarSessioSoci() {
    localStorage.removeItem("fcb_soci_actiu");
    if (intervalAntiguitat) clearInterval(intervalAntiguitat);
    document.getElementById("panell-privat-soci").classList.add("ocult");
    document.getElementById("panell-autenticacio").classList.remove("ocult");
}

/* --- VALIDACIÓ DE CONTRASENYA --- */
function validarContrasenya(event) {
    event.preventDefault();

    const p1 = document.getElementById("pass1").value;
    const p2 = document.getElementById("pass2").value;

    if (p1.length < 8) {
        alert("ERROR: La contrasenya ha de tenir un mínim de 8 caràcters de longitud.");
        return;
    }

    if (p1 !== p2) {
        alert("ERROR: Les dues contrasenyes no coincideixen. Torna-ho a intentar.");
        return;
    }

    // Actualitzem també la contrasenya guardada del soci
    const emailActiu = localStorage.getItem("fcb_soci_actiu");
    if (emailActiu) {
        let socis = JSON.parse(localStorage.getItem("fcb_socis_db")) || [];
        const idx = socis.findIndex(s => s.email === emailActiu);
        if (idx !== -1) {
            socis[idx].password = p1;
            localStorage.setItem("fcb_socis_db", JSON.stringify(socis));
        }
    }

    alert("S'ha canviat correctament la contrasenya");
    document.getElementById("form-password").reset();
}

// Comprovar si ja hi havia un soci connectat
document.addEventListener("DOMContentLoaded", function() {
    const emailActiu = localStorage.getItem("fcb_soci_actiu");
    if (emailActiu && document.getElementById("panell-privat-soci")) {
        const socis = JSON.parse(localStorage.getItem("fcb_socis_db")) || [];
        const sociTrobat = socis.find(s => s.email === emailActiu);
        if (sociTrobat) {
            mostrarPanellPrivat(sociTrobat);
        }
    }
});
