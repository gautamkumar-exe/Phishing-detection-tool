document.getElementById("check").addEventListener("click", async () => {

    // Get current tab URL
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let url = tab.url;

    let statusBox = document.getElementById("statusBox");

    // Loading state
    statusBox.innerText = "🔄 Checking...";
    statusBox.className = "status";

    try {
        // 🔥 LIVE API (Render)
        let res = await fetch("https://phishxx.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        });

        let data = await res.json();

        // 🔥 FINAL LOGIC
        if (data.is_https === 0) {
            statusBox.innerText = "⚠️ Not Secure (HTTP)";
            statusBox.className = "status warning";
        }
        else if (data.prediction === 1) {
            statusBox.innerText = "🚨 Phishing Website";
            statusBox.className = "status phishing";
        }
        else {
            statusBox.innerText = "✅ Safe Website";
            statusBox.className = "status safe";
        }

    } catch (error) {
        console.error("API Error:", error);
        statusBox.innerText = "❌ Error connecting to API";
        statusBox.className = "status phishing";
    }

});
