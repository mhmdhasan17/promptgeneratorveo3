document.addEventListener('DOMContentLoaded', () => {
    const cameraMotions = {
        // Common movements
        "Static Shot": "Bidikan Statis",
        "Tracking Shot": "Bidikan Mengikuti",
        "Pan Left": "Geser Kiri",
        "Pan Right": "Geser Kanan",
        // Higgsfield.ai motions
        "360 Orbit": "Orbit 360 Derajat",
        "3D Rotation": "Rotasi 3D",
        "Action Run": "Lari Aksi",
        "Agent Reveal": "Kemunculan Agen",
        "Angel Wings": "Sayap Malaikat",
        "Arc Left": "Busur Kiri",
        "Arc Right": "Busur Kanan",
        "Bloom Mouth": "Mulut Mekar",
        "Buckle Up": "Kencangkan Sabuk",
        "Building Explosion": "Ledakan Gedung",
        "Bullet Time": "Waktu Peluru",
        "Car Chasing": "Pengejaran Mobil",
        "Car Explosion": "Ledakan Mobil",
        "Car Grip": "Cengkeraman Mobil",
        "Catch the pulse": "Tangkap Denyutnya",
        "Crane Down": "Derek Turun",
        "Crane Over The Head": "Derek di Atas Kepala",
        "Crane Up": "Derek Naik",
        "Crash Zoom In": "Zoom Cepat Masuk",
        "Crash Zoom Out": "Zoom Cepat Keluar",
        "Datamosh": "Datamosh",
        "Dirty Lens": "Lensa Kotor",
        "Disintegration": "Disintegrasi",
        "Dolly In": "Dolly Masuk",
        "Dolly Left": "Dolly Kiri",
        "Dolly Out": "Dolly Keluar",
        "Dolly Right": "Dolly Kanan",
        "Dolly Zoom In": "Dolly Zoom Masuk",
        "Dolly Zoom Out": "Dolly Zoom Keluar",
        "Double Dolly": "Dolly Ganda",
        "Dutch Angle": "Sudut Belanda",
        "Eyes In": "Fokus ke Mata",
        "Face Punch": "Pukulan Wajah",
        "Fisheye": "Mata Ikan",
        "Floating Fish": "Ikan Mengambang",
        "Flood": "Banjir",
        "Floral Eyes": "Mata Bunga",
        "Flying": "Terbang",
        "Focus Change": "Perubahan Fokus",
        "FPV Drone": "Drone FPV",
        "Garden Bloom": "Taman Mekar",
        "General": "Umum",
        "Glam": "Glamor",
        "Glowshift": "Pergeseran Cahaya",
        "Handheld": "Genggam",
        "Head Explosion": "Ledakan Kepala",
        "Head Tracking": "Pelacakan Kepala",
        "Hyperlapse": "Hyperlapse",
        "Incline": "Miring",
        "Invisible": "Tak Terlihat",
        "Jelly Drift": "Drift Kenyal",
        "Jib Down": "Jib Turun",
        "Jib Up": "Jib Naik",
        "Kiss": "Ciuman",
        "Lazy Susan": "Lazy Susan (Putar Lambat)",
        "Lens Crack": "Lensa Retak",
        "Lens Flare": "Suar Lensa",
        "Levitation": "Levitasi",
        "Low Shutter": "Rana Lambat",
        "Medusa Gorgona": "Medusa Gorgona",
        "Melting": "Meleleh",
        "Morphskin": "Perubahan Kulit",
        "Mouth In": "Fokus ke Mulut",
        "Push To Glass": "Dorong ke Kaca",
        "Rap Flex": "Gaya Rap",
        "Robo Arm": "Lengan Robot",
        "Set on Fire": "Terbakar",
        "Skin Surge": "Gelombang Kulit",
        "Snorricam": "Snorricam",
        "Soul Jump": "Lompatan Jiwa",
        "Static": "Statis",
        "Super Dolly In": "Super Dolly Masuk",
        "Super Dolly Out": "Super Dolly Keluar",
        "Symbiote": "Simbiosis",
        "Tentacles": "Tentakel",
        "Thunder God": "Dewa Petir",
        "Tilt Down": "Miring ke Bawah",
        "Tilt up": "Miring ke Atas",
        "Timelapse Human": "Timelapse Manusia",
        "Timelapse Landscape": "Timelapse Pemandangan",
        "Turning Metal": "Logam Berputar",
        "Whip Pan": "Pan Gesit",
        "Wiggle": "Goyangan",
        "Wind to Face": "Angin ke Wajah",
        "YoYo Zoom": "Zoom YoYo",
        "Zoom In": "Perbesar",
        "Zoom Out": "Perkecil"
    };

    // New Dropdown Options
    const videoStyles = {
        '': 'Pilih salah satu...',
        'cinematic realistis': 'Sinematik Realistis',
        'lucu': 'Lucu / Komedi',
        'serius': 'Serius / Drama',
        'storytelling': 'Storytelling / Naratif',
        'promosi': 'Promosi / Iklan',
        'sindiran': 'Sindiran / Satir',
        'motivasi': 'Motivasi / Inspiratif',
        'dokumenter': 'Dokumenter'
    };

    const locations = {
        '': 'Pilih salah satu...',
        'dapur ndeso': 'Dapur Ndeso (Pedesaan)',
        'puncak bukit': 'Puncak Bukit (Pemandangan Alam)',
        'pusat kota malam hari': 'Pusat Kota Malam Hari (Ramai)',
        'kafe santai sore hari': 'Kafe Santai Sore Hari',
        'terminal bus malam hujan': 'Terminal Bus Malam Hujan',
        'perpustakaan tua': 'Perpustakaan Tua (Tenang & Klasik)',
        'pasar tradisional pagi hari': 'Pasar Tradisional Pagi Hari (Sibuk)'
    };
    
    // Populate new dropdowns
    populateSelect('gaya-video', videoStyles);
    populateSelect('lokasi-suasana', locations);

    // Populate camera dropdown
    const cameraSelect = document.getElementById('kamera');
    for (const [en, id] of Object.entries(cameraMotions)) {
        const option = document.createElement('option');
        option.value = `${en} (${id})`;
        option.textContent = `${en} (${id})`;
        cameraSelect.appendChild(option);
    }
    cameraSelect.value = "Tracking Shot (Bidikan Mengikuti)";

    // Event Listeners for new dropdowns
    document.getElementById('lokasi-suasana').addEventListener('change', (e) => {
        const value = e.target.value;
        const latar = document.getElementById('latar');
        const suasana = document.getElementById('suasana');
        switch(value) {
            case 'dapur ndeso':
                latar.value = "Latar tempat: di sebuah dapur rumah pedesaan (ndeso) dengan dinding kayu, tungku tradisional, dan peralatan masak sederhana.\nWaktu: pagi hari, cahaya matahari masuk dari jendela.";
                suasana.value = "Suasana hangat, tenang, dan otentik dengan nuansa kehidupan pedesaan yang damai.";
                break;
            case 'puncak bukit':
                latar.value = "Latar tempat: di puncak bukit saat matahari terbenam, dengan pemandangan lembah dan pegunungan di kejauhan.\nWaktu: sore menjelang malam (golden hour).";
                suasana.value = "Suasana syahdu, megah, dan kontemplatif. Angin sepoi-sepoi dan keindahan alam yang menenangkan.";
                break;
            case 'pusat kota malam hari':
                 latar.value = "Latar tempat: di persimpangan jalan pusat kota yang ramai di malam hari, dengan lampu neon, gedung pencakar langit, dan lalu lintas padat.\nWaktu: malam hari.";
                 suasana.value = "Suasana dinamis, energik, dan modern. Kesan metropolitan yang tidak pernah tidur.";
                 break;
            case 'kafe santai sore hari':
                latar.value = "Latar tempat: di sebuah kafe dengan interior modern minimalis, jendela besar yang menghadap ke jalanan, beberapa pengunjung lain sedang mengobrol atau bekerja dengan laptop.\nWaktu: sore hari.";
                suasana.value = "Suasana santai, nyaman, dan trendi. Diiringi musik lo-fi pelan.";
                break;
            case 'terminal bus malam hujan':
                 latar.value = "Latar tempat: di terminal bus antar kota malam hari, terdapat pedagang kaki lima di pinggir jalur keberangkatan, beberapa bus berjajar dengan lampu menyala. Aspal basah karena hujan rintik-rintik.";
                 suasana.value = "Suasana sibuk, ramai, dengan kesan perjalanan malam yang hidup dan dinamis meskipun hujan.";
                 break;
            // Add more cases as needed
            default:
                latar.value = '';
                suasana.value = '';
        }
    });

    document.getElementById('generate-btn').addEventListener('click', generatePrompt);
    document.getElementById('change-title-btn').addEventListener('click', changeTitle);
    document.getElementById('change-style-btn').addEventListener('click', changeStyle);
    document.getElementById('reset-btn').addEventListener('click', resetForm);
    document.getElementById('copy-btn').addEventListener('click', copyFinalPrompt);
    document.getElementById('add-char-btn').addEventListener('click', () => addCharacter());

    // Event delegation for remove buttons
    const charactersContainer = document.getElementById('characters-container');

    charactersContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('remove-char-btn')) {
            const blockToRemove = e.target.closest('.character-block');
            const wasChecked = blockToRemove.querySelector('.core-char-radio').checked;

            if (document.querySelectorAll('.character-block').length > 1) {
                blockToRemove.remove();
                updateCharacterNumbers();
                // If the removed character was the core one, make the first one core
                if (wasChecked) {
                    const firstRadio = document.querySelector('.core-char-radio');
                    if(firstRadio) firstRadio.checked = true;
                }
            } else {
                alert('Tidak bisa menghapus karakter terakhir.');
            }
        }
    });

    charactersContainer.addEventListener('change', (e) => {
        // ... existing code ...
    });

    // Add the initial character on load
    addCharacter({
        desc: `Seorang vlogger wanita muda asal Minang berusia 27 tahun.
Perawakan/Bentuk Tubuh: tubuh mungil, tinggi 158cm, bentuk badan proporsional.
Warna kulit: sawo matang cerah.
Rambut: ikal sebahu, hitam kecokelatan, diikat setengah ke belakang.
Wajah: wajah oval, alis tebal alami, mata hitam besar, senyum ramah, pipi merona, bibir natural dengan sentuhan lip tint.
Pakaian: mengenakan jaket parasut warna kuning mustard dan celana panjang hitam, membawa ransel kecil.`,
        voice: `Dia berbicara dengan suara wanita muda yang hangat dan penuh semangat.
Nada: mezzo-soprano.
Timbre: bersahabat dan enerjik.
Aksen/Logat: logat Indonesia dengan sentuhan khas Minang halus, berbicara murni dalam Bahasa Indonesia.
Cara Berbicara: tempo sedang-cepat, gaya bicara lincah dan ekspresif.
PENTING: Seluruh dialog harus dalam Bahasa Indonesia dengan pengucapan natural dan jelas. Pastikan suara karakter ini konsisten di seluruh video.`,
        action: `berjalan di sekitar terminal bus malam sambil melihat-lihat aktivitas penumpang dan pedagang.`,
        expr: `Karakter menunjukkan ekspresi kagum dan antusias, sering tersenyum sambil melirik kamera.`,
        dialog: `DIALOG dalam Bahasa Indonesia: Karakter berkata: "Tiap kota punya terminal kayak gini, dan aku suka banget suasana malamnya… hangat walau gerimis begini. Rasanya kayak perjalanan baru mau dimulai."`
    });
});

