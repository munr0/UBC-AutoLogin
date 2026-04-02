(async () =>
{
    const data = await chrome.storage.local.get(["u", "p"])
    let username = decode(data.u)
    let password = decode(data.p)

    let button
    if (window.location.href.includes("authentication")) {
        button = document.querySelector("button")
    }
    else if (window.location.href.includes("payforprint")) {
        username = username + ".stu"
        button = document.querySelector("input[name='$Submit$0']")
    }
    else if (window.location.href.includes("ipeer")) {
        button = document.querySelector("a[href*='saml/auth.php']")
    }

    if (button && username && password) {
        console.log("Filling...")
        Ufield = document.getElementById("username") || document.querySelector("input[name='inputUsername']")
        Pfield = document.getElementById("password") || document.querySelector("input[name='inputPassword']")

        Ufield && (Ufield.value = username)
        Pfield && (Pfield.value = password)
        button?.click()
    }
    else {
        console.info("Please click 🧩 > 'UBC AutoLogin' and configure your CWL to use this utility.")
    }
})()

function decode(data)
{
    if (data) {
        for (let i = 0; i < 8; i++) {
            data = atob(data)
        }
    }
    return data
}
