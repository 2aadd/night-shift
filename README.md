# Night Shift

Night Shift is a first-person horror game set in a roadside kiosk. Serve orders by hand, question customers, and compare what they tell you with the receipts and security camera. Your choices across three nights can lead to seven endings.

[Play Night Shift](https://gece-vardiyasi-07.aptcreek18.chatgpt.site/)

## Run locally

Serve the `dist` directory over HTTP. For example, run this from the repository root with Python 3 installed.

```sh
python -m http.server 8080 --directory dist
```

Open [localhost:8080](http://localhost:8080) and select **Start shift**. The game starts in English. Select **Türkçe** in the language menu to switch to Turkish.

## Controls

| Input | Action |
| --- | --- |
| W, A, S, D | Move |
| Mouse | Look around |
| E | Interact |
| Left click | Fire while holding the shotgun |
| Esc | Release the cursor |

## Technology

The game runs in the browser with a custom JavaScript and WebGL renderer. Web Audio handles the soundtrack and sound effects. The `dist` directory contains the playable build and its assets.

## Audio credits

- **Unnatural Situation** by Kevin MacLeod. The game adjusts the level and frequency balance. [Track](https://www.incompetech.com/music/royalty-free/index.html?isrc=USUAN1100464) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Gunshot Sounds** by Vincent Sevedge. The game adjusts the recording level. [Recording](https://opengameart.org/content/gunshot-sounds) · [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)
