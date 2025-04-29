document.getElementById("urlForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const urlInput = document.getElementById("urlInput").value;
    const formData = new FormData();
    formData.append("originalUrl", urlInput);

    try {
        const response = await fetch("index.php", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.shortUrl) {
            document.getElementById("shortenedUrl").textContent = `Shortened URL: ${data.shortUrl}`;
        } else {
            document.getElementById("shortenedUrl").textContent = "Error: Unable to shorten the URL.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("shortenedUrl").textContent = "Error: Unable to connect to the server.";
    }
});
