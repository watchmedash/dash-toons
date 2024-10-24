document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll('img[data-src]');

    images.forEach(img => {
        const spinner = img.previousElementSibling; // Get the spinner

        img.onload = () => {
            spinner.style.display = 'none'; // Hide spinner when image loads
            img.src = img.dataset.src; // Set the actual source
        };

        img.onerror = () => {
            spinner.style.display = 'none'; // Hide spinner on error
        };

        // Show spinner while loading
        spinner.style.display = 'block';
    });
});