function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    for (const [value, text] of Object.entries(options)) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    }
}

function updateCharacterNumbers() {
    const charBlocks = document.querySelectorAll('.character-block');
    charBlocks.forEach((block, index) => {
        block.querySelector('.char-number').textContent = index + 1;
    });
}

function addCharacter(data = {}) {
    const container = document.getElementById('characters-container');
    const newIndex = container.getElementsByClassName('character-block').length + 1;

    // Options for dynamic dropdowns
    const charTypes = {
        '': 'Pilih tipe...',
        'pemuda': 'Pemuda / Mahasiswa',
        'ibu-ibu': 'Ibu-ibu Komplek',
        'bapak-bapak': 'Bapak-bapak Bijak',
        'tentara': 'Tentara / Polisi',
        'kakek-nenek': 'Kakek / Nenek',
        'pasangan': 'Pasangan Suami-Istri',
        'profesional': 'Pekerja Kantoran / Profesional'
    };

    const dialogTypes = {
        '': 'Pilih tujuan...',
        'promosi': 'Promosi Produk',
        'motivasi': 'Motivasi',
        'sindiran': 'Sindiran Halus',
        'ajakan': 'Ajakan (Event/Webinar)',
        'edukasi': 'Edukasi / Penjelasan',
        'storytelling': 'Storytelling Personal'
    };

    const charBlock = document.createElement('div');
    charBlock.className = 'character-block';
    charBlock.innerHTML = `
        <div class="character-header">
            <h4>Karakter <span class="char-number">${newIndex}</span></h4>
            <div class="core-char-selector">
                <input type="radio" name="core-char-radio" id="core-char-${newIndex}" class="core-char-radio" ${newIndex === 1 ? 'checked' : ''}>
                <label for="core-char-${newIndex}">Karakter Inti</label>
            </div>
            <button class="remove-char-btn">Hapus</button>
        </div>
        <div class="input-group">
            <label>Pilih Tipe Karakter (untuk ide)</label>
            <select class="char-type-select">
                ${Object.entries(charTypes).map(([value, text]) => `<option value="${value}">${text}</option>`).join('')}
            </select>
        </div>
        <div class="input-group">
            <label>Deskripsi Karakter</label>
            <textarea class="char-desc" rows="8">${data.desc || ''}</textarea>
        </div>
        <div class="input-group">
            <label>Detail Suara</label>
            <textarea class="char-voice" rows="6">${data.voice || ''}</textarea>
        </div>
        <div class="input-group">
            <label>Aksi</label>
            <textarea class="char-action" rows="2">${data.action || ''}</textarea>
        </div>
        <div class="input-group">
            <label>Ekspresi</label>
            <textarea class="char-expr" rows="2">${data.expr || ''}</textarea>
        </div>
        <div class="input-group">
            <label>Pilih Tujuan Dialog (untuk ide)</label>
            <select class="char-dialog-type-select">
                 ${Object.entries(dialogTypes).map(([value, text]) => `<option value="${value}">${text}</option>`).join('')}
            </select>
        </div>
        <div class="input-group">
            <label>Dialog</label>
            <textarea class="char-dialog" rows="3">${data.dialog || ''}</textarea>
        </div>
    `;
    container.appendChild(charBlock);
    updateCharacterNumbers();
}

