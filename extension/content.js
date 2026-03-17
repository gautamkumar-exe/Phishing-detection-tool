console.log("Content script loaded");

window.addEventListener("load", () => {

    setTimeout(async () => {

        let url = window.location.href;

        if (!url.startsWith("http")) return;

        try {
            let res = await fetch("https://phishing-detection-tool-728u.onrender.com/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url: url })
            });

            let data = await res.json();

            console.log("API response:", data);

            if (document.getElementById("phishing-warning")) return;

            if (data.is_https === 0) {
                showWarning("⚠️ Not Secure (HTTP)", "orange");
            }
            else if (data.prediction === 1) {
                showWarning("🚨 Phishing Website", "red");
            }

        } catch (error) {
            console.log("API error:", error);
        }

    }, 2000);

});

function showWarning(message, color){

    let warning = document.createElement("div");
    warning.id = "phishing-warning";

    warning.innerHTML = `
        <div style="
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:${color};
            color:white;
            z-index:999999;
            display:flex;
            justify-content:center;
            align-items:center;
            font-size:30px;
        ">
            ${message}
        </div>
    `;

    document.body.appendChild(warning);
}