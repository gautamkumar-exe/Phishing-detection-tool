document.getElementById("check").addEventListener("click", async () => {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let url = tab.url;

    let statusText = document.getElementById("statusText");
    let statusBox = document.getElementById("statusBox");

    // Loading state
    statusText.innerText = "Scanning target...";
    statusBox.className = "status checking";

    try {
        let res = await fetch("https://phishxx.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        });

        let data = await res.json();

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
        console.error(error);
        statusText.innerText = "❌ CONNECTION ERROR";
        statusBox.className = "status phishing";
    }

});