function generatePrompt() {
    // Gather general values
    const judul = document.getElementById('judul').value;
    const latar = document.getElementById('latar').value;
    const format = document.getElementById('format-video').value;
    const kamera = document.getElementById('kamera').value;
    const pencahayaan = document.getElementById('pencahayaan').value;
    const gaya = document.getElementById('gaya-video').value;
    const kualitas = document.getElementById('kualitas').value;
    const suasana = document.getElementById('suasana').value;
    const ambience = document.getElementById('ambience').value;
    const negatif = document.getElementById('negatif').value;

    let characterDescriptionsID = '[DESKRIPSI KARAKTER & AKSI]\n';
    let characterDescriptionsEN = '[CHARACTER DESCRIPTIONS & ACTIONS]\n';
    let dialogsID = '[DIALOG KARAKTER]\n';
    let dialogsEN = '[CHARACTER DIALOGUES]\n';
    let coreCharNoteID = '';
    let coreCharNoteEN = '';
    let coreCharNum = -1;

    const charBlocks = document.querySelectorAll('.character-block');
    
    // Find which character is the core character
    charBlocks.forEach((block, index) => {
        if(block.querySelector('.core-char-radio').checked) {
            coreCharNum = index + 1;
        }
    });

    if (coreCharNum !== -1) {
        coreCharNoteID = `\nPENTING: Karakter ${coreCharNum} adalah karakter inti. Pastikan penampilan, pakaian, dan suaranya konsisten di setiap adegan.`;
        coreCharNoteEN = `\nIMPORTANT: Character ${coreCharNum} is the core character. Ensure their appearance, clothing, and voice are consistent in every scene.`;
    }

    charBlocks.forEach((block, index) => {
        const charNum = index + 1;
        const isCore = charNum === coreCharNum;
        const coreTagID = isCore ? " (KARAKTER INTI)" : "";
        const coreTagEN = isCore ? " (CORE CHARACTER)" : "";

        const desc = block.querySelector('.char-desc').value;
        const voice = block.querySelector('.char-voice').value;
        const action = block.querySelector('.char-action').value;
        const expr = block.querySelector('.char-expr').value;
        const dialog = block.querySelector('.char-dialog').value;

        characterDescriptionsID += `\n[Karakter ${charNum}${coreTagID}]\nDeskripsi: ${desc}\nSuara: ${voice}\nAksi: ${action}\nEkspresi: ${expr}\n`;
        if(dialog.trim() !== '') {
            const dialogTextOnly = dialog.includes(':') ? dialog.substring(dialog.indexOf(':') + 1).trim() : dialog;
            dialogsID += `Karakter ${charNum} berkata: ${dialogTextOnly}\n`;
        }
        characterDescriptionsEN += `\n[Character ${charNum}${coreTagEN}]\nDescription: ${desc}\nVoice: ${voice}\nAction: ${action}\nExpression: ${expr}\n`;
        if(dialog.trim() !== '') {
            const dialogTextOnly = dialog.includes(':') ? dialog.substring(dialog.indexOf(':') + 1).trim() : dialog;
            dialogsEN += `Character ${charNum} says: ${dialogTextOnly}\n`;
        }
    });

    // Add the note after character descriptions
    characterDescriptionsID += coreCharNoteID;
    characterDescriptionsEN += coreCharNoteEN;

    const visualDetailsID = `[DETAIL VISUAL TAMBAHAN]
Format Video: ${format}.
Gunakan gerakan kamera ${kamera} untuk mengikuti karakter secara dinamis. Pencahayaan diatur agar terlihat ${pencahayaan}. Gaya visual keseluruhan adalah ${gaya} dengan kualitas ${kualitas}.`;

    const visualDetailsEN = `[ADDITIONAL VISUAL DETAILS]
Video Format: ${format}.
Use a ${kamera.split(' (')[0]} camera movement to follow the characters dynamically. The lighting is set to look ${pencahayaan}. The overall visual style is ${gaya} with ${kualitas} quality.`;

    const promptID = `Sebuah video sinematik dengan [JUDUL SCENE: ${judul}].

${characterDescriptionsID}

[LATAR TEMPAT & WAKTU]
${latar}.

${visualDetailsID}

[SUASANA & SUARA]
Suasana keseluruhan yang ingin diciptakan adalah ${suasana}. Didukung dengan suara lingkungan (ambience) seperti ${ambience}.

${dialogsID.trim()}

[NEGATIVE PROMPT]
${negatif}.
`;
    const promptEN = `A cinematic video with [SCENE TITLE: ${judul}].

${characterDescriptionsEN}

[SETTING & TIME]
${latar}.

${visualDetailsEN}

[OVERALL ATMOSPHERE & SOUND]
The overall atmosphere to be created is ${suasana}. Supported by environmental sounds (ambience) such as ${ambience}.

${dialogsEN.trim()}

[NEGATIVE PROMPT]
${negatif}.
`;

    document.getElementById('output-id').value = promptID;
    document.getElementById('output-en').innerHTML = promptEN.replace(/\n/g, '<br>');
}

