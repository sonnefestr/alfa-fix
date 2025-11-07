const movieGrid = document.getElementById("movie-grid");

async function loadMovies() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/sonnefestr/Alfadz/refs/heads/main/Alfady.txt");
    const text = await response.text();

    const lines = text.split("\n").filter(l => l.trim() && !l.startsWith("#EXTM3U"));
    const movies = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("#EXTINF")) {
        const name = lines[i].split(",")[1]?.trim() || "Film/Dizi";
        const url = lines[i + 1]?.trim();
        movies.push({ name, url });
      }
    }

    movieGrid.innerHTML = "";

    movies.forEach(movie => {
      const div = document.createElement("div");
      div.className = "movie";
      div.innerHTML = `
        <img src="https://picsum.photos/200/300?random=${Math.floor(Math.random()*1000)}" alt="${movie.name}">
        <div class="movie-title">${movie.name}</div>
      `;
      div.onclick = () => {
        window.location.href = `player.html?src=${encodeURIComponent(movie.url)}&title=${encodeURIComponent(movie.name)}`;
      };
      movieGrid.appendChild(div);
    });
  } catch (e) {
    movieGrid.innerHTML = "<p style='text-align:center;color:red;'>Liste yüklenemedi ❌</p>";
    console.error(e);
  }
}

loadMovies();