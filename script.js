// Configuration
const folderId = '1osh1YD_M10CiAZrBdDprxC0eqglIKZap';
const apiKey = 'AIzaSyCF4BFgwxOOBb7t3ag36yWPkC1sMbVz6WI';

async function loadImages() {
    const gallery = document.getElementById('gallery');

    // Google Drive API URL to list files in the folder
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name,mimeType,webContentLink,thumbnailLink)`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Loop over each file and create an img element if it's an image
        data.files.forEach(file => {
            if (file.mimeType.includes('image/')) {
                const img = document.createElement('img');
                img.src = `https://drive.google.com/uc?id=${file.id}`;
                img.alt = file.name;
                gallery.appendChild(img);
            }
        });
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

// Load images on page load
document.addEventListener('DOMContentLoaded', loadImages);
