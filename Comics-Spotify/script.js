let currentPage = 0;
let totalPages = 0;
let comicName = "comic1";
let language = "es";
let manifest = null;
let currentTrackId = null;

document.getElementById("language").addEventListener("change", function () {
  language = this.value;
  loadText();
  updateMoreComicsText();
});

function loadManifest(callback) {
  fetch(`comics/${comicName}/manifest.json`)
    .then(res => res.json())
    .then(data => {
      manifest = data;
      totalPages = data.pages;
      callback();
    });
}

function loadComic() {
  document.getElementById("comic-img").src = `comics/${comicName}/${currentPage}.jpg`;
  loadText();
}

function loadText() {
  document.querySelectorAll('.text-overlay').forEach(e => e.remove());
  let trackSet = false;

  manifest.dialogs.forEach(d => {
    if (d.page === currentPage && d.lang === language) {
      const span = document.createElement("span");
      span.className = "text-overlay";
      span.innerText = d.text;
      span.dataset.x = d.x;
      span.dataset.y = d.y;
      document.getElementById("comic-container").appendChild(span);

      if ((d.track || d.soundcloud) && !trackSet) {
        if (d.track && d.track !== currentTrackId) {
          loadSpotify(d.track);
          currentTrackId = d.track;
        } else if (d.soundcloud && d.soundcloud !== currentTrackId) {
          loadSoundCloud(d.soundcloud);
          currentTrackId = d.soundcloud;
        }
        trackSet = true;
      }
    }
  });

  if (trackSet) {
    showMusicText(true);
  } else {
    showMusicText(false);
  }

  adjustTextPositions();
}

function adjustTextPositions() {
  const img = document.getElementById("comic-img");
  const width = img.clientWidth;
  const height = img.clientHeight;

  document.querySelectorAll(".text-overlay").forEach(span => {
    const x = parseFloat(span.dataset.x);
    const y = parseFloat(span.dataset.y);
    span.style.left = `${(x / 100) * width}px`;
    span.style.top = `${(y / 100) * height}px`;
  });
}

function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    loadComic();
  }
}

function nextPage() {
  if (currentPage < totalPages - 1) {
    currentPage++;
    loadComic();
  } else {
    alert("¡Fin del cómic!");
  }
}

function goHome() {
  currentPage = 0;
  loadComic();
}

function changeComic(name) {
  comicName = name;
  currentPage = 0;
  const select = document.getElementById("comic-selector");
  select.value = comicName;
  loadManifest(loadComic);
}

function loadComicList() {
  fetch("comics/index.json")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("comic-selector");
      data.comics.forEach(comic => {
        const option = document.createElement("option");
        option.value = comic.id;
        option.textContent = comic.title;
        select.appendChild(option);
      });

      select.value = comicName;

      select.addEventListener("change", () => {
        comicName = select.value;
        currentPage = 0;
        loadManifest(loadComic);
      });
    });
}

function loadRecentComics() {
  const comics = ["comic1", "comic2", "comic3", "comic4", "comic5"];
  const container = document.getElementById("recent-comics");
  container.innerHTML = "";

  comics.forEach(name => {
    const img = document.createElement("img");
    img.src = `comics/${name}/0.jpg`;
    img.className = "recent-comic";
    img.onclick = () => {
      changeComic(name);
    };
    container.appendChild(img);
  });
}

function loadSoundCloud(url) {
  const container = document.getElementById("music-container");
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`;
  container.innerHTML = `<iframe width="100%" height="80" scrolling="no" frameborder="no" allow="autoplay" src="${embedUrl}"></iframe>`;
  showMusicText(true);
}

function loadSpotify(trackId) {
  const container = document.getElementById("music-container");
  container.innerHTML = `<iframe src="https://open.spotify.com/embed/track/${trackId}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  showMusicText(true);
}

function showMusicText(show) {
  const text = document.getElementById("music-text");
  if (!show) {
    text.textContent = "";
    return;
  }

  const messages = {
    es: "Acompaña este cómic con esta canción:",
    en: "Enjoy this comic with this song:",
    fr: "Accompagne ce comic avec cette chanson :"
  };

  text.textContent = messages[language] || messages["en"];
}

function updateMoreComicsText() {
  const label = {
    es: "Disfruta más cómics aquí:",
    en: "Enjoy more comics here:",
    fr: "Découvre plus de BD ici :"
  };
  document.getElementById("more-comics-text").textContent = label[language] || label["en"];
}

document.getElementById("comic-img").addEventListener("load", adjustTextPositions);
window.addEventListener("resize", adjustTextPositions);

loadComicList();
loadRecentComics();
loadManifest(loadComic);
updateMoreComicsText();
