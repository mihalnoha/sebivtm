const shareData = {
    title: 'Memoriál ŠebiVTM',
    text: 'Ahoj, mrkni na stránky cyklistického memoriálu ŠebiVTM! Najdeš tam trasu, místo srazu i odpočet do startu. Tak mrkev v zimě! 🚴',
    url: 'https://mihalnoha.github.io/sebivtm/index.html'
};

async function shareWebsite() {
    // 1. Pro mobilní zařízení se zapnutou podporou Web Share API
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            return;
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error('Chyba při sdílení:', err);
            } else {
                return; // Uživatel sdílení stornoval
            }
        }
    }

    // 2. Záložní řešení pro PC (zkopírování + zobrazení popupu)
    try {
        await navigator.clipboard.writeText(shareData.url);
        showSharePopup(true); // Otevře popup s informací o zkopírování
    } catch (err) {
        console.error('Nepodařilo se zkopírovat odkaz:', err);
        showSharePopup(false); // Otevře popup bez hlášky o zkopírování
    }
}

function showSharePopup(isCopied) {
    // Pokud popup ještě neexistuje, vytvoříme ho dynamicky v DOMu
    let popup = document.getElementById('sharePopup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'sharePopup';
        popup.className = 'share-overlay';
        document.body.appendChild(popup);
    }

    const encodedUrl = encodeURIComponent(shareData.url);
    const encodedText = encodeURIComponent(shareData.text);

    popup.innerHTML = `
        <div class="share-modal">
            <h3>📢 Pošli odkaz kamarádům</h3>
            ${isCopied ? '<p class="share-success-msg">✅ Odkaz byl zkopírován do schránky!</p>' : ''}
            <p class="share-info-text">Můžeš ho rovnou poslat přes oblíbené aplikace:</p>
            
            <div class="share-buttons-grid">
                <a href="https://whatsapp.com{encodedText}%20${encodedUrl}" target="_blank" class="share-btn wa">💬 WhatsApp</a>
                <a href="https://facebook.com{encodedUrl}" target="_blank" class="share-btn fb">📘 Facebook</a>
                <a href="fb-messenger://share/?link=${encodedUrl}" target="_blank" class="share-btn msg">⚡ Messenger</a>
                <a href="mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodedText}%20${encodedUrl}" class="share-btn mail">✉️ E-mail</a>
            </div>
            
            <button class="share-close-btn" onclick="closeSharePopup()">Zavřít</button>
        </div>
    `;
    
    popup.style.display = 'flex';
}

function closeSharePopup() {
    const popup = document.getElementById('sharePopup');
    if (popup) popup.style.display = 'none';
}
