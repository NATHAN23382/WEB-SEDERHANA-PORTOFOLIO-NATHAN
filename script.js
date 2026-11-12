
// Animasi sederhana ketika halaman dimuat

document.addEventListener("DOMContentLoaded", function() {

    console.log("Portfolio Website Berhasil Dibuka!");

    // Efek tahun otomatis pada footer
    const footer = document.querySelector("footer p");

    footer.textContent =
        `© ${new Date().getFullYear()} Mohammad Nathan. All Rights Reserved.`;

});
