import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner';
import InventoryTable from './InventoryTable';
import './InventoryForm.css';

const InventoryForm = ({ supplier, onBack }) => {
  const [showScanner, setShowScanner] = useState(false);
  const [partNumber, setPartNumber] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [inventoryItems, setInventoryItems] = useState([]);

  const handleScan = (scannedCode) => {
    setPartNumber(scannedCode);
    // Auto-fill description based on part number (mock implementation)
    setDescription(`Ersatzteil ${scannedCode}`);
    setShowScanner(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!partNumber || !description) {
      alert('Bitte Ersatzteilnummer und Bezeichnung eingeben');
      return;
    }

    const newItem = {
      id: Date.now(),
      partNumber,
      description,
      quantity: quantity || 0,
      supplier: supplier.name,
      timestamp: new Date().toISOString()
    };

    setInventoryItems([...inventoryItems, newItem]);
    
    // Reset form
    setPartNumber('');
    setDescription('');
    setQuantity('');
  };

  const handleDeleteItem = (id) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };

  return (
    <div className="inventory-form-container">
      <div className="inventory-header">
        <button onClick={onBack} className="btn-back">
          ← Zurück
        </button>
        <h2>Inventur: {supplier.name}</h2>
      </div>

      <div className="inventory-card">
        <h3>Ersatzteil erfassen</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="partNumber">Ersatzteilnummer</label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="partNumber"
                  value={partNumber}
                  onChange={(e) => setPartNumber(e.target.value)}
                  placeholder="Ersatzteilnummer"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowScanner(true)}
                  className="btn-scan"
                  title="Barcode scannen"
                >
                  📷
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Bezeichnung</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Bezeichnung"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Bestand (optional)</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Hinzufügen
          </button>
        </form>
      </div>

      <InventoryTable 
        items={inventoryItems}
        onDeleteItem={handleDeleteItem}
        supplierName={supplier.name}
      />

      {showScanner && (
        <BarcodeScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
};

export default InventoryForm;
