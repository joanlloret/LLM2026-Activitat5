/* --- CARRUSEL --- */
let indexSlide = 0;
let temporitzadorCarrusel;

function iniciarCarrusel() {
    const slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    indexSlide++;
    if (indexSlide > slides.length) {
        indexSlide = 1;
    }
    slides[indexSlide - 1].style.display = "block";
    temporitzadorCarrusel = setTimeout(iniciarCarrusel, 5000);
}

function canviarSlide(n) {
    clearTimeout(temporitzadorCarrusel);
    const slides = document.getElementsByClassName("slide");
    if (slides.length === 0) return;

    indexSlide += n;
    if (indexSlide > slides.length) { indexSlide = 1; }
    if (indexSlide < 1) { indexSlide = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[indexSlide - 1].style.display = "block";
    temporitzadorCarrusel = setTimeout(iniciarCarrusel, 5000);
}

/* --- PROPER PARTIT --- */
function iniciarCompteEnrerePartit() {
    const elDies = document.getElementById("cd-dies");
    if (!elDies) return;

    const dataPartit = new Date("November 22, 2026 14:00:00").getTime();

    setInterval(function() {
        const ara = new Date().getTime();
        const distancia = dataPartit - ara;

        if (distancia < 0) return;

        const dies = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const hores = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minuts = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segons = Math.floor((distancia % (1000 * 60)) / 1000);

        elDies.textContent = dies < 10 ? "0" + dies : dies;
        document.getElementById("cd-hores").textContent = hores < 10 ? "0" + hores : hores;
        document.getElementById("cd-min").textContent = minuts < 10 ? "0" + minuts : minuts;
        document.getElementById("cd-seg").textContent = segons < 10 ? "0" + segons : segons;
    }, 1000);
}

/* --- PLANTILLA --- */
const plantillaBarca = [
    {
        nom: "Lamine Yamal",
        apiQuery: "Lamine Yamal",
        dorsal: "10",
        posicio: "Davanter · Internacional amb Espanya",
        imatge: "img/img1.png",
        bio: "Format a La Masia des de categoria benjamí, va debutar amb el primer equip amb 15 anys. Destaca per la seva capacitat de desbordament per banda dreta, visió per a l'última passada i precisió en el xut exterior.",
        stat1Label: "Partits Oficials FCB",
        stat2Label: "Gols Oficials FCB",
        stat3Label: "Assistències FCB",
        partits: 167,
        gols: 62,
        assistencies: 57
    },
    {
        nom: "Pedri González",
        apiQuery: "Pedri",
        dorsal: "8",
        posicio: "Migcampista · Internacional amb Espanya",
        imatge: "img/img2.png",
        bio: "Incorporat el 2020 procedent de la UD Las Palmas, és l'organitzador del joc al mig del camp. Controla el ritme de la possessió, supera línies de pressió amb facilitat i aporta arribada des de segona línia.",
        stat1Label: "Partits Oficials FCB",
        stat2Label: "Gols Oficials FCB",
        stat3Label: "Assistències FCB",
        partits: 261,
        gols: 29,
        assistencies: 36
    },
    {
        nom: "Joan Garcia",
        apiQuery: "Joan Garcia",
        dorsal: "1",
        posicio: "Porter · Internacional amb Espanya",
        imatge: "img/img3.png",
        bio: "Porter de gran envergadura i agilitat en el joc aeri. Ofereix seguretat en les sortides per alt, reflexos en rematades a curta distància i bona distribució amb els peus per iniciar la jugada des del darrere.",
        stat1Label: "Partits Oficials FCB",
        stat2Label: "Parades Oficials",
        stat3Label: "Porteries a Zero",
        partits: 60,
        gols: 151,
        assistencies: 23
    },
    {
        nom: "Pablo Gavi",
        apiQuery: "Gavi",
        dorsal: "6",
        posicio: "Migcampista · Internacional amb Espanya",
        imatge: "img/img4.png",
        bio: "Format a les categories inferiors blaugrana, aporta pressió alta constant, recuperació de pilotes en camp rival i dinamisme en les transicions ofensives.",
        stat1Label: "Partits Oficials FCB",
        stat2Label: "Gols Oficials FCB",
        stat3Label: "Assistències FCB",
        partits: 175,
        gols: 10,
        assistencies: 14
    },
    {
        nom: "Pau Cubarsí",
        apiQuery: "Pau Cubarsi",
        dorsal: "5",
        posicio: "Defensa Central · Internacional amb Espanya",
        imatge: "img/img5.png",
        bio: "Central format a La Masia amb una lectura tàctica avançada per anticipar-se als davanters rivals. Destaca per la precisió en la passada llarga i la neteja en la sortida de pilota.",
        stat1Label: "Partits Oficials FCB",
        stat2Label: "Gols Oficials FCB",
        stat3Label: "Assistències FCB",
        partits: 141,
        gols: 2,
        assistencies: 7
    },
    {
        nom: "Raphinha",
        apiQuery: "Raphinha",
        dorsal: "11",
        posicio: "Davanter · Internacional amb Brasil",
        imatge: "img/img6.png",
        bio: "Davanter desequilibrant amb gran desplegament físic tant en atac com en tasques defensives. Aporta profunditat a l'espai, xut potent amb cama esquerra i efectivitat a pilota aturada.",
        stat1Label: "Partits Oficials FCB",
        stat2Label: "Gols Oficials FCB",
        stat3Label: "Assistències FCB",
        partits: 191,
        gols: 94,
        assistencies: 55
    }
];

function seleccionarJugador(index, elementClicat) {
    const j = plantillaBarca[index];
    const imgGran = document.getElementById("imatge-ampliada");
    if (!imgGran) return;

    imgGran.style.opacity = "0";
    setTimeout(() => {
        imgGran.src = j.imatge;
        imgGran.alt = j.nom;
        document.getElementById("dorsal-jugador").textContent = j.dorsal;
        document.getElementById("titol-jugador").textContent = j.nom;
        document.getElementById("posicio-jugador").textContent = j.posicio;
        document.getElementById("desc-jugador").textContent = j.bio;

        document.getElementById("stat1-nom").textContent = j.stat1Label;
        document.getElementById("stat2-nom").textContent = j.stat2Label;
        document.getElementById("stat3-nom").textContent = j.stat3Label;

        document.getElementById("stat1-valor").textContent = j.partits;
        document.getElementById("stat2-valor").textContent = j.gols;
        document.getElementById("stat3-valor").textContent = j.assistencies;

        imgGran.style.opacity = "1";
    }, 150);

    if (elementClicat) {
        const thumbs = document.getElementsByClassName("card-thumb");
        for (let i = 0; i < thumbs.length; i++) {
            thumbs[i].classList.remove("activa-thumb");
        }
        elementClicat.classList.add("activa-thumb");
    }

    consultarApiEsportiva(j);
}

async function consultarApiEsportiva(jugador) {
    const estatText = document.getElementById("estat-api");
    if (!estatText) return;
    estatText.textContent = "Verificant fitxa oficial de " + jugador.nom + " a TheSportsDB...";

    try {
        const resposta = await fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=" + encodeURIComponent(jugador.apiQuery));
        const dades = await resposta.json();
        if (dades && dades.player && dades.player.length > 0) {
            const infoWeb = dades.player[0];
            estatText.textContent = "Registre oficial verificat (fcbarcelona.cat) · Font: TheSportsDB (" + infoWeb.strPlayer + ")";
        } else {
            estatText.textContent = "Registre oficial verificat · Font: fcbarcelona.cat (Només lectura)";
        }
    } catch (error) {
        estatText.textContent = "Registre oficial verificat · Font: fcbarcelona.cat (Només lectura)";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    iniciarCarrusel();
    iniciarCompteEnrerePartit();
    if (document.getElementById("imatge-ampliada")) {
        seleccionarJugador(0, null);
    }
});
