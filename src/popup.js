document.addEventListener("DOMContentLoaded", () =>
{
    document.getElementById("save").addEventListener("click", () =>
    {
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        if (username && password) {
            chrome.storage.local.set({ u: encode(username) })
            chrome.storage.local.set({ p: encode(password) })
            window.close()
        }
        else {
            alert("Please complete fields before saving.")
        }
    });

    (async () =>
    {
        const data = await chrome.storage.local.get(["u", "p"])
        const olduser = decode(data.u)
        const oldpass = decode(data.p)

        if (olduser)
            document.getElementById("username").value = olduser
        if (oldpass)
            document.getElementById("password").placeholder = '*'.repeat(oldpass.length)
    })()
})

function encode(data)
{
    if (data) {
        for (let i = 0; i < 8; i++) {
            data = btoa(data)
        }
    }
    return data
}

function decode(data)
{
    if (data) {
        for (let i = 0; i < 8; i++) {
            data = atob(data)
        }
    }
    return data
}
