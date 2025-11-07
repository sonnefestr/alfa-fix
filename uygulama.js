const m3uLink = "https://raw.githubusercontent.com/sonnefestr/Alfadz/refs/heads/main/Alfady.txt";
const container = document.getElementById("content");

async function loadChannels() {
  try {
    const res = await fetch(m3uLink);
    const data = await res.text();
    const lines = data.split("#EXTINF:-1");

    container.innerHTML = "";

    lines.forEach((line) => {
      const nameMatch = line.match(/tvg-name="([^"]+)"/);
      const logoMatch = line.match(/tvg-logo="([^"]+)"/);
      const urlMatch = line.match(/(https?:\/\/[^\s]+)/);

      if (nameMatch && urlMatch) {
        const name = nameMatch[1];
        const logo = logoMatch ? logoMatch[1] : "https://i.imgur.com/VfK3N7R.png";
        const url = urlMatch[1];

        const card = document.createElement("div");
        card.className = "movie";
        card.innerHTML = `
          <img src="${logo}" alt="${name}">
          <h4>${name}</h4>
        `;
        card.onclick = () => {
          window.location.href = `oyuncu.html?url=${encodeURIComponent(url)}`;
        };
        container.appendChild(card);
      }
    });
  } catch (err) {
    container.innerHTML = "<p style='color:white'>Yayın listesi yüklenemedi ⚠️</p>";
  }
}

loadChannels();
