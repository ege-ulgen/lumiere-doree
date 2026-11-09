(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var entete = document.querySelector(".entete");

  function majEntete() {
    if (entete) {
      entete.classList.toggle("est-defilee", window.scrollY > 40);
    }
  }

  window.addEventListener("scroll", majEntete, { passive: true });
  majEntete();

  var liensMenu = document.querySelectorAll('.navigation__lien[href^="#"]');
  var sections = [];

  liensMenu.forEach(function (lien) {
    var section = document.querySelector(lien.getAttribute("href"));
    if (section) {
      sections.push({ lien: lien, section: section });
    }
  });

  if (sections.length && "IntersectionObserver" in window) {
    var observateurMenu = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          sections.forEach(function (item) {
            if (item.section === entree.target) {
              item.lien.setAttribute("aria-current", "true");
            } else {
              item.lien.removeAttribute("aria-current");
            }
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (item) {
      observateurMenu.observe(item.section);
    });
  }

  var blocs = document.querySelectorAll(".apparition");

  if ("IntersectionObserver" in window) {
    var observateurBlocs = new IntersectionObserver(function (entrees, observateur) {
      entrees.forEach(function (entree) {
        if (entree.isIntersecting) {
          entree.target.classList.add("est-visible");
          observateur.unobserve(entree.target);
        }
      });
    }, { threshold: 0.12 });

    blocs.forEach(function (bloc) {
      observateurBlocs.observe(bloc);
    });
  } else {
    blocs.forEach(function (bloc) {
      bloc.classList.add("est-visible");
    });
  }

  document.querySelectorAll("[data-interet]").forEach(function (lien) {
    lien.addEventListener("click", function () {
      var choix = document.querySelector('input[name="interet"][value="' + lien.dataset.interet + '"]');
      if (choix) {
        choix.checked = true;
      }
    });
  });

  var formulaire = document.getElementById("formulaire-inscription");

  if (formulaire) {
    var alerte = document.getElementById("alerte-formulaire");
    var champs = formulaire.querySelectorAll(".champ input");
    var consentement = formulaire.querySelector('input[name="consentement"]');
    var modeleEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    formulaire.noValidate = true;

    function estValide(champ) {
      var valeur = champ.value.trim();
      if (champ.type === "email") {
        return modeleEmail.test(valeur);
      }
      return valeur.length > 0;
    }

    function verifierChamp(champ) {
      var bloc = champ.closest(".champ");
      var ok = estValide(champ);
      bloc.classList.toggle("est-en-erreur", !ok);
      champ.setAttribute("aria-invalid", ok ? "false" : "true");
      return ok;
    }

    function verifierConsentement() {
      var ok = consentement.checked;
      consentement.closest(".case").classList.toggle("est-en-erreur", !ok);
      return ok;
    }

    champs.forEach(function (champ) {
      champ.addEventListener("blur", function () {
        if (champ.value.trim() !== "") {
          verifierChamp(champ);
        }
      });
      champ.addEventListener("input", function () {
        if (champ.closest(".champ").classList.contains("est-en-erreur")) {
          verifierChamp(champ);
        }
      });
    });

    consentement.addEventListener("change", verifierConsentement);

    formulaire.addEventListener("submit", function (evenement) {
      var toutEstBon = true;

      champs.forEach(function (champ) {
        if (!verifierChamp(champ)) {
          toutEstBon = false;
        }
      });

      if (!verifierConsentement()) {
        toutEstBon = false;
      }

      if (!toutEstBon) {
        evenement.preventDefault();
        alerte.classList.add("est-visible");
        var premiereErreur = formulaire.querySelector('[aria-invalid="true"]');
        if (premiereErreur) {
          premiereErreur.focus();
        }
      } else {
        alerte.classList.remove("est-visible");
      }
    });
  }

  var zonePrenom = document.getElementById("merci-prenom");

  if (zonePrenom && "URLSearchParams" in window) {
    var prenom = new URLSearchParams(window.location.search).get("prenom");
    if (prenom && prenom.trim() !== "") {
      zonePrenom.textContent = ", " + prenom.trim().slice(0, 40);
    }
  }

  if (document.body.classList.contains("page-fiche")) {
    document.addEventListener("keydown", function (evenement) {
      if (evenement.key === "Escape") {
        window.location.href = "index.html#oeuvres";
        return;
      }
      var lien = document.querySelector('[data-touche="' + evenement.key + '"]');
      if (lien) {
        window.location.href = lien.getAttribute("href");
      }
    });
  }
})();
