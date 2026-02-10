import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './BarcodeScanner.css';

const BarcodeScanner = ({ onScan, onClose }) => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current) {
        html5QrCodeRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const startScanner = async () => {
    try {
      setError('');
      const html5QrCode = new Html5Qrcode('qr-reader');
      html5QrCodeRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      await html5QrCode.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          onScan(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Ignore scanning errors (happens constantly while scanning)
        }
      );

      setScanning(true);
    } catch (err) {
      console.error('Scanner error:', err);
      setError('Kamera konnte nicht gestartet werden. Bitte Kamera-Berechtigung erteilen.');
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current = null;
        setScanning(false);
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
    }
  };

  const handleClose = async () => {
    await stopScanner();
    onClose();
  };

  return (
    <div className="scanner-overlay">
      <div className="scanner-container">
        <div className="scanner-header">
          <h3>Barcode Scanner</h3>
          <button onClick={handleClose} className="btn-close">✕</button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div id="qr-reader" ref={scannerRef} className="qr-reader"></div>

        <div className="scanner-controls">
          {!scanning ? (
            <button onClick={startScanner} className="btn-primary">
              Scanner starten
            </button>
          ) : (
            <button onClick={stopScanner} className="btn-secondary">
              Scanner stoppen
            </button>
          )}
        </div>

        <div className="scanner-info">
          <p>Positionieren Sie den Barcode im markierten Bereich</p>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
