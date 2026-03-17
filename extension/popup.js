document.getElementById("check").addEventListener("click", async () => {

    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let url = tab.url;

    let statusBox = document.getElementById("statusBox");

    statusBox.innerHTML = '<span class="prompt">$</span> <span class="status-text glow">Analyzing packets...</span>';
    statusBox.className = "status checking";

    try {
        let res = await fetch("https://phishing-detection-tool-728u.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        });

        let data = await res.json();

        if(data.is_https === 0){
            statusBox.innerHTML = '<span class="prompt">!</span> <span class="status-text glow">WARNING_INSECURE_HTTP</span>';
            statusBox.className = "status warning";
        }
        else if(data.prediction === 1){
            statusBox.innerHTML = '<span class="prompt">[!]</span> <span class="status-text glow">THREAT_DETECTED: PHISHING</span>';
            statusBox.className = "status phishing";
        }
        else {
            statusBox.innerHTML = '<span class="prompt">&gt;</span> <span class="status-text glow">STATUS_SECURE: SAFE</span>';
            statusBox.className = "status safe";
        }

    } catch (error) {
        statusBox.innerHTML = '<span class="prompt">ERR</span> <span class="status-text glow">CONNECTION_FAILED</span>';
        statusBox.className = "status phishing";
    }

});