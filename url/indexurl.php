<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST["originalUrl"])) {
    $originalUrl = $_POST["originalUrl"];
    $apiUrl = "https://api.tinyurl.com/create";
    $apiToken = "f1F78YEW9M1rv95hm5jWU7VV0DVq1lahyhjO90n2seXrG0vFH0AJrZVp0IEB";

    $postData = json_encode([
        "url" => $originalUrl,
        "domain" => "tiny.one"
    ]);

    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json",
        "Authorization: Bearer " . $apiToken
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

    $response = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($response, true);

    header("Content-Type: application/json");
    if (isset($data['data']['tiny_url'])) {
        echo json_encode(["shortUrl" => $data['data']['tiny_url']]);
    } else {
        echo json_encode(["error" => "Unable to shorten the URL."]);
    }
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL Shortener</title>
    <link rel="stylesheet" href="stylesheet.css">
</head>
<body>
    <div class="outer-container">
        <div class="container">
        <h1>URL Shortener</h1>
        <form id="urlForm">
            <input type="url" id="urlInput" placeholder="Enter a URL" required>
            <button type="submit">Shorten URL</button>
        </form>
        <div id="result">
            <p id="shortenedUrl"></p>
        </div>
    </div>
    </div>
    <script src="script.js"></script>
</body>
</html>