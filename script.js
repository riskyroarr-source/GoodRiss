// --- script.js ---

const dataJadwalXI9 = [
    // RABU, 9 OKTOBER 2025
    { hari: "RABU", tanggal: "9 OKTOBER 2025", waktu: "07:30 - 09:00", matkul: "Pend. Agama", isBreak: false },
    { hari: "RABU", tanggal: "9 OKTOBER 2025", waktu: "09:00 - 09:45", matkul: "ISTIRAHAT", isBreak: true },
    { hari: "RABU", tanggal: "9 OKTOBER 2025", waktu: "09:45 - 11:15", matkul: "B. Inggris", isBreak: false },
    
    // KAMIS, 10 OKTOBER 2025
    { hari: "KAMIS", tanggal: "10 OKTOBER 2025", waktu: "07:00 - 08:30", matkul: "B. Indonesia", isBreak: false },
    { hari: "KAMIS", tanggal: "10 OKTOBER 2025", waktu: "08:30 - 09:15", matkul: "ISTIRAHAT", isBreak: true },
    { hari: "KAMIS", tanggal: "10 OKTOBER 2025", waktu: "09:15 - 10:45", matkul: "Sejarah", isBreak: false },
    
    // JUMAT, 11 OKTOBER 2025
    { hari: "JUMAT", tanggal: "11 OKTOBER 2025", waktu: "07:00 - 08:30", matkul: "Matematika", isBreak: false },
    { hari: "JUMAT", tanggal: "11 OKTOBER 2025", waktu: "08:30 - 09:15", matkul: "ISTIRAHAT", isBreak: true },
    { hari: "JUMAT", tanggal: "11 OKTOBER 2025", waktu: "09:15 - 10:45", matkul: "Pend. Pancasila", isBreak: false },
    
    // SENIN, 13 OKTOBER 2025
    { hari: "SENIN", tanggal: "13 OKTOBER 2025", waktu: "07:00 - 08:30", matkul: "Informatika", isBreak: false }, // XI-9: Informatika
    { hari: "SENIN", tanggal: "13 OKTOBER 2025", waktu: "08:30 - 09:15", matkul: "ISTIRAHAT", isBreak: true }, 
    { hari: "SENIN", tanggal: "13 OKTOBER 2025", waktu: "09:15 - 10:45", matkul: "PJOK", isBreak: false },
    
    // SELASA, 14 OKTOBER 2025
    { hari: "SELASA", tanggal: "14 OKTOBER 2025", waktu: "07:00 - 08:30", matkul: "B. Jepang", isBreak: false }, // XI-9: B. Jepang
    { hari: "SELASA", tanggal: "14 OKTOBER 2025", waktu: "08:30 - 09:15", matkul: "ISTIRAHAT", isBreak: true },
    { hari: "SELASA", tanggal: "14 OKTOBER 2025", waktu: "09:15 - 10:45", matkul: "Seni Budaya", isBreak: false },
    
    // RABU, 15 OKTOBER 2025
    { hari: "RABU", tanggal: "15 OKTOBER 2025", waktu: "07:00 - 08:30", matkul: "Matematika Lanjut", isBreak: false }, // XI-9: Mat Lanjut
    { hari: "RABU", tanggal: "15 OKTOBER 2025", waktu: "08:30 - 09:15", matkul: "ISTIRAHAT", isBreak: true },
    { hari: "RABU", tanggal: "15 OKTOBER 2025", waktu: "09:15 - 10:45", matkul: "B. Jawa", isBreak: false }, // XI-9: B. Jawa
    
    // KAMIS, 16 OKTOBER 2025
    { hari: "KAMIS", tanggal: "16 OKTOBER 2025", waktu: "07:00 - 08:30", matkul: "Ekonomi Lanjut", isBreak: false }, // XI-9: Ekonomi Lanjut
    { hari: "KAMIS", tanggal: "16 OKTOBER 2025", waktu: "08:30 - 09:15", matkul: "ISTIRAHAT", isBreak: true },
    { hari: "KAMIS", tanggal: "16 OKTOBER 2025", waktu: "09:15 - 10:45", matkul: "Sosiologi", isBreak: false }, // XI-9: Sosiologi
    
    // JUMAT, 17 OKTOBER 2025
    { hari: "JUMAT", tanggal: "17 OKTOBER 2025", waktu: "07:00 - 08:30", matkul: "Ekonomi", isBreak: false }, 
    { hari: "JUMAT", tanggal: "17 OKTOBER 2025", waktu: "08:30 - 09:15", matkul: "ISTIRAHAT", isBreak: true },
    { hari: "JUMAT", tanggal: "17 OKTOBER 2025", waktu: "09:15 - 10:45", matkul: "Geografi", isBreak: false }
];


document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const scheduleContainer = document.getElementById('schedule-container');
    const dayButtons = document.querySelectorAll('.day-btn');

    // --- 1. Logika Dark Mode/Light Mode ---
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    body.className = savedTheme;
    if (savedTheme === 'dark-mode') {
        modeToggle.querySelector('.icon').textContent = '☀️';
    }

    modeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.className = 'dark-mode';
            localStorage.setItem('theme', 'dark-mode');
            modeToggle.querySelector('.icon').textContent = '☀️';
        } else {
            body.className = 'light-mode';
            localStorage.setItem('theme', 'light-mode');
            modeToggle.querySelector('.icon').textContent = '🌙';
        }
    });

    // --- 2. Fungsi Rendering Kartu Jadwal ---
    function renderSchedule(selectedDay) {
        scheduleContainer.innerHTML = ''; // Kosongkan container
        const filteredJadwal = dataJadwalXI9.filter(item => item.hari === selectedDay); // Menggunakan data XI-9

        if (filteredJadwal.length === 0) {
            scheduleContainer.innerHTML = `
                <div class="initial-message" style="grid-column: 1 / -1; text-align: center;">
                    <h2>🎉 Tidak ada Ujian Hari Ini!</h2>
                    <p>Waktunya belajar untuk mata pelajaran berikutnya.</p>
                </div>`;
            return;
        }

        filteredJadwal.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('schedule-card');
            
            if (item.isBreak) {
                card.classList.add('break');
            }

            const fullDate = item.tanggal; 
            
            card.innerHTML = `
                <span class="time">${item.waktu}</span>
                <p class="details" style="font-weight: 600;">Tanggal: ${fullDate}</p>
                <h2 class="subject">${item.matkul}</h2>
                <p class="details">Hanya untuk **Kelas XI-9**</p>
            `;
            scheduleContainer.appendChild(card);
        });
    }

    // --- 3. Logika Filter Hari ---
    dayButtons.forEach(button => {
        button.addEventListener('click', () => {
            dayButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderSchedule(button.dataset.day);
        });
    });

    // Inisialisasi: Tampilkan jadwal hari pertama saat load
    const firstDayButton = document.querySelector('.day-btn[data-day="RABU"]');
    if (firstDayButton) {
        firstDayButton.classList.add('active');
        renderSchedule(firstDayButton.dataset.day);
    }
});