function copyFinalPrompt() {
    const outputEn = document.getElementById('output-en');
    const textToCopy = outputEn.innerText;
    const copyButton = document.getElementById('copy-btn');

    if (navigator.clipboard && textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => { copyButton.textContent = 'Copy'; }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            copyButton.textContent = 'Error';
             setTimeout(() => { copyButton.textContent = 'Copy'; }, 2000);
        });
    } else if (textToCopy) {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            copyButton.textContent = 'Copied!';
        } catch (err) {
            console.error('Fallback copy failed: ', err);
            copyButton.textContent = 'Error';
        }
        document.body.removeChild(textArea);
        setTimeout(() => { copyButton.textContent = 'Copy'; }, 2000);
    }
}

function resetForm() {
    // Clear general inputs
    const inputs = ['judul', 'latar', 'pencahayaan', 'kualitas', 'suasana', 'ambience', 'negatif'];
    inputs.forEach(id => document.getElementById(id).value = '');
    
    // Reset selects
    const selects = ['gaya-video', 'lokasi-suasana', 'format-video', 'kamera'];
    selects.forEach(id => document.getElementById(id).selectedIndex = 0);
    document.getElementById('kamera').value = "Tracking Shot (Bidikan Mengikuti)";

    const container = document.getElementById('characters-container');
    container.innerHTML = '';
    addCharacter(); // This will add one character and set it as core by default

    document.getElementById('output-id').value = '';
    document.getElementById('output-en').innerHTML = '';
}

function changeTitle() {
    const newTitle = prompt("Masukkan judul baru:", "Veo 3 Prompt Generator by Mahmud Hasan");
    if (newTitle) {
        document.getElementById('main-title').textContent = newTitle;
    }
}

function changeStyle() {
    const colors = prompt("Masukkan 3 warna (background, primary, accent) dipisahkan koma. Contoh: #000000, #1a1a1a, #ff00ff");
    if (colors) {
        const colorArray = colors.split(',').map(c => c.trim());
        if (colorArray.length === 3) {
            const root = document.documentElement;
            root.style.setProperty('--bg-color', colorArray[0]);
            root.style.setProperty('--primary-color', colorArray[1]);
            root.style.setProperty('--accent-color', colorArray[2]);
            root.style.setProperty('--secondary-color', colorArray[1] + 'cc');
            root.style.setProperty('--input-bg-color', colorArray[1]);
        } else {
            alert("Harap masukkan 3 warna yang valid.");
        }
    }
} 
