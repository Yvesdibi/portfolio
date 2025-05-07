let qrCode;

// Fonction pour générer le QR Code
function generateQRCode() {
  const text = document.getElementById('text').value.trim();
  const colorDark = document.getElementById('colorDark').value;
  const colorLight = document.getElementById('colorLight').value;
  const size = parseInt(document.getElementById('size').value);
  const qrCodeContainer = document.getElementById('qrcode');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');

  // Vider l'ancien QR Code s'il existe
  qrCodeContainer.innerHTML = '';

  if (text === '') {
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    return;
  } else {
    errorMessage.style.display = 'none';
  }

  // Créer un nouveau QR Code avec les couleurs et la taille choisies
  qrCode = new QRCode(qrCodeContainer, {
    text: text,
    width: size,
    height: size,
    colorDark: colorDark,
    colorLight: colorLight
  });

  // Afficher le message de succès
  successMessage.style.display = 'block';
  document.getElementById('download').style.display = 'inline-block';
}

// Générer le QR Code au clic
document.getElementById('generate').addEventListener('click', generateQRCode);

// Télécharger le QR Code
document.getElementById('download').addEventListener('click', function() {
  const qrCodeContainer = document.getElementById('qrcode');
  const img = qrCodeContainer.querySelector('img') || qrCodeContainer.querySelector('canvas');

  if (img) {
    const link = document.createElement('a');
    link.href = img.src || img.toDataURL();
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('Générez d\'abord un QR Code.');
  }
});

// Changer le thème (mode sombre / clair)
document.getElementById('toggle-theme').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
});

// Mise à jour du QR Code en temps réel
document.getElementById('text').addEventListener('input', generateQRCode);
