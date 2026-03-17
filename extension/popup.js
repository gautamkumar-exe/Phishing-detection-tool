document.addEventListener("DOMContentLoaded", function () {

    console.log("popup loaded");

    const button = document.getElementById("check");

    button.addEventListener("click", async function () {

        console.log("button clicked");

        let statusText = document.getElementById("statusText");
        let statusBox = document.getElementById("statusBox");

        statusText.innerText = "Scanning target...";
        statusBox.className = "status checking";

        try {
            let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            let url = tabs[0].url;

            console.log("URL:", url);

            let res = await fetch("https://phishxx.onrender.com/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url: url })
            });

            let data = await res.json();
            console.log("API Response:", data);

            if (data.is_https === 0) {
                statusText.innerText = "⚠️ NOT SECURE (HTTP)";
                statusBox.className = "status warning";
            }
            else if (data.prediction === 1) {
                statusText.innerText = "🚨 PHISHING DETECTED";
                statusBox.className = "status phishing";
            }
            else {
                statusText.innerText = "✅ SAFE WEBSITE";
                statusBox.className = "status safe";
            }

        } catch (error) {
            console.error("Error:", error);
            statusText.innerText = "❌ CONNECTION ERROR";
            statusBox.className = "status phishing";
        }

    });

});
