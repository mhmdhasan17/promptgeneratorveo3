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

    const cameraSelect = document.getElementById('kamera');
    for (const [en, id] of Object.entries(cameraMotions)) {
        const option = document.createElement('option');
        option.value = `${en} (${id})`;
        option.textContent = `${en} (${id})`;
        cameraSelect.appendChild(option);
    }
    // Set a default cinematic value
    cameraSelect.value = "Tracking Shot (Bidikan Mengikuti)";

    document.getElementById('generate-btn').addEventListener('click', generatePrompt);
    document.getElementById('change-title-btn').addEventListener('click', changeTitle);
    document.getElementById('change-style-btn').addEventListener('click', changeStyle);
    document.getElementById('reset-btn').addEventListener('click', resetForm);
});

function resetForm() {
    const formElements = document.querySelectorAll('.form-container input, .form-container textarea, .form-container select');
    formElements.forEach(el => {
        if (el.tagName === 'SELECT') {
            el.selectedIndex = 0; // Reset select to the first option
        } else {
            el.value = ''; // Clear value for inputs and textareas
        }
    });

    // Also clear the output boxes
    document.getElementById('output-id').value = '';
    document.getElementById('output-en').innerHTML = '';

    // Restore default camera selection
    document.getElementById('kamera').value = "Tracking Shot (Bidikan Mengikuti)";
}

function generatePrompt() {
    // Gather values
    const judul = document.getElementById('judul').value;
    const karakter = document.getElementById('karakter').value;
    const suara = document.getElementById('suara').value;
    const aksi = document.getElementById('aksi').value;
    const ekspresi = document.getElementById('ekspresi').value;
    const latar = document.getElementById('latar').value;
    const kamera = document.getElementById('kamera').value;
    const pencahayaan = document.getElementById('pencahayaan').value;
    const gaya = document.getElementById('gaya').value;
    const kualitas = document.getElementById('kualitas').value;
    const suasana = document.getElementById('suasana').value;
    const ambience = document.getElementById('ambience').value;
    const dialog = document.getElementById('dialog').value;
    const negatif = document.getElementById('negatif').value;

    // --- Indonesian Prompt ---
    const promptID = `Sebuah video sinematik dengan [JUDUL SCENE: ${judul}].

[DESKRIPSI KARAKTER INTI]
Video ini menampilkan karakter utama: ${karakter}. Karakter ini harus konsisten di seluruh adegan.

[DETAIL SUARA KARAKTER]
${suara}.

[AKSI & EKSPRESI KARAKTER]
Dalam scene ini, karakter akan melakukan aksi: ${aksi}, dengan ekspresi wajah yang menunjukkan: ${ekspresi}.

[LATAR TEMPAT & WAKTU]
${latar}.

[DETAIL VISUAL TAMBAHAN]
Gunakan gerakan kamera ${kamera} untuk mengikuti karakter secara dinamis. Pencahayaan diatur agar terlihat ${pencahayaan}. Gaya visual keseluruhan adalah ${gaya} dengan kualitas ${kualitas}.

[SUASANA & SUARA]
Suasana keseluruhan yang ingin diciptakan adalah ${suasana}. Didukung dengan suara lingkungan (ambience) seperti ${ambience}.

[DIALOG KARAKTER]
${dialog}.

[NEGATIVE PROMPT]
${negatif}.
`;

    // --- English Prompt ---
    // Extract the dialogue part to keep it in Indonesian
    const dialogTextOnly = dialog.substring(dialog.indexOf('"')).trim();

    const promptEN = `A cinematic video with [SCENE TITLE: ${judul}].

[CORE CHARACTER DESCRIPTION]
This video features the main character: ${karakter}. This character must be consistent throughout all scenes.

[CHARACTER VOICE DETAILS]
${suara}.

[CHARACTER ACTION & EXPRESSION]
In this scene, the character will perform the action: ${aksi}, with a facial expression that shows: ${ekspresi}.

[SETTING & TIME]
${latar}.

[ADDITIONAL VISUAL DETAILS]
Use a ${kamera.split(' (')[0]} camera movement to follow the character dynamically. The lighting is set to look ${pencahayaan}. The overall visual style is ${gaya} with ${kualitas} quality.

[OVERALL ATMOSPHERE & SOUND]
The overall atmosphere to be created is ${suasana}. Supported by environmental sounds (ambience) such as ${ambience}.

[CHARACTER DIALOGUE]
The character says: ${dialogTextOnly}.

[NEGATIVE PROMPT]
${negatif}.
`;

    document.getElementById('output-id').value = promptID;
    document.getElementById('output-en').innerHTML = promptEN.replace(/\n/g, '<br>');
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
            // A simple formula to adjust related colors
            root.style.setProperty('--secondary-color', colorArray[1] + 'cc'); // Add some transparency
            root.style.setProperty('--input-bg-color', colorArray[1]);
        } else {
            alert("Harap masukkan 3 warna yang valid.");
        }
    }
} 
