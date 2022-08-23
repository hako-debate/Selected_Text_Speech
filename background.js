var synth = window.speechSynthesis;
const utter = new SpeechSynthesisUtterance("");
utter.voice = synth.getVoices()[0];
synth.speak(utter);

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "speech",
        title: "読み上げ",
        contexts: ["all"],
    });
});


chrome.contextMenus.onClicked.addListener((info, tab) => {
    var synth = window.speechSynthesis;
    let text = info.selectionText;

    var tmp = 0;
    let name = "";
    for (var i = 0; i < text.length; i++) {
        tmp += text.charCodeAt(i);
    }
    var mean = tmp / text.length;
    if (mean < 256) {
        name = "Google UK English Female";
    } else {
        name = "Google 日本語";
    }

    const utter = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    for (let i in voices) {
        if (voices[i].name == name) {
            utter.voice = voices[i];
        }
    }
    synth.speak(utter);
})
